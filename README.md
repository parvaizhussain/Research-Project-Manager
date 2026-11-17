# Research Project Manager — Frontend

Next.js 16 + Tailwind CSS 4 frontend for the thesis-tracking platform. The screens match the approved UI designs and run on mock data for now.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Screens

| Route | Screen | Requirements |
| --- | --- | --- |
| `/` | Home (guest): hero search, featured projects, research areas | FR-06, FR-08 |
| `/explore` | Search and filter published projects, with a "No results found" state | FR-06 |
| `/projects/[slug]` | Public project detail page | FR-07 |
| `/student` | Student workspace: progress, milestones, uploads, versions, feedback (mobile layout below 768px) | FR-02 to FR-05, FR-11 |
| `/supervisor` | Supervisor progress dashboard | FR-10 |
| `/supervisor/review` | Review a milestone: approve or request changes | FR-05 |

## Structure

```
src/
  app/                 routes (App Router)
  components/          shared UI (headers, cards, status badges, upload dropzone)
  components/ui/       shadcn/ui-style primitives (Button, Card, Avatar)
  lib/types.ts         data shapes that mirror the Strapi content types
  lib/data.ts          mock data — replace with Strapi REST calls
  app/globals.css      design tokens (colours, fonts) in a Tailwind @theme block
```

## Next steps

- **Data:** replace the exports in `src/lib/data.ts` with `fetch()` calls to Strapi, for example `GET /api/projects?populate=*`.
- **Auth:** add NextAuth.js with a credentials provider that calls Strapi `/api/auth/local`. Protect `/student` and `/supervisor` by role in `middleware.ts`.
- **Uploads:** `UploadDropzone` already validates file type and size in the browser. Post the file to Strapi's upload endpoint, configured for Cloudinary or S3, and repeat the same check on the server.
- **shadcn/ui:** run `npx shadcn@latest init`. The components in `components/ui` follow the same API, so you can swap them for the generated ones.
- **Charts:** the dashboard bars are plain CSS. Replace them with a Recharts `BarChart` if you need tooltips.
- **Pages still to build:** `/login` and `/signup` are linked but not built yet.
