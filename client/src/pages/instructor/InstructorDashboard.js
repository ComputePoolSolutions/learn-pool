import React from "react";
import PortalLayout from "../../components/PortalLayout";

function InstructorDashboard() {
    return (
        <PortalLayout role="instructor">

            <div className="page-header">

                <h1>
                    Dashboard
                </h1>

                <button className="secondary-button">
                    ⟳ Refresh
                </button>

            </div>


            <h2>
                Welcome to LearnPool
            </h2>

            <p>
                Welcome back! Here's an overview of
                your teaching activities.
            </p>


            <div className="info-box">

                ℹ️ No classes or assignments have
                been created yet.

            </div>


            <div className="content-card">

                <h2>
                    Instructor Overview
                </h2>

                <p>
                    Manage your courses, classes,
                    assignments and students from here.
                </p>

                <button className="primary-button">
                    + Create Class
                </button>

            </div>

        </PortalLayout>
    );
}

export default InstructorDashboard;