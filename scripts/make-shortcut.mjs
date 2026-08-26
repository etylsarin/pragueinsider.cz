#!/usr/bin/env node
/**
 * Emits the photo-upload Shortcut as an importable .shortcut file.
 *
 * Shortcuts have been signed since iOS 15, and the "Allow Untrusted Shortcuts" toggle that used
 * to let a raw plist through went away with the same release — so an unsigned file cannot be
 * imported on a current iPhone at all. macOS ships the signer as `shortcuts sign`, which accepts
 * exactly the old-format plist this builds, so the last step here is to run it. Signing also
 * doubles as validation: Apple's tool has to parse the workflow to sign it, which catches far
 * more than a plist lint would.
 *
 * The action identifiers and parameter keys below are still Shortcuts' private interface —
 * undocumented, and they move between releases. Signing proves the file is well-formed, not that
 * every parameter lands where intended. Open it in the editor once and check.
 * docs/photo-shortcut.md is the authoritative description of what the shortcut should do.
 *
 * Usage:
 *   node scripts/make-shortcut.mjs [--out docs/photo-upload.shortcut] [--unsigned]
 */

import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const run = promisify(execFile)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/**
 * The folder the Shortcut writes into. A Save File path is relative to the Shortcuts app's own
 * iCloud folder, so this lands at iCloud Drive → Shortcuts → PragueInsider, not at the root.
 */
const DROP_FOLDER = 'PragueInsider'
const ALBUM = 'Prague Insider'
const STAMP_FORMAT = 'yyyy-MM-dd-HHmmss'
const MAX_WIDTH = 2000

/** Fixed so regenerating produces an identical file rather than a spurious diff. */
const ID = {
  stamp: 'A1000000-0000-4000-8000-000000000002',
  photo: 'A1000000-0000-4000-8000-000000000003',
  saved: 'A1000000-0000-4000-8000-000000000004',
  resized: 'A1000000-0000-4000-8000-000000000005',
  converted: 'A1000000-0000-4000-8000-000000000006',
  savedJpg: 'A1000000-0000-4000-8000-000000000007',
  loc1: 'A1000000-0000-4000-8000-000000000008',
  lat: 'A1000000-0000-4000-8000-000000000009',
  loc2: 'A1000000-0000-4000-8000-00000000000a',
  lng: 'A1000000-0000-4000-8000-00000000000b',
  note: 'A1000000-0000-4000-8000-00000000000c',
  json: 'A1000000-0000-4000-8000-00000000000d',
}

// --- plist serialisation ---------------------------------------------------------------------

const escapeXml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Marks a value that must serialise as <real> rather than <integer>. */
const real = (value) => ({ __real: value })

const plistValue = (value, indent) => {
  const pad = '  '.repeat(indent)
  if (value && typeof value === 'object' && '__real' in value) return `${pad}<real>${value.__real}</real>`
  if (typeof value === 'boolean') return `${pad}<${value}/>`
  if (typeof value === 'number') return `${pad}<integer>${value}</integer>`
  if (typeof value === 'string') return `${pad}<string>${escapeXml(value)}</string>`
  if (Array.isArray(value)) {
    if (!value.length) return `${pad}<array/>`
    return [`${pad}<array>`, ...value.map((v) => plistValue(v, indent + 1)), `${pad}</array>`].join('\n')
  }
  const entries = Object.entries(value)
  if (!entries.length) return `${pad}<dict/>`
  return [
    `${pad}<dict>`,
    ...entries.flatMap(([k, v]) => [`${pad}  <key>${escapeXml(k)}</key>`, plistValue(v, indent + 1)]),
    `${pad}</dict>`,
  ].join('\n')
}

