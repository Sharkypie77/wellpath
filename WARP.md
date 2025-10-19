# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project layout
- Git root contains the application in wellpath-main/. Run all app commands from that directory unless noted.

Common commands (run in wellpath-main/)

```bash path=null start=null
# Dev server (Next.js App Router, Turbopack, port 9002)
npm run dev
```

```bash path=null start=null
# Typecheck
npm run typecheck
```

```bash path=null start=null
# Lint (Next.js eslint integration)
npm run lint
```

```bash path=null start=null
# Build (production)
npm run build
```

```bash path=null start=null
# Start built app
npm start
```

```bash path=null start=null
# Genkit local dev for AI flows (runs src/ai/dev.ts)
npm run genkit:dev
# Or watch mode
npm run genkit:watch
```

Notes on testing
- No test runner or scripts are configured in package.json; single-test execution is not applicable at present.

High-level architecture
- Framework: Next.js 15 (TypeScript) using the App Router under src/app with route groups.
  - Global entrypoints: src/app/layout.tsx, src/app/page.tsx, src/app/globals.css.
  - Auth and main app split:
    - src/app/login: login flow.
    - src/app/(app)/: primary application shell with routes such as dashboard, appointments, medications, assessment, education, chatbot, daily-quiz, profile, progress; has its own layout and page.
- UI system: shadcn/ui + Radix primitives + Tailwind CSS.
  - Configuration in components.json and tailwind.config.ts.
  - Reusable primitives live in src/components/ui; app-specific pieces in src/components/ (e.g., app-header, appointment-card, auth-tabs, sidebar, charts).
- AI/Genkit: Google Genkit integrated for local AI tooling.
  - Entrypoints in src/ai/genkit.ts and src/ai/dev.ts; feature flows in src/ai/flows/ (chatbot, daily-quiz, personalized-health-recommendations).
  - npm scripts genkit:dev and genkit:watch are provided; genkit-cli is a dev dependency.
- Firebase integration:
  - Client config/providers in src/firebase/ (config.ts, provider.tsx, client-provider.tsx) and Firestore hooks (firestore/use-collection.tsx, firestore/use-doc.tsx). Non-blocking auth/update helpers are present.
  - Hosting configured via firebase.json (frameworksBackend region us-central1).
  - Firestore security model in firestore.rules: strict user-ownership for private data under /users/{userId}/..., public read for /health_articles and /tags; writes to public collections are disabled by default.
  - Data schemas and collection layout documented in docs/backend.json.
- Application utilities and data:
  - src/lib/: shared types (types.ts), utility helpers (utils.ts), i18n setup (i18n.ts), seed/placeholder data (data.ts, placeholder-images.json).
  - src/hooks/: cross-cutting hooks like use-mobile and use-toast.

Key references
- README.md: brief starter notes (entry at src/app/page.tsx).
- docs/blueprint.md: product and UI blueprint for “HealthWise Hub”.
- docs/backend.json: canonical JSON Schemas and Firestore collection structure.
- firestore.rules: enforced authorization and public/private data boundaries.
- next.config.ts and tsconfig.json: Next build/runtime and TS path alias (@/* -> src/*).
