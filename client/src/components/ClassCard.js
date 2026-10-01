import React from "react";

import {
    getClassStatus,
    getStatusLabel,
    getStatusClass
} from "../utils/classStatus";


const formatDate = (date) => {
    if (!date) {
        return "Date not available";
    }

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
    if (!date) {
        return "--";
    }

    return new Date(date).toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
};


const calculateDuration = (
    startTime,
    endTime
) => {
    if (!startTime || !endTime) {
        return "N/A";
    }

    const start =
        new Date(startTime).getTime();

    const end =
        new Date(endTime).getTime();

    const minutes =
        Math.round(
            (end - start) / 60000
        );

    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours =
        Math.floor(minutes / 60);

    const remaining =
        minutes % 60;

    if (remaining === 0) {
        return `${hours} hr`;
    }

    return `${hours} hr ${remaining} min`;
};


function ClassCard({
    classItem,
    onJoin,
    onDetails,
    onEdit,
    onCancel,
    onRecording,
    instructor = false
}) {

    const status =
        getClassStatus(classItem);

    const statusLabel =
        getStatusLabel(status);

    const statusClass =
        getStatusClass(status);


    return (
        <div className="class-card">

            <div className="class-card-top">

                <div>
                    <h3>
                        {classItem.title}
                    </h3>

                    <p className="class-course">
                        {classItem.courseId?.title ||
                            classItem.course?.title ||
                            "Course"}
                    </p>
                </div>


                <span
                    className={`class-status ${statusClass}`}
                >
                    {status === "live" && "🔴 "}
                    {statusLabel}
                </span>

            </div>


            <div className="class-info-grid">

                <div className="class-info-item">
                    <span>👨‍🏫</span>

                    <div>
                        <small>
                            Instructor
                        </small>

                        <strong>
                            {
                                classItem.instructorId?.name ||
                                classItem.instructor?.name ||
                                "Instructor"
                            }
                        </strong>
                    </div>
                </div>


                <div className="class-info-item">
                    <span>📅</span>

                    <div>
                        <small>
                            Date
                        </small>

                        <strong>
                            {formatDate(
                                classItem.startTime
                            )}
                        </strong>
                    </div>
                </div>


                <div className="class-info-item">
                    <span>🕐</span>

                    <div>
                        <small>
                            Time
                        </small>

                        <strong>
                            {formatTime(
                                classItem.startTime
                            )}

                            {" - "}

                            {formatTime(
                                classItem.endTime
                            )}
                        </strong>
                    </div>
                </div>


                <div className="class-info-item">
                    <span>⏱️</span>

                    <div>
                        <small>
                            Duration
                        </small>

                        <strong>
                            {calculateDuration(
                                classItem.startTime,
                                classItem.endTime
                            )}
                        </strong>
                    </div>
                </div>

            </div>


            {classItem.description && (
                <p className="class-description">
                    {classItem.description}
                </p>
            )}


            <div className="class-card-actions">

                <button
                    className="class-secondary-button"
                    onClick={() =>
                        onDetails?.(classItem)
                    }
                >
                    View Details
                </button>


                {status === "live" && (
                    <button
                        className="class-primary-button"
                        onClick={() =>
                            onJoin?.(classItem)
                        }
                    >
                        🔴 Join Class
                    </button>
                )}


                {status === "completed" && (
                    <button
                        className={
                            classItem.recordingUrl
                                ? "class-primary-button"
                                : "class-disabled-button"
                        }
                        disabled={
                            !classItem.recordingUrl
                        }
                        onClick={() =>
                            onRecording?.(classItem)
                        }
                    >
                        {classItem.recordingUrl
                            ? "▶ Watch Recording"
                            : "Recording unavailable"}
                    </button>
                )}


                {instructor && (
                    <>
                        {status !== "cancelled" && (
                            <button
                                className="class-secondary-button"
                                onClick={() =>
                                    onEdit?.(classItem)
                                }
                            >
                                Edit
                            </button>
                        )}

                        {status !== "cancelled" && (
                            <button
                                className="class-danger-button"
                                onClick={() =>
                                    onCancel?.(classItem)
                                }
                            >
                                Cancel
                            </button>
                        )}

                        {status === "completed" && (
                            <button
                                className="class-secondary-button"
                                onClick={() =>
                                    onRecording?.(classItem)
                                }
                            >
                                Recording
                            </button>
                        )}
                    </>
                )}

            </div>

        </div>
    );
}

export default ClassCard;