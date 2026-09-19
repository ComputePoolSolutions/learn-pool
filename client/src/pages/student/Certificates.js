import StudentLayout from "../../components/StudentLayout";

function Certificates() {

    return (
        <StudentLayout role="student">

            <div className="page-header">

                <h1 className="page-title">
                    Certificates
                </h1>

                <button className="secondary-button">
                    ⟳ Refresh
                </button>

            </div>

            <div className="section-card">

                <div className="section-header">
                    🏆 My Certificates
                </div>

                <div className="empty-state">

                    <div className="empty-icon">
                        🏆
                    </div>

                    <h3>
                        No Certificates Available
                    </h3>

                    <p>
                        Complete your courses to receive certificates.
                    </p>

                </div>

            </div>

        </StudentLayout>
    );
}

export default Certificates;