# itsrkator.github.io

Personal portfolio and resume site for **Rohitash Kator**, Senior Full-Stack Software Engineer. Hosted on [GitHub Pages](https://pages.github.com/).

## Overview

Static single-page portfolio with sections for:

- **Home** — Intro and hero
- **About** — Bio and experience
- **Projects** — Work and side projects
- **Skills** — Tech stack and tools
- **Articles** — Blog posts
- **Contact** — Get in touch

Additional pages: blog, portfolio details, hobbies, skills, and profiles.

## Tech Stack

- HTML5, CSS3, JavaScript
- [Bootstrap](https://getbootstrap.com/) for layout and components
- Custom theme: `css/rk-modern.css`, `css/style.css`
- Material Design Icons, Tiny Slider, MK Lightbox

## Local Development

1. Clone the repo:
   ```bash
   git clone https://github.com/itsRkator/itsrkator.github.io.git
   cd itsrkator.github.io
   ```

2. Open in a browser (no build step):
   - Open `index.html` directly, or
   - Use a simple static server, e.g.:
     ```bash
     npx serve .
     ```
     Then visit the URL shown (e.g. `http://localhost:3000`).

## Project Structure

```
├── index.html          # Main portfolio page
├── page-blog.html      # Blog listing
├── page-portfolio.html # Portfolio listing
├── page-skills.html    # Skills detail
├── css/                # Styles (Bootstrap, theme, colors)
├── js/                 # Scripts (app, contact, sliders, etc.)
├── images/             # Assets and skill icons
├── assets/             # PDFs (CV, resume)
└── fonts/              # Icon fonts
```

## License

ISC
