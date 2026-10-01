import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { GENERATED_PATHS, validateSyncPullRequest } from "./lib/sync-publish.mjs";

const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const api = (...args) => JSON.parse(execFileSync("gh", ["api", ...args], {
  encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
}));
const [command, snapshotPath] = process.argv.slice(2);
if (!snapshotPath) throw new Error("Supply a snapshot path outside the repository");

if (command === "capture") {
  const snapshot = { baseSha: git("rev-parse", "HEAD"), blobs: {} };
  for (const file of GENERATED_PATHS) snapshot.blobs[file] = git("hash-object", file);
  await writeFile(snapshotPath, JSON.stringify(snapshot), "utf8");
} else if (command === "verify") {
  const { GITHUB_REPOSITORY: repo, SYNC_PR_NUMBER: number, SYNC_HEAD_SHA: headSha } = process.env;
  if (!/^\d+$/.test(number ?? "") || !/^[a-f0-9]{40}$/.test(headSha ?? "")
      || !/^[\w.-]+\/[\w.-]+$/.test(repo ?? "")) throw new Error("Invalid sync PR identity");
  const snapshot = JSON.parse(await readFile(snapshotPath, "utf8"));
  const pr = api(`repos/${repo}/pulls/${number}`);
  const files = api(`repos/${repo}/pulls/${number}/files`, "--paginate", "--slurp").flat();
  const mainSha = api(`repos/${repo}/git/ref/heads/main`).object.sha;
  git("fetch", "--no-tags", "origin", headSha);
  const blobs = {};
  for (const file of files) {
    if (GENERATED_PATHS.includes(file.filename)) blobs[file.filename] = git("rev-parse", `${headSha}:${file.filename}`);
  }
  validateSyncPullRequest(pr, files, snapshot, blobs, headSha, mainSha);
  console.log("Sync PR contains only the exact generated artifacts validated in this run.");
} else {
  throw new Error("Expected capture or verify");
}
