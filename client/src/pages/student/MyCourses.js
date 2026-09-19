import React, { useEffect, useState } from "react";
import PortalLayout from "../../components/PortalLayout";
import axios from "axios";

function MyCourses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        axios
            .get("http://localhost:5000/api/courses")

            .then((response) => {

                setCourses(response.data);

                setLoading(false);

            })

            .catch((error) => {

                console.error(error);

                setError(
                    "Failed to load courses"
                );

                setLoading(false);

            });

    }, []);


    return (
        <PortalLayout role="student">

            <div className="page-header">

                <h1>
                    My Courses
                </h1>

                <button className="secondary-button">
                    ⟳ Refresh
                </button>

            </div>


            <h2>
                My Enrolled Courses
            </h2>


            {loading && (
                <div className="content-card">
                    Loading courses...
                </div>
            )}


            {error && (
                <div className="info-box">
                    {error}
                </div>
            )}


            {!loading &&
                !error &&
                courses.length === 0 && (

                    <div className="info-box">

                        ℹ️ You are not enrolled
                        in any courses yet.

                    </div>

                )}


            {!loading &&
                courses.map((course) => (

                    <div
                        className="content-card"
                        key={course._id}
                        style={{
                            marginBottom: "20px"
                        }}
                    >

                        <h2>
                            {course.title}
                        </h2>

                        <p>
                            {course.description}
                        </p>

                        <p>
                            <b>Duration:</b>{" "}
                            {course.duration}
                        </p>

                        <p>
                            <b>Status:</b>{" "}
                            {course.status}
                        </p>

                        <button
                            className="primary-button"
                        >
                            View Course
                        </button>

                    </div>

                ))}

        </PortalLayout>
    );
}

export default MyCourses;