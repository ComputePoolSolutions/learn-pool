import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StudentLayout from "../../components/StudentLayout";

function CourseDetails() {

    const { id } = useParams();

    const [course, setCourse] = useState(null);

    useEffect(() => {

        axios
            .get(`http://localhost:5000/api/courses`)
            .then((response) => {

                const foundCourse =
                    response.data.find(
                        (item) => item._id === id
                    );

                setCourse(foundCourse);

            })
            .catch((error) => {
                console.error(error);
            });

    }, [id]);

    return (
        <StudentLayout role="student">

            <div className="page-header">

                <h1 className="page-title">
                    Course Details
                </h1>

            </div>

            {!course ? (

                <div className="section-card">

                    <div className="empty-state">

                        <div className="empty-icon">
                            📚
                        </div>

                        <h3>
                            Course Not Found
                        </h3>

                    </div>

                </div>

            ) : (

                <div className="section-card">

                    <div className="section-header">
                        🎓 {course.title}
                    </div>

                    <div className="section-body">

                        <h2>
                            About this Course
                        </h2>

                        <p style={{
                            marginTop: "15px",
                            lineHeight: "1.7"
                        }}>
                            {course.description}
                        </p>

                        <br />

                        <p>
                            <strong>Duration:</strong>{" "}
                            {course.duration}
                        </p>

                        <br />

                        <p>
                            <strong>Status:</strong>{" "}
                            {course.status}
                        </p>

                        <br />

                        <h3>
                            Course Progress
                        </h3>

                        <div className="progress-container">
                            <div
                                className="progress-bar"
                                style={{ width: "0%" }}
                            />
                        </div>

                        <p style={{ marginTop: "10px" }}>
                            0% completed
                        </p>

                    </div>

                </div>

            )}

        </StudentLayout>
    );
}

export default CourseDetails;