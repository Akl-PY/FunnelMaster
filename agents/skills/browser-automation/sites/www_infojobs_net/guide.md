---
site: www.infojobs.net
verified: 2026-10-25
scope: isolated browser launch only
---

# InfoJobs

## Verified behavior

- The project wrapper opens the candidate login page at `https://www.infojobs.net/candidate/candidate-login/candidate-login.xhtml` in the isolated browser profile.
- The official InfoJobs help page describes searching offers and applying from the candidate account.
- `npm run platforms -- connect infojobs --country es` opens the candidate login page in headed mode.
- The project can generate a search-results URL from a role and country. Route acceptance and results were not independently validated.

## Not validated

No authenticated session, login selector, application form, question field, or submit flow has been inspected. Do not interact with the page DOM or submit applications until a signed-in session is available and this guide has been extended with observed behavior.

## Safe handling

- Use `.agents/skills/browser-automation/scripts/browser.js` only.
- Never store the account password or session cookies in PostgreSQL or repository files.
- When a login is required, leave the headed page open for the user. Record the session only after login is complete.
- Stop at any captcha and follow the captcha rule in `AGENTS.md`.
