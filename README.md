# CoreAML website

Product website for CoreAML, a product of ZeroDaySecurity and Bex Labs.
Includes feature overviews, real demo screenshots and a demo enquiry form.

## Requirements
Node.js 22.13+ and pnpm 11.25.0. This is a React/Vinext application with a
Cloudflare Workers backend, not a static HTML file for Live Server.

## Run in VS Code / PowerShell
Open the folder containing package.json, then run:

```powershell
pnpm install --frozen-lockfile
pnpm db:local
pnpm dev
```

Open the URL shown by the terminal (normally http://localhost:5173).
Keep the terminal running. Ctrl+C stops the server.

If downloads time out, retry without deleting the lockfile or package cache:

```powershell
pnpm install --frozen-lockfile --network-concurrency=2 --fetch-timeout=600000
```

`pnpm db:local` applies migrations only to a local emulated database. It is
needed before the demo form can store local enquiries. No email or CRM
notifications are configured. The form reports a reference only after saving.

## Build

```powershell
pnpm build
pnpm start
```

## Deploy to your Cloudflare account
1. Sign in with `pnpm exec wrangler login`.
2. Create a database with `pnpm exec wrangler d1 create coreaml-demo-requests`.
3. Replace the placeholder database_id in wrangler.jsonc with the returned ID.
4. Apply the website enquiry migration with `pnpm db:remote` after confirming
   that the configured database is the intended destination.
5. Run `pnpm deploy`.

The placeholder ID supports local setup only; configure a real database before
production deployment. No production records or credentials are included.
The marketing website does not contain the CoreAML investigation backend.

## GitHub
Commit the source and pnpm-lock.yaml. Do not commit node_modules, dist, .wrangler,
local environment files, credentials, database exports or enquiry data.
No authentication is implemented for this public marketing site; do not expose
an administrative enquiry viewer without adding access controls.

## Public launch checks
Set approved company privacy/contact details and retention rules. Add only
permissioned client testimonials. KYC/screening coverage depends on deployment.
The screenshot records are fictional examples, not production customer data.

## Third-party notices
Retain vendor licence files. Cloudflare, Vinext, React and other dependencies
remain required; their names and licences are not product endorsements.
