# Gayathri Gupta Samudrala: Portfolio

A personal portfolio site built with React and Vite. Every push to `main` automatically
builds the site and publishes it to GitHub Pages
(see `.github/workflows/deploy.yml`).

## Where things live

The site is one scrolling page. The first screen shows a 3D illustration of Gayathri with
milestone stickers (places and roles, such as UAlbany and Osmania University) scattered around
her, the "About Gayathri" title, and a "Scroll" cue. Scrolling runs through a timeline, newest
first: the view zooms in on each entry's sticker while its card scrolls past, then zooms back
out for Skills and Contact. Clicking a sticker scrolls to its entry, and each sticker has its
own address, such as `/ualbany`, which opens the page at that entry.

- `src/data/content.js`: **all the text on the site**: the CV entries (`education`,
  `experience`, `research`, `fellowship`), the `milestones` with their stickers, the `timeline`
  (which entries appear, in what order, and which sticker each one zooms to), and `skills`.
  This is the file to edit for updates.
- `public/stickers/`: the milestone sticker images
- `public/images/`: the home-screen illustration (`about-me.jpg`) and the paper texture (`paper.svg`)
- `src/components/`: `Stage` (the picture, the scattered stickers and the zoom), `Hero` (the
  title and scroll cue), `Timeline` (the cards, Skills and Contact), `Layout` and `Header`
- `src/pages/`: the Skills and Contact sections at the end of the timeline
- `src/styles.css`: colors, fonts, and layout. Theme colors are defined at the top.
- `scripts/static-pages.js`: creates a real page for each address when the site is built

## Common edits

- **Add a milestone sticker:** cut the sticker out onto a transparent background, keeping its
  own white border, and save it as a PNG in `public/stickers/`. Add it to `milestones` in
  `src/data/content.js` with its address and `ratio` (the image's width ÷ height, so stickers
  of different shapes get a similar size), then add its entry to `timeline` with that address
  as `focus`. The stickers are scattered automatically, away from her and from each other;
  change `SEED` at the top of `src/components/Stage.jsx` for a different scatter.
- **Replace the home-screen illustration or add its video:** save the image as
  `public/images/about-me.jpg` (16:9, plain lavender background, the same color as `--bg` in
  `src/styles.css`). For an animated version, add an MP4 to `public/images/` and set
  `aboutArt.videos.wide` in `src/data/content.js`. Her size on computers is `IMAGE_HEIGHT` in
  `Stage.jsx` and in `.about-hero-media` in `src/styles.css`.
- **Edit the intro under the title:** change `profile.intro` in `src/data/content.js`.
- **Add a job or project:** copy an existing entry in `experience` or `research.projects` in
  `src/data/content.js`, change the text, and add it to `timeline`.

## Run it locally

Requires [Node.js](https://nodejs.org) (LTS version).

```bash
npm install
```

```bash
npm run dev
```
