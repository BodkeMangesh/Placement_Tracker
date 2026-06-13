from fastapi import FastAPI 
from database import create_table

from scraper import run_all_scrapers, save_jobs_to_db

from crud import (
    add_job,
    get_all_jobs,
    get_job_by_id,
    update_job,
    delete_job,
    search_jobs_by_company,
    search_jobs_by_location,
    filter_jobs
)

from models import Job

app = FastAPI()

@app.on_event("startup")
def startup():
    create_table()

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

@app.get("/jobs/filter")
def filter_job(company: str, location: str):

    return filter_jobs(company, location)

@app.post("/jobs")
def create_job(job: Job):

    add_job(
        company=job.company,
        role=job.role,
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

