# Gayathri Gupta Samudrala: Portfolio

A personal portfolio site built with React and Vite. Every push to `main` automatically
builds the site and publishes it to GitHub Pages
(see `.github/workflows/deploy.yml`).

## Where things live

The whole site is one screen: the animated character fills it, a sticker for each section
(About, Research, Experience, Education, Skills, Contact) sits around her, and clicking a
sticker opens that section in a frosted-glass panel over the animation. Each section also has its own address, such as
`/research`, which opens the home screen with that panel already open.

- `src/data/content.js`: **all the text on the site**, plus the list of sections (`pages`)
  with their titles, intro lines, and icons. This is the file to edit for updates.
- `public/icons/`: the icon for each section (`about.svg`, `research.svg`, `experience.svg`,
  `education.svg`, `skills.svg`, `contact.svg`)
- `public/images/`: the character images and videos
- `src/pages/`: the content of each section's panel
- `src/components/`: the header, character (`Hero`), section `Stickers`, and glass `Panel`.
  Sticker positions are set at the top of `Stickers.jsx`.
- `src/styles.css`: colors, fonts, and layout. Theme colors are defined at the top.
- `scripts/static-pages.js`: creates a real page for each address when the site is built

## Common edits

- **Use your own sticker icons:** save each one in `public/icons/` with the same name as the
  placeholder it replaces (e.g. `research.svg`). SVG or transparent PNG both work; square
  images look best. The white sticker border and shadow are added automatically, so the
  image itself only needs the artwork on a transparent background. If you use PNG, update
  the file name in `pages` in `src/data/content.js`.
- **Change the home page character:** replace `public/images/about-wide.jpg` / `.mp4`
  (16:9, for computers) and `public/images/about-tall.jpg` / `.mp4` (for phones).
- **Edit the About text:** change `about.paragraphs` in `src/data/content.js`.
- **Change a section's title or intro line:** edit `pages` at the bottom of `src/data/content.js`.
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
