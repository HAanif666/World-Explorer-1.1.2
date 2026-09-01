# 🌍 WORLD EXPLORER v1.1.2

## Main pages
- `index.html`
- `explorers.html`

## Backend
- `app.py`
- `requirements.txt`
- `templates/`
- `static/`

## Important fixes included in this backup
1. The World Explorers mode button opens `explorers.html`.
2. The mode screen is hidden after a mode has been selected once.
3. Favourite POST requests use `/api/favourites`, so they work after deployment instead of only on localhost.
4. Flask serves the main frontend files and the `Images` folder, allowing the Render deployment to show the website at `/`.

## Render start command

```text
gunicorn app:app