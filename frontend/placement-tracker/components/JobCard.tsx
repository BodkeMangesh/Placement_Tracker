type JobProps = {
  job: any;
  onView: () => void;
  onSave: () => void;
  onDelete: () => void;
};

export default function JobCard({ job, onView,  onSave, onDelete, }: JobProps) {
  return (
    <div className="job-card">
      <h2 className="company-name">
        {job.company}
      </h2>

      <p className="job-role">
        {job.role}
      </p>

      <div className="job-details">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
        <span>💼 {job.job_type}</span>
      </div>

      <p>
        <strong>Eligibility:</strong> {job.eligibility}
      </p>

      <p>
        <strong>Source:</strong> {job.source}
      </p>

        <button
            className="apply-btn"
            onClick={onView}
            style={{ marginRight: "10px" }}
        >
        View Details
        </button>

        <button
            className="apply-btn"
            onClick={onSave}
            style={{ marginRight: "10px" }}
        >
            Save Job
        </button>

        <button
            className="apply-btn"
            onClick={onDelete}
          >
          Delete
        </button>
        <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
        >

        <button className="apply-btn">
          Apply Now
        </button>
        </a>
    </div>
  );
}