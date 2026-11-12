# Apollo Brian — Software Engineering Portfolio

A responsive React and Vite portfolio for Apollo Brian, founder of Solarrick. The interface uses Solarrick's navy, electric-blue, and cyan palette, with Naoja Electrical & Electronics presented as the top featured project. Content is kept in `src/content.js`; the supplied CV PDF remains the downloadable source document in the project root.

## Local development

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Deploying on Vercel

Import the project into Vercel and use the standard Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Set `VITE_SITE_URL` to the canonical production origin, including `https://` and without a trailing path (for example, `https://portfolio.example`). The build uses it to write `dist/sitemap.xml`, add canonical/Open Graph URL metadata, and include the sitemap location in `dist/robots.txt`. Vercel's production URL is used as a fallback when available. Do not set this to a preview deployment URL.

The `vercel.json` file configures security headers for production hosting on Vercel. If deploying to another host, configure equivalent headers there. Use HTTPS in production.

## Updating portfolio content

- Update confirmed profile links and skills in `src/content.js`.
- Update each project case study there; keep planned, learning, and live work clearly distinguished.
- Add published articles to the `articles` collection in `src/content.js`. Each entry supports an id, title, publication date, category, reading time, summary, optional cover image and alt text, paragraph/code content blocks, and related article ids.
- Replace the supplied CV PDF with an updated document when needed, keeping its filename or updating the import in `src/App.jsx`.
- Add published articles only when article content and publication details are available; the current writing section intentionally shows searchable learning topics instead.

## Contact form and privacy

The form validates required fields in the browser and prepares an email draft to the published contact address. It does not send or store form data on a server, and therefore has no server-side validation or rate limiting. The hidden honeypot is a lightweight bot deterrent, not a substitute for server-side abuse controls. A mail client is required to send the prepared message.

## Scope notes

No backend or database is needed for this static portfolio. API, database, and DevSecOps diagrams are labeled as learning references where they do not represent a verified project implementation. FARDAgriTRUST remains identified as in development.
