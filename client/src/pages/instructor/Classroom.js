import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentLayout from "../../components/StudentLayout";

function Classroom() {
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchClasses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                "http://localhost:5000/api/classes"
            );

            setClasses(response.data);
        } catch (error) {
            console.error("Error fetching classes:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load classes"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <StudentLayout role="instructor">

            <div className="page-header">

                <div>
                    <h1 className="page-title">
                        Classroom
                    </h1>

                    <p style={{ marginTop: "5px", color: "#6b7280" }}>
                        Manage your scheduled classes
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/instructor/classes/create")
                    }
                >
                    + Create Class
                </button>

            </div>

            {error && (
                <div
                    style={{
                        background: "#ffe5e8",
                        color: "#b52439",
                        padding: "15px 18px",
                        borderRadius: "10px",
                        marginBottom: "20px"
                    }}
                >
                    {error}
                </div>
            )}

            {loading ? (

                <div className="section-card">
                    <div className="empty-state">
                        <h3>Loading classes...</h3>
                        <p>
                            Please wait while we fetch your classes.
                        </p>
                    </div>
                </div>

            ) : classes.length === 0 ? (

                <div className="section-card">

                    <div className="empty-state">

                        <div className="empty-icon">
                            👥
                        </div>

                        <h3>
                            No Classes Scheduled
                        </h3>

                        <p>
                            You haven't created any classes yet.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() =>
                                navigate(
                                    "/instructor/classes/create"
                                )
                            }
                        >
                            + Create Your First Class
                        </button>

                    </div>

                </div>

            ) : (

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px"
                    }}
                >

                    {classes.map((classItem) => (

                        <div
                            key={classItem._id}
                            className="section-card"
                            style={{
                                padding: "22px"
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "15px"
                                }}
                            >

                                <h3
                                    style={{
                                        margin: 0,
                                        color: "#273246"
                                    }}
                                >
                                    {classItem.title}
                                </h3>

                                <span
                                    style={{
                                        background:
                                            classItem.status === "scheduled"
                                                ? "#e8f0ff"
                                                : "#def7e9",
                                        color:
                                            classItem.status === "scheduled"
                                                ? "#315dcc"
                                                : "#177b49",
                                        padding: "5px 10px",
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        fontWeight: "600"
                                    }}
                                >
                                    {classItem.status}
                                </span>

                            </div>

                            <p
                                style={{
                                    color: "#6b7280",
                                    lineHeight: "1.5"
                                }}
                            >
                                {classItem.description ||
                                    "No description available."}
                            </p>

                            <div
                                style={{
                                    marginTop: "15px",
                                    color: "#4b5563",
                                    fontSize: "14px",
                                    lineHeight: "1.8"
                                }}
                            >

                                <div>
                                    📚 <strong>Course:</strong>{" "}
                                    {classItem.courseId?.title ||
                                        "Unknown Course"}
                                </div>

                                <div>
                                    📅 <strong>Date:</strong>{" "}
                                    {formatDate(classItem.startTime)}
                                </div>

                                <div>
                                    🕐 <strong>Time:</strong>{" "}
                                    {formatTime(classItem.startTime)}
                                    {" - "}
                                    {formatTime(classItem.endTime)}
                                </div>

                                <div>
                                    👥 <strong>Participants:</strong>{" "}
                                    {classItem.currentParticipants || 0}
                                    {" / "}
                                    {classItem.maxParticipants || 50}
                                </div>

                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "20px"
                                }}
                            >

                                <button
                                    className="primary-button"
                                    onClick={() =>
                                        navigate(
                                            `/instructor/classes/${classItem._id}/edit`
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                {classItem.meetingLink && (
                                    <button
                                        className="primary-button"
                                        onClick={() =>
                                            window.open(
                                                classItem.meetingLink,
                                                "_blank"
                                            )
                                        }
                                    >
                                        Join
                                    </button>
                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </StudentLayout>
    );
}

export default Classroom;