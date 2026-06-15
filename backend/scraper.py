from crud import add_job, get_job_by_company_role

def save_jobs_to_db():

    jobs = run_all_scrapers()

    for job in jobs:

        existing_job = get_job_by_company_role(job["company"], job["role"])

        print("JOB:", job["company"], job["role"])
        print("FOUND:", existing_job)

        if existing_job:
            print("SKIPPED")
            continue

        print("ADDED")
        
        add_job(
                company=job["company"],
                role=job["role"],
                location=job["location"],
                salary=job["salary"],
                job_type=job["job_type"],
                eligibility="Any",
                deadline="N/A",
                link="N/A",
                source=job["source"]
        )

    return len(jobs)

def scrape_internshala():
     return [
        {
          "company": "TCS",
            "role": "Software Engineer",
            "location": "Pune",
            "salary": "600000",
            "job_type": "Full Time",
            "eligibility": "BCA/BSc",
            "deadline": "2026-12-31",
            "link": "https://tcs.com",
            "source": "Internshala"  
        }
    ]    

def scrape_naukri():
    return []

def scrape_freshersworld():
    return []

def run_all_scrapers():

    jobs = []

    jobs.extend(scrape_internshala())
    jobs.extend(scrape_naukri())
    jobs.extend(scrape_freshersworld())

    return jobs