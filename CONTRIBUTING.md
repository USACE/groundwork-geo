# Contributing

We welcome contributions from USACE developers and want to make this a community project.

`groundwork-geo` follows an intersource model. In practice, that means this repository is intended to be shared across USACE teams, with contributions coming primarily from USACE employees and affiliated delivery teams building on Groundwork.

This repository should stay focused on reusable mapping primitives that support multiple downstream applications.

## Local Development


Install dependencies:

```bash
npm ci
```

On Windows PowerShell with execution-policy restrictions, use:

```powershell
npm.cmd ci
```

Run the local dev server:

```bash
npm run dev
```

Build the library:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

## Repository Layout

- `lib/` contains the publishable library source
- `lib/components/` contains React map and layout UI
- `lib/classes/` contains layer abstractions
- `lib/store/` contains redux-bundler state bundles
- `lib/tools/` contains map-oriented tools such as the basemap picker and layer tree
- `src/` contains the local Vite app used for development
- `.github/workflows/` contains GitHub Pages and npm publish workflows

## Development Notes

- The package entrypoint is `lib/index.jsx`
- The local app entrypoint is `src/main.jsx`
- `npm run build` currently builds the distributable library output in `dist/`
- The repo uses Vite and ESM
- The upstream Groundwork documentation is the home for user-facing mapping docs

## Contribution Guidance

- Treat this as an intersource repository for USACE contributors
- Keep the package aligned with the broader Groundwork ecosystem
- Treat `lib/` as the package source of record and `src/` as a lightweight demo surface
- Validate changes with build, lint, and test commands before merging

## Current State

The repository is still evolving and some implementation details are unfinished. If you touch rough edges in the current code, prefer incremental improvements that make the package easier to consume and maintain without changing its purpose as the Groundwork mapping sub-library. Make an issue to discuss!
