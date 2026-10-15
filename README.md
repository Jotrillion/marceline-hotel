# Marceline Hotel

A responsive hotel-operations demo with English and French interfaces, reservation check-in, room status, guest profiles, housekeeping tasks, and hotel insights.

## Preview locally

Run a static web server from the repository root, then open `http://localhost:8000`:

```powershell
python -m http.server 8000
```

- English: `/`
- Français — Marceline: `/index.fr.html`

## Publish with GitHub Pages

The `Deploy hotel app to GitHub Pages` workflow publishes the static files after each push to `main`.
In the repository’s **Settings → Pages**, set the build and deployment source to **GitHub Actions** once. After the first successful workflow run, the site will be available at:

<https://jotrillion.github.io/marceline-hotel/>

The English page is the default; use its **FR** link for the French Marceline version.

This app currently uses in-memory demonstration data. Reservations and check-ins are not persisted to a database.
