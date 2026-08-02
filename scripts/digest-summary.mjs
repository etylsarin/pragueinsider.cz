#!/usr/bin/env node
/**
 * Prints .cache/digest.json as a few readable lines.
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

async function main() {
  let digest
  try {
    digest = JSON.parse(await fs.readFile(path.join(ROOT, '.cache/digest.json'), 'utf8'))
  } catch (error) {
    console.error(`No digest to summarise (${error.code || error.message}). Did the scan run?`)
    process.exitCode = 1
    return
  }

  console.log(`Scanned ${digest.generatedAt}, window ${digest.window.days} days\n`)

  let errored = 0
  for (const source of digest.sources) {
    if (source.error) {
      errored += 1
      console.log(`  ✗ ${source.name}: ${source.error}`)
    } else {
      console.log(
        `  ✓ ${source.name}: ${source.kept} new of ${source.fetched} ` +
          `(${source.offTopic} off-topic, ${source.already} covered, ${source.stale} outside window)`
      )
    }
  }

  console.log(`\n${digest.counts.candidates} candidates in ${digest.counts.clusters} clusters`)
  for (const cluster of digest.clusters) {
    const sources = cluster.sourceCount > 1 ? ` [${cluster.sourceCount} sources]` : ''
    console.log(`  [${cluster.rank}] ${cluster.score} ${cluster.suggestedCategory}${sources} — ${cluster.headline}`)
  }

  if (errored === digest.sources.length && digest.sources.length > 0) {
    console.log('\nEvery source errored. That is an environment or adapter problem, not a quiet news day.')
  } else if (digest.counts.candidates === 0) {
    console.log('\nNothing new to write about. A quiet day is a legitimate outcome.')
  }
}

main()
