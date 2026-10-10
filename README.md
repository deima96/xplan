# XPLAN website (Next.js)

Next.js App Router + TypeScript. Two pages: `/` (landing, looping video) and `/contact`.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure
```
app/
  layout.tsx            fonts (Rubik), metadata, viewport
  page.tsx              landing page
  contact/page.tsx      contact page
  api/contact/route.ts  form endpoint (validates, emails via Resend)
  globals.css
components/
  BackgroundVideo.tsx   muted looping video + pause/play, honours reduced-motion
  ContactForm.tsx       client form with validation
public/videos/          home.mp4, contact.mp4 (compressed from the deck)
public/posters/         first-frame posters shown while the video loads
```

## Contact form email
Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
Without them the form works in development (logs to the terminal) and shows an error in production.
Swap `app/api/contact/route.ts` for SMTP/SendGrid/etc. if you prefer.

## Landing page
Three layers, bottom to top:
1. `public/videos/home.mp4` – your video, unmodified (poster: `public/posters/home.jpg`)
2. `components/HeroOverlay.tsx` – your SVG (`design/XPLAN-grid-no-logo-contact.svg`) inlined, so the text is real text
3. `components/Navbar.tsx` – logo + Contact Us (logo file: `public/logo.svg`, a placeholder you should replace)

Look settings are CSS variables on `.home` in `app/globals.css`: `--shade` (darkening layer),
`--ov-line` and `--ov-ink` (grid/text colour; your SVG used `#b3b3b3`, now white for contrast).
Your SVG uses the font "Lovin Sans". Put the file in `public/fonts/` and uncomment the `@font-face`
in `globals.css`; until then Rubik is used.
On portrait phones the SVG is replaced by a re-flowed version of the same grid and text (`.mobile-overlay`).

## Contact page
`public/videos/contact.mp4` still comes from the design deck, so the XPLAN logo is part of the video
(the form itself is real HTML). Swap in clean footage to make the logo live too.
