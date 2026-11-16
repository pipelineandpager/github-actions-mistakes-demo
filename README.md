# actions-mistakes-demo

Demo repo for Pipeline & Pager video #1: "7 GitHub Actions Mistakes That Break Your Pipeline (and the Fix for Each)".

The app itself is trivial (a Node script that prints a line). The point of the repo is the workflow file.

## Files

- `.github/workflows/demo.yml` — the broken workflow. All 7 mistakes, each marked with a `MISTAKE` comment.
- `.github/workflows/demo-fixed.yml` — the same workflow with all 7 fixed. Use it as the reference while recording, or swap it in to show the green run.
- `index.js`, `test.js` — the tiny demo app. `test.js` has one smoke test.
- `deploy.sh` — a fake deploy step (prints a line, exits 0). Nothing really deploys.

## Get it on GitHub

1. Create an empty repo on GitHub (e.g. `actions-mistakes-demo`). Do not add a README/license there — this folder already has them.
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Demo repo: 7 GitHub Actions mistakes, broken and fixed"
   git branch -M main
   git remote add origin https://github.com/<you>/actions-mistakes-demo.git
   git push -u origin main
   ```
   Or upload the files through the GitHub web UI (Add file → Upload files).
3. No secrets are required. Optionally add a dummy repo secret named `API_KEY` (Settings → Secrets → Actions) so the fixed workflow's deploy step looks realistic — any fake value; never a real key.

## The 7 mistakes (in demo.yml)

1. **Secrets in plain text** — the workflow echoes a literal fake token (`sk-demo-FAKE-TOKEN-1234`). It shows up in the run log in plain text, because GitHub only masks values that come from the secrets store. (Why a literal, not a stored secret: the runner masks stored secrets as `***` in logs, so echoing a real stored secret would not show the leak on camera. Never use a real token here.)
2. **Floating action versions** — `actions/checkout@main`. `main` moves; the break only happens when upstream ships a change, so show the line and explain it — don't try to force a live failure.
3. **Default token too broad** — no `permissions:` block, so the token gets broad write access. Show the missing block, explain the fix (`contents: read`, add only what's needed).
4. **pull_request_target running PR code** — the workflow triggers on `pull_request_target` and checks out the PR's head commit, then runs its code with secrets available. To demo it, open a pull request (a branch in this repo is fine) and show the run executing the PR's code.
5. **No caching** — `npm ci` from scratch every run. On this tiny app the install is seconds (one small dependency), so show the log lines and explain the cost scales with real dependencies — minutes back on a real app. Turn the cache on in the fixed file and show the cache-hit line.
6. **No timeout, no concurrency guard** — no `timeout-minutes`, no `concurrency` group. Don't demo this live: a hung job runs for 6 hours by default. Show the missing lines and explain.
7. **Green tick that means nothing** — the test step has `continue-on-error: true`. To demo it: break the test on purpose (in `test.js`, change `2` to `3`), push, and watch the run stay green while the test fails. Then remove `continue-on-error`, push again, and watch it go red. Restore the test afterwards.

## Recording order (from the script)

Record the screen first, one pass per mistake, then voiceover over it. The narration script is `video-01-narration-script.md` (in the channel files, not this repo). Fix the mistakes one at a time on screen; the fixed workflow file is your reference for what "fixed" looks like.

## Resetting between takes

The broken file is the starting point. If you fix things live and want to re-shoot a mistake, re-apply its `MISTAKE` line from the list above, or copy `demo.yml` back from this folder.
