import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PortalLayout from "../../components/PortalLayout";

function ClassDetails() {

    const { classId } = useParams();

    const navigate = useNavigate();

    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchClass = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:5000/api/classes/${classId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load class"
                    );
                }

                setClassData(data);

            } catch (error) {

                console.error("Class details error:", error);

                setError(
                    error.message || "Failed to load class"
                );

            } finally {

                setLoading(false);

            }
        };

        if (classId) {
            fetchClass();
        }

    }, [classId]);


    const formatDate = (date) => {

        if (!date) return "Not available";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };


    const formatTime = (date) => {

        if (!date) return "Not available";

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };


    const getStatus = () => {

        if (!classData) {
            return "";
        }

        if (classData.status === "cancelled") {
            return "CANCELLED";
        }

        const now = new Date();

        const start = new Date(
            classData.startTime
        );

        const end = new Date(
            classData.endTime
        );

        if (now < start) {
            return "UPCOMING";
        }

        if (
            now >= start &&
            now < end
        ) {
            return "LIVE";
        }

        return "COMPLETED";
    };


    const handleJoinClass = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/classes/${classId}/join`,
                {
                    method: "POST",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(
                    data.message ||
                    "Unable to join class"
                );

                return;
            }

            if (data.meetingLink) {

                window.open(
                    data.meetingLink,
                    "_blank",
                    "noopener,noreferrer"
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "Unable to join the class"
            );

        }
    };


    if (loading) {

        return (

            <PortalLayout role="student">

                <div className="empty-card">

                    <div className="empty-icon">
                        ⏳
                    </div>

                    <h2>
                        Loading Class
                    </h2>

                    <p>
                        Please wait...
                    </p>

                </div>

            </PortalLayout>

        );
    }


    if (error) {

        return (

            <PortalLayout role="student">

                <div className="empty-card">

                    <div className="empty-icon">
                        ⚠
                    </div>

                    <h2>
                        Unable to Load Class
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        className="primary-button"
                        onClick={() =>
                            navigate("/classes")
                        }
                    >
                        Back to Classroom
                    </button>

                </div>

            </PortalLayout>

        );
    }


    if (!classData) {

        return (

            <PortalLayout role="student">

                <div className="empty-card">

                    <h2>
                        Class Not Found
                    </h2>

                    <button
                        className="primary-button"
                        onClick={() =>
                            navigate("/classes")
                        }
                    >
                        Back to Classroom
                    </button>

                </div>

            </PortalLayout>

        );
    }


    const status = getStatus();


    return (

        <PortalLayout role="student">

            <div className="page-header">

                <div>

                    <button
                        className="outline-button"
                        onClick={() =>
                            navigate("/classes")
                        }
                    >
                        ← Back
                    </button>

                    <h1 style={{ marginTop: "15px" }}>
                        {classData.title}
                    </h1>

                    <p>
                        Class details and learning session information
                    </p>

                </div>

            </div>


            <div className="class-details-card">

                <div className="class-details-top">

                    <div>

                        <span
                            className={`class-status-badge ${status.toLowerCase()}`}
                        >
                            {status === "LIVE" && "🔴 "}
                            {status}
                        </span>

                        <h2>
                            {classData.title}
                        </h2>

                    </div>


                    {status === "LIVE" && (

                        <button
                            className="primary-button"
                            onClick={handleJoinClass}
                        >
                            🎥 Join Class
                        </button>

                    )}


                    {status === "COMPLETED" &&
                        classData.recordingUrl && (

                            <button
                                className="primary-button"
                                onClick={() =>
                                    window.open(
                                        classData.recordingUrl,
                                        "_blank"
                                    )
                                }
                            >
                                ▶ Watch Recording
                            </button>

                        )}

                </div>


                <div className="class-details-grid">

                    <div className="class-detail-item">

                        <span>
                            Course
                        </span>

                        <strong>
                            {
                                classData.courseId?.title ||
                                classData.course?.title ||
                                "Course"
                            }
                        </strong>

                    </div>


                    <div className="class-detail-item">

                        <span>
                            Instructor
                        </span>

                        <strong>
                            {
                                classData.instructorId?.name ||
                                classData.instructor?.name ||
                                "Instructor"
                            }
                        </strong>

                    </div>


                    <div className="class-detail-item">

                        <span>
                            Date
                        </span>

                        <strong>
                            {formatDate(
                                classData.startTime
                            )}
                        </strong>

                    </div>


                    <div className="class-detail-item">

                        <span>
                            Start Time
                        </span>

                        <strong>
                            {formatTime(
                                classData.startTime
                            )}
                        </strong>

                    </div>


                    <div className="class-detail-item">

                        <span>
                            End Time
                        </span>

                        <strong>
                            {formatTime(
                                classData.endTime
                            )}
                        </strong>

                    </div>


                    <div className="class-detail-item">

                        <span>
                            Duration
                        </span>

                        <strong>
                            {
                                classData.durationMinutes
                                    ? `${classData.durationMinutes} minutes`
                                    : "Not specified"
                            }
                        </strong>

                    </div>

                </div>


                <div className="class-description">

                    <h3>
                        Description
                    </h3>

                    <p>
                        {
                            classData.description ||
                            "No description available."
                        }
                    </p>

                </div>


                {status === "COMPLETED" &&
                    !classData.recordingUrl && (

                        <div className="recording-unavailable">

                            <strong>
                                Recording unavailable
                            </strong>

                            <p>
                                A recording has not been uploaded
                                for this class yet.
                            </p>

                        </div>

                    )}


                {status === "CANCELLED" && (

                    <div className="recording-unavailable">

                        <strong>
                            This class has been cancelled.
                        </strong>

                        <p>
                            You cannot join a cancelled class.
                        </p>

                    </div>

                )}

            </div>

        </PortalLayout>

    );
}

export default ClassDetails;