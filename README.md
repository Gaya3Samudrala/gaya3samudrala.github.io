# Gayathri Gupta Samudrala: Portfolio

A personal portfolio site built with React and Vite. Every push to `main` automatically
builds the site and publishes it to GitHub Pages
(see `.github/workflows/deploy.yml`).

## Where things live

The whole site is one screen: a 3D illustration of Gayathri fills it, milestone stickers (places
and roles, such as UAlbany and Osmania University) sit around her, and clicking a sticker
opens that milestone in a frosted-glass panel over the home screen. Each milestone has its own
address, such as `/ualbany`, which opens the home screen with that panel already open. The
sections (About, Research, Experience, Education, Skills, Contact) still work at their own
addresses, such as `/research`, but have no sticker for now.

- `src/data/content.js`: **all the text on the site**, plus the list of sections (`pages`)
  with their titles and intro lines, and the `milestones` with their stickers. This is the
  file to edit for updates.
- `public/stickers/`: the milestone sticker images
- `public/images/`: the home-screen illustration (`about-me.jpg`)
- `src/pages/`: the content of each section's panel (`Milestone.jsx` for every milestone)
- `src/components/`: the header, home title (`Hero`), milestone `Stickers`, and glass `Panel`.
  Sticker positions are set at the top of `Stickers.jsx`.
- `src/styles.css`: colors, fonts, and layout. Theme colors are defined at the top.
- `scripts/static-pages.js`: creates a real page for each address when the site is built

## Common edits

- **Add a milestone sticker:** cut the sticker out onto a transparent background, keeping its
  own white border, and save it as a PNG in `public/stickers/`. Then add it to `milestones`
  in `src/data/content.js` with its address, title, intro, and `ratio` (the image's width ÷
  height, so stickers of different shapes get a similar size). Only the shadow is added by
  the site.
- **Replace the home-screen illustration or add its video:** save the image as
  `public/images/about-me.jpg` (16:9, plain lavender background, the same color as `--bg` in `src/styles.css`). The paper texture over the whole site is `public/images/paper.svg`, laid on top by `body::after` in `src/styles.css`.
  For an animated version, add an MP4 to `public/images/` and set `aboutArt.videos.wide` in
  `src/data/content.js`. If her outline changes, update `OUTLINE` at the top of `Stickers.jsx`; her size on computers is `IMAGE_HEIGHT` there and in `.about-hero-media` in `src/styles.css`.
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
