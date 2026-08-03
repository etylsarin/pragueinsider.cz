#!/usr/bin/env node
/**
 * Prints data/digest.json as a few readable lines.
 *
 * Exists so the daily CI run puts the scan's own numbers in its log. If every source reports
 * zero, that is visible immediately and points at network egress or a rotted selector, rather
 * than being indistinguishable from the desk judging it a quiet news day.
 *
 * Exit code is 0 even with no candidates — an empty digest is a legitimate outcome, not a
 * failure, and must not fail the workflow.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const LOG_PATH = path.join(ROOT, 'data/last-run.md')

async function main() {
  const write = process.argv.includes('--write')
  let digest
  try {
    digest = JSON.parse(await fs.readFile(path.join(ROOT, 'data/digest.json'), 'utf8'))
  } catch (error) {
    console.error(`No digest to summarise (${error.code || error.message}). Did the scan run?`)
    process.exitCode = 1
    return
  }

  const out = []
  const say = (line = '') => out.push(line)

  say(`# Scan log — ${digest.generatedAt.slice(0, 10)}`)
  say()
  say(`Scanned \`${digest.generatedAt}\`, window ${digest.window.days} days.`)
  say()
  say('## Sources')
  say()

  let errored = 0
  for (const source of digest.sources) {
    if (source.error) {
      errored += 1
      say(`- ✗ **${source.name}** — ${source.error}`)
    } else {
      say(
        `- ✓ **${source.name}** — ${source.kept} new of ${source.fetched} ` +
          `(${source.offTopic} off-topic, ${source.already} covered, ${source.stale} outside window)`
      )
    }
  }

  say()
  say(`## Candidates — ${digest.counts.candidates} in ${digest.counts.clusters} clusters`)
  say()
  for (const cluster of digest.clusters) {
    const sources = cluster.sourceCount > 1 ? ` _[${cluster.sourceCount} sources]_` : ''
    say(`${cluster.rank}. \`${cluster.score}\` ${cluster.suggestedCategory}${sources} — ${cluster.headline}`)
  }

  say()
  if (errored === digest.sources.length && digest.sources.length > 0) {
    say('**Every source errored.** That is an environment or adapter problem, not a quiet news day.')
  } else if (digest.counts.candidates === 0) {
    say('**Nothing new to write about.** A quiet day is a legitimate outcome.')
  }

  console.log(out.join('\n'))

  if (write) {
    // The desk appends its decisions under this marker and commits the file, so every run
    // leaves a readable record whether or not it published. See the daily-scan skill, step 7.
    await fs.writeFile(LOG_PATH, `${out.join('\n')}\n\n## Decisions\n\n_(the desk fills this in)_\n`)
    console.log(`\n→ wrote ${path.relative(ROOT, LOG_PATH)}`)
  }
}

main()
