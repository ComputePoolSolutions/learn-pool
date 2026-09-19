import StudentLayout from "../../components/StudentLayout";

function Classroom() {

    return (
        <StudentLayout role="instructor">

            <div className="page-header">

                <h1 className="page-title">
                    Classroom
                </h1>

                <button className="primary-button">
                    + Create Class
                </button>

            </div>

            <div
                style={{
                    background: "#d7f2e4",
                    padding: "18px 22px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    color: "#075b3c",
                    fontSize: "17px"
                }}
            >
                ✔ Login successful!
            </div>

            <div className="section-card">

                <div className="empty-state">

                    <div className="empty-icon">
                        👥
                    </div>

                    <h3>
                        No Classes Scheduled
                    </h3>

                    <p>
                        Check back later for upcoming classes.
                    </p>

                    <button className="primary-button">
                        + Create Your First Class
                    </button>

                </div>

            </div>

        </StudentLayout>
    );
}

export default Classroom;