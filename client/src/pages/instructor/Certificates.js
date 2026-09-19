import React from "react";

function Certificates() {

    return (
        <div>

            <div className="page-header">

                <div>
                    <h1>Certificates</h1>
                    <p>Manage certificates for your students.</p>
                </div>

                <button className="primary-button">
                    + Create Certificate
                </button>

            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon blue">🎓</div>
                    <h2>0</h2>
                    <p>Certificates Issued</p>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">👨‍🎓</div>
                    <h2>0</h2>
                    <p>Students Certified</p>
                </div>

            </div>

            <div className="content-card">

                <div className="blue-section-header">
                    🎓 &nbsp; Issued Certificates
                </div>

                <div className="empty-state">

                    <div className="empty-icon">
                        🎓
                    </div>

                    <h3>No Certificates Found</h3>

                    <p>
                        Certificates issued to students will appear here.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Certificates;
