import React from "react";
import PortalLayout from "../../components/PortalLayout";

function InstructorClassroom() {

    return (
        <PortalLayout role="instructor">

            <div className="page-header">

                <h1>
                    Virtual Classroom
                </h1>

                <div>

                    <button className="secondary-button">
                        ☷ My To-Do List
                    </button>

                    <button
                        className="secondary-button"
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        + Add Class
                    </button>

                    <button
                        className="secondary-button"
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        ⟳ Refresh
                    </button>

                </div>

            </div>


            <h2>
                My Enrolled Courses
            </h2>


            <div className="info-box">

                ℹ️ You are not enrolled in any
                courses yet.

            </div>


            <h2>
                Live Classes
            </h2>

            <p>
                All currently active and upcoming
                live sessions
            </p>


            <div className="content-card">

                <h2>
                    🗓 Today's Schedule
                </h2>

                <hr />

                <h2>
                    🖥 No Live Classes Right Now
                </h2>

                <p>
                    There are no classes scheduled
                    for today.
                </p>

                <div
                    style={{
                        textAlign: "center",
                        padding: "60px 20px"
                    }}
                >

                    <div
                        style={{
                            fontSize: "55px"
                        }}
                    >
                        🗓
                    </div>

                    <h2>
                        No Classes Scheduled
                    </h2>

                    <p>
                        There are no classes scheduled
                        for today.
                    </p>

                </div>

            </div>

        </PortalLayout>
    );
}

export default InstructorClassroom;