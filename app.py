import os
import sqlite3
from pathlib import Path

from flask import (
    Flask,
    request,
    session,
    render_template,
    jsonify,
    send_from_directory,
)
from flask_cors import CORS


BASE_DIR = Path(__file__).resolve().parent

app = Flask(
    __name__,
    template_folder=str(BASE_DIR / "templates"),
    static_folder=str(BASE_DIR / "static"),
)


# Local development may use Live Server on port 5500.
# In production, the frontend and API share the same domain.
CORS(
    app,
    origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    supports_credentials=True,
)


app.secret_key = os.environ.get(
    "SECRET_KEY",
    "local-development-secret",
)

ADMIN_CODE = os.environ.get("ADMIN_CODE")
DATABASE = str(BASE_DIR / "world_explorer.db")


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_database():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS favourites (
            country TEXT PRIMARY KEY,
            count INTEGER NOT NULL DEFAULT 0
        )
    """)
    connection.commit()
    connection.close()


init_database()


# ============================
# FRONTEND
# ============================

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/explorers.html")
def explorers_page():
    return send_from_directory(BASE_DIR, "explorers.html")


@app.route("/style.css")
def style_css():
    return send_from_directory(BASE_DIR, "style.css")


@app.route("/script.js")
def script_js():
    return send_from_directory(BASE_DIR, "script.js")


@app.route("/explorers.css")
def explorers_css():
    return send_from_directory(BASE_DIR, "explorers.css")


@app.route("/explorers.js")
def explorers_js():
    return send_from_directory(BASE_DIR, "explorers.js")


@app.route("/Images/<path:filename>")
def images(filename):
    return send_from_directory(BASE_DIR / "Images", filename)


# ============================
# ADMIN LOGIN PAGE
# ============================

@app.route("/admin")
def admin_login_page():
    return render_template("admin-login.html")


# ============================
# ADMIN LOGIN
# ============================

@app.route("/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json(silent=True) or {}
    code = data.get("code")

    if ADMIN_CODE is not None and code == ADMIN_CODE:
        session["admin_logged_in"] = True
        return "Login successful!"

    return "Incorrect admin code!", 401


# ============================
# ADMIN DASHBOARD
# ============================

@app.route("/admin/dashboard")
def admin_dashboard():
    if not session.get("admin_logged_in"):
        return "Access denied!", 401

    return render_template("admin.html")


# ============================
# LOGOUT
# ============================

@app.route("/admin/logout")
def admin_logout():
    session.pop("admin_logged_in", None)
    return "Logged out."


# ============================
# ADD FAVOURITE
# ============================

@app.route("/api/favourites", methods=["POST"])
def add_favourite():
    data = request.get_json(silent=True) or {}
    country = data.get("country")

    if not country:
        return jsonify({"error": "Country is required"}), 400

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO favourites (country, count)
        VALUES (?, 1)
        ON CONFLICT(country)
        DO UPDATE SET count = count + 1
    """, (country,))

    connection.commit()

    cursor.execute("""
        SELECT count
        FROM favourites
        WHERE country = ?
    """, (country,))

    row = cursor.fetchone()
    connection.close()

    return jsonify({
        "country": country,
        "count": row["count"],
    })


# ============================
# GET FAVOURITE COUNTS
# ============================

@app.route("/api/favourites", methods=["GET"])
def get_favourites():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT country, count
        FROM favourites
        ORDER BY count DESC
    """)

    rows = cursor.fetchall()
    connection.close()

    favourites = {}

    for row in rows:
        favourites[row["country"]] = row["count"]

    return jsonify(favourites)


if __name__ == "__main__":
    app.run(debug=True)
