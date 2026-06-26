import bcrypt

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_table, create_users_table, get_all_users, add_user, get_user_by_email

from scraper import run_all_scrapers, save_jobs_to_db

from crud import (
    add_job,
    get_all_jobs,
    get_job_by_id,
    get_job_by_company_role,
    get_jobs_by_location,
    update_job,
    delete_job,
    remove_duplicate_jobs,
    search_jobs_by_company,
    search_jobs_by_location,
    search_jobs_by_salary,
    search_jobs_by_salary_range,
    search_jobs_by_type,
    get_latest_jobs,
    filter_jobs
)

from models import UserRegister, UserLogin

from models import Job

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    create_table()
    create_users_table()

@app.get("/")
def home():
    return {
        "message": "Placement Tracker API Running"
    }

@app.get("/jobs")
def get_jobs():
    return get_all_jobs()


@app.get("/jobs/search")
def search_jobs(company: str):

    return search_jobs_by_company(company)


@app.get("/jobs/location")
def search_location(location: str):

    return search_jobs_by_location(location)

@app.get("/jobs/location/{location}")
def jobs_by_location(location: str):

    return get_jobs_by_location(location)

@app.get("/jobs/filter")
def filter_job(company: str, location: str):

    return filter_jobs(company, location)

@app.get("/jobs/salary")
def get_jobs_by_salary(min_salary: int):

    return search_jobs_by_salary(min_salary)

@app.get("/jobs/type")
def get_jobs_by_type(job_type: str):

    return search_jobs_by_type(job_type)

@app.get("/jobs/salary-range")
def get_jobs_salary_range(
    min_salary: int,
    max_salary: int
):
    return search_jobs_by_salary_range(
        min_salary,
        max_salary
    )

@app.get("/jobs/latest")
def latest_jobs():

    return get_latest_jobs()

@app.post("/jobs")
def create_job(job: Job):

    existing_job = get_job_by_company_role(
        job.company,
        job.role
    )

    if existing_job:
        return {"message": "Job already exists"}

    add_job(
        company=job.company,
        role=job.role,
        location=job.location,
        salary=job.salary,
        job_type=job.job_type,
        eligibility=job.eligibility,
        deadline=job.deadline,
        link=job.link,
        source=job.source
    )

    return {"message": "Job Added Successfully"}

@app.get("/jobs/{job_id}")
def get_job(job_id: int):

    job = get_job_by_id(job_id)

    if job:
        return job

    return {"error": "Job not found"}

@app.delete("/jobs/remove-duplicates")
def delete_duplicates():

    remove_duplicate_jobs()

    return {"message": "Duplicate jobs removed"}

@app.delete("/jobs/{job_id}")
def remove_job(job_id: int):

    delete_job(job_id)

    return {
        "message": f"Job {job_id} deleted successfully"
    }

@app.put("/jobs/{job_id}")
def edit_job(job_id: int, job: Job):

    update_job(
        job_id,
        job.company,
        job.role,
        job.eligibility,
        job.deadline,
        job.link,
        job.source
    )

    return {
        "message": "Job Updated Successfully"
    }

@app.get("/scan-jobs")
def scan_jobs():

    jobs = run_all_scrapers()

    return {
        "total_jobs": len(jobs),
        "jobs": jobs
    }

@app.get("/save-jobs")
def save_jobs():

    total = save_jobs_to_db()

    return {
        "message": "Jobs Saved",
        "total": total
    }

@app.get("/users")
def get_users():
    return get_all_users()

@app.post("/register")
def register(user: UserRegister):

    existing_user = get_user_by_email(user.email)

    if existing_user:
        return {
            "message": "Email already registered"
        }

    add_user(
        user.name,
        user.email,
        user.password
    )

    return {
        "message": "User registered successfully"
    }

@app.post("/login")
def login(user: UserLogin):

    db_user = get_user_by_email(user.email)

    if not db_user:
        return {
            "message": "User not found"
        }

    password_match = bcrypt.checkpw(
        user.password.encode("utf-8"),
        db_user["password"].encode("utf-8")
    )

    if not password_match:
        return {
            "message": "Invalid password"
        }

    return {
    "message": "Login successful",
    "user": {
        "id": db_user["id"],
        "name": db_user["name"],
        "email": db_user["email"],
        "role": db_user["role"]
    }
}