const plist = (root) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
${plistValue(root, 0)}
</plist>
`

// --- Shortcuts value shapes ------------------------------------------------------------------

/** A whole field that is one action's output. */
const variable = (uuid, name) => ({
  Value: { OutputName: name, OutputUUID: uuid, Type: 'ActionOutput' },
  WFSerializationType: 'WFTextTokenAttachment',
})

/**
 * The built-in "Current Date" token.
 *
 * There is also a Date action, and using one is the obvious way to feed Format Date. It is a
 * worse way: the action has a mode that has to be set to Current Date, and an import that gets
 * that wrong leaves it on Specified Date with no date — which emits nothing, silently, and the
 * only symptom is a filename that turns out to be its own extension. The token has no mode to
 * get wrong.
 */
const currentDate = () => ({
  Value: { Type: 'CurrentDate' },
  WFSerializationType: 'WFTextTokenAttachment',
})

const OBJ = '￼' // the placeholder Shortcuts puts where an inline variable sits

/**
 * A text field mixing typed characters and inserted variables.
 *
 * Shortcuts stores the text with U+FFFC where each variable goes, plus a map from
 * "{location, 1}" to the variable. The offsets have to be exact, so they are computed from the
 * parts rather than written by hand.
 *
 * @param {Array<string|{uuid: string, name: string}>} parts
 */
const text = (parts) => {
  let string = ''
  const attachmentsByRange = {}
  for (const part of parts) {
    if (typeof part === 'string') {
      string += part
      continue
    }
    attachmentsByRange[`{${string.length}, 1}`] = {
      OutputName: part.name,
      OutputUUID: part.uuid,
      Type: 'ActionOutput',
    }
    string += OBJ
  }
  return {
    Value: Object.keys(attachmentsByRange).length ? { string, attachmentsByRange } : { string },
    WFSerializationType: 'WFTextTokenString',
  }
}

const action = (identifier, parameters = {}) => ({
  WFWorkflowActionIdentifier: identifier,
  WFWorkflowActionParameters: parameters,
})

// --- the shortcut ----------------------------------------------------------------------------

const STAMP = { uuid: ID.stamp, name: 'Formatted Date' }

const actions = [
  // The stamp is produced first so the two Save File paths can name themselves without any
  // action having to reach backwards past the camera.
  action('is.workflow.actions.format.date', {
    UUID: ID.stamp,
    WFDate: currentDate(),
    WFDateFormatStyle: 'Custom',
    WFDateFormat: STAMP_FORMAT,
  }),

  action('is.workflow.actions.takephoto', {
    UUID: ID.photo,
    WFCameraCaptureShowPreview: true,
    WFCameraCaptureDevice: 'Back',
    WFPhotoCount: 1,
  }),
  action('is.workflow.actions.savetocameraroll', {
    UUID: ID.saved,
    WFInput: variable(ID.photo, 'Photo'),
    WFCameraRollSelectedGroup: ALBUM,
  }),
  action('is.workflow.actions.image.resize', {
    UUID: ID.resized,
    WFImage: variable(ID.saved, 'Saved Photo Media'),
    WFImageResizeWidth: MAX_WIDTH,
  }),
  action('is.workflow.actions.image.convert', {
    UUID: ID.converted,
    WFInput: variable(ID.resized, 'Resized Image'),
    WFImageFormat: 'JPEG',
    WFImageCompressionQuality: real(0.85),
    WFImagePreserveMetadata: false,
  }),
  action('is.workflow.actions.documentpicker.save', {
    UUID: ID.savedJpg,
    WFInput: variable(ID.converted, 'Converted Image'),
    WFAskWhereToSave: false,
    // No extension: Shortcuts appends one for the content type it is saving, so writing
    // ".jpg" here produces "….jpg.jpeg" — and the sidecar's "….json.txt" then no longer shares
    // a base name with it, which is what attach-photo.mjs pairs them on.
    WFFileDestinationPath: text([`${DROP_FOLDER}/`, STAMP]),
  }),

  // Two rounds: one Get Details pulls one detail, and a fresh Get Current Location restarts the
  // chain cleanly because it takes no input of its own.
  action('is.workflow.actions.getcurrentlocation', { UUID: ID.loc1 }),
  action('is.workflow.actions.properties.locations', {
    UUID: ID.lat,
    WFInput: variable(ID.loc1, 'Current Location'),
    WFContentItemPropertyName: 'Latitude',
  }),
  action('is.workflow.actions.getcurrentlocation', { UUID: ID.loc2 }),
  action('is.workflow.actions.properties.locations', {
    UUID: ID.lng,
    WFInput: variable(ID.loc2, 'Current Location'),
    WFContentItemPropertyName: 'Longitude',
  }),

  action('is.workflow.actions.ask', {
    UUID: ID.note,
    WFAskActionPrompt: 'What is this?',
    WFInputType: 'Text',
  }),

  action('is.workflow.actions.gettext', {
    UUID: ID.json,
    WFTextActionText: text([
      '{"note":"',
      { uuid: ID.note, name: 'Provided Input' },
      '","lat":',
      { uuid: ID.lat, name: 'Latitude' },
      ',"lng":',
      { uuid: ID.lng, name: 'Longitude' },
      ',"shot":"',
      STAMP,
      '"}',
    ]),
  }),
  action('is.workflow.actions.documentpicker.save', {
    WFInput: variable(ID.json, 'Text'),
    WFAskWhereToSave: false,
    WFFileDestinationPath: text([`${DROP_FOLDER}/`, STAMP]),
  }),

  action('is.workflow.actions.notification', {
    WFNotificationActionBody: text(['Filed ', STAMP]),
    WFNotificationActionSound: false,
  }),
]

const workflow = {
  WFWorkflowClientVersion: '1146.6',
  WFWorkflowMinimumClientVersion: 900,
  WFWorkflowMinimumClientVersionString: '900',
  WFWorkflowIcon: {
    WFWorkflowIconStartColor: 4282601983,
    WFWorkflowIconGlyphNumber: 59511,
  },
  WFWorkflowImportQuestions: [],
  WFWorkflowTypes: ['NCWidget'],
  WFWorkflowInputContentItemClasses: [],
  WFWorkflowHasShortcutInputVariables: false,
  WFWorkflowHasOutputFallback: false,
  WFWorkflowActions: actions,
}

const outIndex = process.argv.indexOf('--out')
const out = path.resolve(outIndex >= 0 ? process.argv[outIndex + 1] : path.join(ROOT, 'docs/photo-upload.shortcut'))

if (process.argv.includes('--unsigned')) {
  await fs.writeFile(out, plist(workflow))
  console.log(`Wrote ${path.relative(ROOT, out)} — ${actions.length} actions, unsigned.`)
  console.log('An unsigned file cannot be imported on iOS 15 or later. Drop --unsigned to sign it.')
} else {
  // Sign from a scratch copy so a failure leaves no half-written file where the good one was.
  const scratch = path.join(os.tmpdir(), 'photo-upload.unsigned.shortcut')
  await fs.writeFile(scratch, plist(workflow))
  try {
    await run('shortcuts', ['sign', '--mode', 'anyone', '--input', scratch, '--output', out])
    const { size } = await fs.stat(out)
    console.log(`Wrote ${path.relative(ROOT, out)} — ${actions.length} actions, signed (${Math.round(size / 1024)} KB).`)
    console.log('AirDrop it to the phone and open it.')
  } catch (error) {
    await fs.writeFile(out, plist(workflow))
    console.error(`Could not sign (${error.shortMessage || error.message}).`)
    console.error(`Wrote ${path.relative(ROOT, out)} unsigned — iOS 15 and later will refuse it.`)
    console.error('`shortcuts sign` is macOS-only and needs you signed in to iCloud.')
    process.exitCode = 1
  } finally {
    await fs.rm(scratch, { force: true })
  }
}
