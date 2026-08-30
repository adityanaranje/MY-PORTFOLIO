# MY-PORTFOLIO

Personal portfolio of **Aditya Naranje — AI/ML Engineer**, showcasing LLM applications,
RAG systems, AI agents, machine-learning and data-analysis work.

🔗 **Live site:** https://adityanaranje.github.io/MY-PORTFOLIO/

## Tech stack

Plain **HTML + CSS + vanilla JavaScript** — no frameworks, no build step, no backend.
Fully static, so it deploys directly to GitHub Pages.

- `index.html` — semantic markup, SEO/Open Graph metadata, JSON-LD
- `css/styles.css` — design system (CSS variables), dark/light themes, responsive layout
- `js/main.js` — project/cert/blog rendering, nav, theme toggle, scrollspy, reveal animations
- `static/` — images, project screenshots, certificates and the CV PDF (`static/docs/CV.pdf`)

## Sections

Hero · About · What I build (RAG / Agents / LLM apps / Automation) · Skills ·
Experience · Projects (filterable) · Education · Certifications · Writing · Contact.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Deployment

Pushing to `main` triggers `.github/workflows/static.yml`, which publishes the
repository to GitHub Pages automatically.
