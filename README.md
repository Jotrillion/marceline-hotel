# Marceline Hotel

A responsive hotel demo with English and French operations dashboards and guest-facing room and residence booking pages.

## Preview locally

Run a static web server from the repository root, then open `http://localhost:8000`:

```powershell
python -m http.server 8000
```

- English: `/`
- Français — Marceline: `/index.fr.html`
- Guest booking: `/stay.html`
- Réservation client: `/sejour.html`

The dashboards and booking pages use locally bundled hotel photography in `assets/`.

## Publish with GitHub Pages

The `Deploy hotel app to GitHub Pages` workflow publishes the static files after each push to `main`.
In the repository’s **Settings → Pages**, set the build and deployment source to **GitHub Actions** once. After the first successful workflow run, the site will be available at:

<https://jotrillion.github.io/marceline-hotel/>

The English page is the default; use its **FR** link for the French Marceline version.

Dashboard reservations, check-ins, housekeeping updates, and booking requests are saved in the current browser for this demo. They are not shared between visitors or synced to a hotel database. The guest booking pages demonstrate a photo catalog, sample nightly rates, date selection, and a locally saved estimate. They do not send reservation requests, check room availability, or charge a payment method. Connect a booking backend and payment provider before accepting real reservations or payments.
