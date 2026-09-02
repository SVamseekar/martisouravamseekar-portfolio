#!/usr/bin/env node
/**
 * Verifies every externally checkable claim in src/data/evidence.ts.
 *
 *   npm run verify
 *
 * Checks that live product URLs respond, that each asserted PyPI version
 * matches what is actually published, and that publication records resolve.
 * Exits non-zero when reality has drifted from the claims, so the site can
 * never quietly advertise something untrue.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const EVIDENCE = resolve(HERE, "../src/data/evidence.ts");
const TIMEOUT_MS = 15_000;

const styles = {
  pass: "\x1b[32m",
  fail: "\x1b[31m",
  skip: "\x1b[90m",
  head: "\x1b[1m",
  off: "\x1b[0m",
};

/**
 * Reads the evidence file as text and pulls out the values we verify.
 * Parsing the source directly keeps this script dependency-free and avoids
 * needing a TypeScript build step just to run checks.
 */
function readEvidence() {
  const source = readFileSync(EVIDENCE, "utf8");

  const urls = [...source.matchAll(/href:\s*"(https:\/\/[^"]+)"/g)].map(
    (m) => m[1],
  );

  const pkgs = [
    ...source.matchAll(
      /name:\s*"([a-z0-9-]+)",\s*\n\s*stack:\s*"[^"]*",\s*\n\s*version:\s*"([^"]+)"/g,
    ),
  ].map(([, name, version]) => ({ name, version }));

  const skipped = new Set(
    [...source.matchAll(/href:\s*"([^"]+)",\s*\n\s*check:\s*"skip"/g)].map(
      (m) => m[1],
    ),
  );

  return { urls, pkgs, skipped };
}

async function head(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "souravamseekar.com claim verifier" },
    });
    return res.status;
  } catch (err) {
    return err.name === "AbortError" ? "timeout" : "error";
  } finally {
    clearTimeout(timer);
  }
}

async function pypiVersion(name) {
  const status = await fetch(`https://pypi.org/pypi/${name}/json`, {
    headers: { "user-agent": "souravamseekar.com claim verifier" },
  })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
  return status?.info?.version ?? null;
}

const results = [];
const record = (state, label, detail) => {
  results.push({ state, label, detail });
  const colour = styles[state] ?? styles.off;
  const mark = { pass: "ok", fail: "FAIL", skip: "--" }[state];
  console.log(
    `  ${colour}${mark.padEnd(4)}${styles.off} ${label.padEnd(46)} ${detail}`,
  );
};

async function main() {
  const { urls, pkgs, skipped } = readEvidence();

  console.log(`\n${styles.head}Live surfaces and publications${styles.off}`);
  for (const url of urls) {
    if (skipped.has(url)) {
      record("skip", url.replace("https://", ""), "skipped by policy");
      continue;
    }
    const status = await head(url);
    record(status === 200 ? "pass" : "fail", url.replace("https://", ""), status);
  }

  console.log(`\n${styles.head}Published packages${styles.off}`);
  for (const { name, version } of pkgs) {
    const live = await pypiVersion(name);
    if (live === null) record("fail", name, "not found on PyPI");
    else if (live !== version) record("fail", name, `claims ${version}, PyPI has ${live}`);
    else record("pass", name, `v${live}`);
  }

  const failed = results.filter((r) => r.state === "fail");
  const passed = results.filter((r) => r.state === "pass").length;
  const skippedCount = results.filter((r) => r.state === "skip").length;

  console.log(
    `\n${passed} verified · ${failed.length} failed · ${skippedCount} skipped\n`,
  );

  if (failed.length > 0) {
    console.error(
      `${styles.fail}Claims no longer match reality.${styles.off} ` +
        `Update src/data/evidence.ts and any copy that cites it.\n`,
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
