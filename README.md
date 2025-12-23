# ICCT Campus Weather Checker

This repository contains a simple static weather checker UI for ICCT campuses. It uses wttr.in (free) to fetch weather data in JSON format and displays a modern, responsive weather card.

What changed

- Redesigned `index.html` with a campus select and a result card.
- Updated `style.css` to a modern responsive layout and improved styling.
- Rewrote `script.js` to fetch JSON from `wttr.in`, handle spinner, geolocation, localStorage (saves last query), and show friendly error messages.

How to run

1. Open the project folder and simply open `index.html` in your browser. No server or build step necessary.

2. Usage:
   - Pick an ICCT campus from the dropdown and click "Check".
   - (Note: the "Use my location" button was removed from the UI.)

Notes & troubleshooting

- The app fetches data from `https://wttr.in/<query>?format=j1`. No API key is required.
- If fetching fails, check your network or try a different query (sometimes very short queries get ambiguous results).
<!-- Geolocation note removed because the location feature was removed from the UI. -->

Security

- No secrets are stored in the repo. LocalStorage only saves the last query string for convenience.

Files of interest

- `index.html` — main markup
- `style.css` — styling and responsive rules
- `script.js` — fetching and UI logic

If you'd like, I can:

- Add weather icons (SVG) for each condition and include them locally.
- Add hourly/daily forecast cards below the main result.
- Deploy a tiny static server configuration for local HTTPS testing.

Recent visual updates (applied):

- Glassmorphism cards: subtle blurred/transparent cards with soft borders for the search form and result card.
- Decorative header pill and larger header typography for a modern hero feel.
- Smooth fade-in animations and button hover states for a polished interaction.
- Background image set to `img/Caintamainhih-01.jpg` with a gentle overlay to keep text readable.
- SVG weather icons added under `img/icons/` and wired into the UI (replaces emoji icons).

Final check:

- Completed code scan and removed references to the removed location button and text search. The UI and scripts are consistent.

If you'd like more polish I can:

- Replace emoji weather icons with a small SVG icon set and map conditions to those icons.
- Add hourly/daily forecast panels beneath the main card.
- Provide a small build step to generate optimized background images for fast loading on mobile.
