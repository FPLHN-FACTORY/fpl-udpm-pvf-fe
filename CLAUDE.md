# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # TypeScript check + Vite build
npm run preview   # Preview production build
```

There are no test or lint scripts configured.

## Architecture

This is a Vue 3 + TypeScript SPA using Vite, Ant Design Vue v4, Tailwind CSS, Pinia, and Vue Router 4.

### Atomic Design structure

Components follow strict Atomic Design layers under `src/components/`:

| Layer | Purpose | Examples |
|---|---|---|
| `atoms/` | Wraps Ant Design primitives with PVF props/styles | `BaseButton`, `BaseInput`, `BaseIcon` |
| `molecules/` | Composes atoms into form elements / UI units | `FormField`, `LoginForm`, `SidebarItem` |
| `organisms/` | Feature-level sections, may be feature-namespaced | `Sidebar`, `AppHeader`, `student/StudentTable` |
| `templates/` | Layout shells with `<router-view>` outlets | `MainLayout`, `AuthLayout` |
| `pages/` | Route-level pages, may be feature-namespaced | `DashboardPage`, `student/StudentInfoPage` |

### Modular routing

Routes live in `src/router/routes/<feature>/`. Each feature folder has individual route files (`info.ts`, `equipment.ts`, etc.) and an `index.ts` that aggregates them into a `RouteRecordRaw[]`. The main `src/router/index.ts` imports all feature exports.

Route `meta` drives dynamic sidebar rendering: `{ title, icon, isHeader? }`. Icons use Boxicons names (e.g., `BxsUserDetail`), rendered by `NavIcon.vue` via inline SVG paths.

All page components are lazy-loaded via dynamic `import()`.

### Services and state

- `src/services/` — plain functions using the Fetch API. Auth service reads `VITE_API_BASE_URL` from env. Student service uses an in-memory virtual DB with simulated 300 ms delay (dev only).
- `src/stores/` — Pinia stores. `auth.ts` wraps `authService`, persists token in `localStorage`.
- `src/types/` — shared TypeScript types. `index.ts` for common types; feature types in their own files (e.g., `student.ts`).
- `src/utils/validation.ts` — reusable `ValidationRule` objects and pre-built rule sets for forms.

### Styling conventions

- Tailwind utilities for layout; scoped CSS with `:deep()` for Ant Design overrides.
- Custom color tokens are defined in `tailwind.config.js`: `pvf-red` (#EB1017), `pvf-red-light`, `pvf-red-lighter`, `pvf-red-pale`, plus a gray palette.
- Fonts: Inter (body), Oswald (headings).

### Soft delete pattern

`Student` records use `isDeleted: boolean` + `deletedAt?: string` for soft deletion; a separate restore operation exists. Hard delete is a distinct operation.
