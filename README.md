# Marceline Hotel

A responsive hotel-operations demo with English and French interfaces, reservation check-in, room status, guest profiles, housekeeping tasks, and hotel insights.

## Preview locally

Run a static web server from the repository root, then open `http://localhost:8000`:

```powershell
python -m http.server 8000
```

- English: `/`
- Français — Marceline: `/index.fr.html`

The overview includes locally bundled hotel and resort photography in `assets/` (sourced from Unsplash), so the images are included with the app.

## Publish with GitHub Pages

The `Deploy hotel app to GitHub Pages` workflow publishes the static files after each push to `main`.
In the repository’s **Settings → Pages**, set the build and deployment source to **GitHub Actions** once. After the first successful workflow run, the site will be available at:

<https://jotrillion.github.io/marceline-hotel/>

The English page is the default; use its **FR** link for the French Marceline version.

Reservations, check-ins, and housekeeping updates are saved in the current browser for this local demo. They are not shared between visitors or synced to a hotel database.
