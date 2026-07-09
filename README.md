# Mothy documentation site

The public documentation site for Mothy, built with [Astro Starlight](https://starlight.astro.build).
Content lives in `src/content/docs/` as markdown; the same set is published to the
internal SharePoint knowledge base, and this project renders it as a themed,
searchable public site.

## Develop

    npm install
    npm run dev

Open the printed local URL. Edits to `src/content/docs/*.md` reload live.

## Build

    npm run build

Static output goes to `dist/` (git-ignored).

## Publish to GitHub Pages

This is intended for a public repo (for example `ImpendingTech/mothy-docs`), since
GitHub Pages serves a public site from a private repo only on Team or Enterprise
plans. The workflow at `.github/workflows/deploy.yml` builds and deploys on every
push to `main`. To turn it on, once:

1. Repo Settings, then Pages, then set Source to GitHub Actions.
2. Push to `main`. The site publishes to `https://<org>.github.io/<repo>/` and the
   run summary shows the link.

The `base` in `astro.config.mjs` is set to `/mothy-docs`. If the repo name differs,
change `base` to match. For a custom domain at the root, set `base` to `/`.

## Custom domain

1. Add the domain in Settings, then Pages, then Custom domain (for example
   docs.chrysalis.ai).
2. Create the DNS CNAME your registrar needs, pointing at `<org>.github.io`.
3. Put the domain in `public/CNAME` so each build preserves it, and set `base` to
   `/` in `astro.config.mjs`.

## Branding

The palette is in `src/styles/brand.css`. Drop the real moth logo (from the design
system, not generated) into `src/assets/logo.svg` and uncomment the `logo` line in
`astro.config.mjs`. Replace `public/favicon.svg` with the brand favicon.
