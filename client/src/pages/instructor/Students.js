import StudentLayout from "../../components/StudentLayout";

function Students() {

    return (
        <StudentLayout role="instructor">

            <div className="page-header">

                <h1 className="page-title">
                    Students
                </h1>

                <button className="secondary-button">
                    ⟳ Refresh
                </button>

            </div>

            <div className="section-card">

                <div className="section-header">
                    👥 My Students
                </div>

                <div className="empty-state">

                    <div className="empty-icon">
                        👥
                    </div>

                    <h3>
                        No Students Found
                    </h3>

                    <p>
                        Students enrolled in your courses will appear here.
                    </p>

                </div>

            </div>

        </StudentLayout>
    );
}

export default Students;