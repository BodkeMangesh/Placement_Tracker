import sqlite3

DB_NAME = "jobs.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def create_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company TEXT,
        role TEXT,
        location TEXT,
        salary TEXT,
        job_type TEXT,
        eligibility TEXT,
        deadline TEXT,
        link TEXT,
        source TEXT
    )
    """)

    conn.commit()
    conn.close()

