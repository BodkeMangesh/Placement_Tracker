from database import get_connection


def add_job(company, role, location, salary,job_type, eligibility, deadline, link, source):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO jobs
    (company, role, location, salary, job_type,eligibility, deadline, link, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        company,
        role,
        location,
        salary,
        job_type,
        eligibility,
        deadline,
        link,
        source
    ))

    conn.commit()
    conn.close()


def get_all_jobs():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM jobs")
    jobs = cursor.fetchall()

    conn.close()

    return [dict(job) for job in jobs]


def get_job_by_id(job_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM jobs WHERE id = ?",
        (job_id,)
    )

    job = cursor.fetchone()

    conn.close()

    if job:
        return dict(job)

    return None


def update_job(job_id, company, role, eligibility, deadline, link, source):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    UPDATE jobs
    SET company = ?,
        role = ?,
        eligibility = ?,
        deadline = ?,
        link = ?,
        source = ?
    WHERE id = ?
    """, (
        company,
        role,
        eligibility,
        deadline,
        link,
        source,
        job_id
    ))

    conn.commit()
    conn.close()


def delete_job(job_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM jobs WHERE id = ?",
        (job_id,)
    )

    conn.commit()
    conn.close()

def get_job_by_company_role(company, role):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT * FROM jobs
        WHERE company = ? AND role = ?
        """,
        (company, role)
    )

    job = cursor.fetchone()

    conn.close()

    return job

def search_jobs_by_company(company):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT * FROM jobs
        WHERE company = ?
        """,
        (company,)
    )

    jobs = cursor.fetchall()

    conn.close()

    return [dict(job) for job in jobs]


def search_jobs_by_location(location):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT * FROM jobs
        WHERE location = ?
        """,
        (location,)
    )

    jobs = cursor.fetchall()

    conn.close()

    return [dict(job) for job in jobs]

def filter_jobs(company, location):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT * FROM jobs
        WHERE company = ? AND location = ?
        """,
        (company, location)
    )

    jobs = cursor.fetchall()

    conn.close()

    return [dict(job) for job in jobs]