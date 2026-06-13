from pydantic import BaseModel

class Job(BaseModel):
    company: str
    role: str
    location: str
    salary: str
    job_type: str
    eligibility: str
    deadline: str
    link: str
    source: str