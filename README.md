# Gayathri Gupta Samudrala: Portfolio

A personal portfolio site built with React and Vite. Every push to `main` automatically
builds the site and publishes it to GitHub Pages
(see `.github/workflows/deploy.yml`).

## Where things live

- `src/data/content.js`: **all the text on the site.** This is the file to edit for updates.
- `src/pages/`: one file per page: Home (About), Research, Experience, Skills
- `src/components/`: shared pieces, such as the header, the page banners, and the Contact section at the bottom of every page
- `scripts/static-pages.js`: creates a real page for each URL (such as `/research`) when the site is built
- `src/styles.css`: colors, fonts, and layout. Light and dark theme colors are defined at the top.
- `public/images/`: images, such as your profile photo

## Common edits

- **Change the home page character:** replace `public/images/about-wide.jpg` (16:9, for computers)
  and `public/images/about-tall.jpg` (4:5, for phones), plus the `-dark` versions used in dark mode.
  If the new images have a different background color, update `--bg` at the top of `src/styles.css` to match. For an animated version, save the video in
  `public/images/` and set `aboutArt.video` in `src/data/content.js`.
- **Edit the About text:** change `about.paragraphs` in `src/data/content.js`.
- **Change a page's intro line:** edit `pages` at the bottom of `src/data/content.js`.
- **Add a job or project:** copy an existing entry in `experience` or `research.projects`
  in `src/data/content.js` and change the text.

## Run it locally

Requires [Node.js](https://nodejs.org) (LTS version).

```bash
npm install
```

```bash
npm run dev
```
