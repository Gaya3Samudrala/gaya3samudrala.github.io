# Gayathri Gupta Samudrala: Portfolio

A personal portfolio site built with React and Vite. Every push to `main` automatically
builds the site and publishes it to GitHub Pages
(see `.github/workflows/deploy.yml`).

## Where things live

- `src/data/content.js`: **all the text on the site.** This is the file to edit for updates.
- `src/components/`: one component per section (Hero, About, Research, Experience, and so on)
- `src/styles.css`: colors, fonts, and layout. Light and dark theme colors are defined at the top.
- `public/images/`: images, such as your profile photo

## Common edits

- **Add your photo:** save it as `public/images/profile.jpg` (square works best), then in
  `src/data/content.js` change `photo: null` to `photo: 'images/profile.jpg'`.
- **Edit the About text:** change `about.paragraphs` in `src/data/content.js`.
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
