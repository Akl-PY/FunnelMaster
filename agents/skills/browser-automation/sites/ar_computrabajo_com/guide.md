---
site: ar.computrabajo.com
verified: 2026-10-26
scope: search, killer questions (/candidate/kq), and direct application (/candidate/postapply)
---

# Computrabajo Argentina

## Verified behavior

- **Cloudflare gate:** Headless Chromium returns `403 Forbidden`. Always open Computrabajo in `--headed` mode (`browser_mode: "headed"`).
- **Search URLs:** `https://ar.computrabajo.com/trabajo-de-<slug>` (e.g. `trabajo-de-full-stack`, `trabajo-de-desarrollador-full-stack`, `trabajo-de-react`, `trabajo-de-node-js`).
- **Offer cards:** `article.box_offer` containing `a[href*="/ofertas-de-trabajo/"]` (offer title + link) and `p.fs16, a.fc_base` (company name). Cards already applied show `Ya te has postulado` or `Aplicada`.
- **Apply flow:**
  1. Navigate to the offer URL (`https://ar.computrabajo.com/ofertas-de-trabajo/...`) and extract the offer title and description.
  2. **Mandatory fit & CV gate:** Run `npm run cv -- ensure --role "<title>" --description "<description>"` before clicking apply. Computrabajo search pages often include fallback non-IT offers (e.g. civil architecture or non-technical teaching); if `ensure` rejects the role, skip immediately.
  3. Click the apply CTA (`a, button, span[data-apply], [id*="apply"], .b_primary` matching `/Postularme|Aplicar|Enviar mi CV/i`).
  3. Clicking triggers a full-page navigation (do not `await` inside the same `eval` after clicking):
     - If the offer has screening/killer questions, it lands on `https://candidato.ar.computrabajo.com/candidate/kq?oi=...`. Fill text/number inputs, selects, and radio groups from the verified answer bank and click `Enviar` / `Postularme` / `Continuar`.
     - Upon completion, it redirects to `https://candidato.ar.computrabajo.com/candidate/postapply?oi=...` displaying **`Te postulaste correctamente`**.

## Safe handling

- Use `.agents/skills/browser-automation/scripts/browser.js` only.
- Never store the account password or session cookies in PostgreSQL or repository files.
- Stop at any captcha and follow the captcha rule in `AGENTS.md`.
