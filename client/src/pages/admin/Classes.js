import React, {
    useEffect,
    useState
} from "react";

import PortalLayout from "../../components/PortalLayout";


function AdminClasses() {

    const [classes, setClasses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");


    const fetchClasses = async () => {

        try {

            setLoading(true);

            setError("");

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                "http://localhost:5000/api/classes",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load classes"
                );

            }


            setClasses(
                Array.isArray(data)
                    ? data
                    : data.classes || []
            );


        } catch (error) {

            console.error(
                "Admin classes error:",
                error
            );

            setError(
                error.message ||
                "Failed to load classes"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchClasses();

    }, []);


    const getStatus = (classItem) => {

        if (
            classItem.status ===
            "cancelled"
        ) {
            return "CANCELLED";
        }


        const now =
            new Date();

        const start =
            new Date(
                classItem.startTime
            );

        const end =
            new Date(
                classItem.endTime
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


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date)
            .toLocaleDateString(
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
            return "-";
        }

        return new Date(date)
            .toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    };


    const filteredClasses =
        classes.filter(
            (classItem) => {

                const value =
                    search
                        .toLowerCase()
                        .trim();


                if (!value) {
                    return true;
                }


                const title =
                    classItem.title ||
                    "";


                const course =
                    classItem.courseId?.title ||
                    classItem.course?.title ||
                    "";


                const instructor =
                    classItem.instructorId?.name ||
                    classItem.instructor?.name ||
                    "";


                return (

                    title
                        .toLowerCase()
                        .includes(value)

                    ||

                    course
                        .toLowerCase()
                        .includes(value)

                    ||

                    instructor
                        .toLowerCase()
                        .includes(value)

                );

            }
        );


    return (

        <PortalLayout role="admin">

            <div className="page-header">

                <div>

                    <h1>
                        Classes
                    </h1>

                    <p>
                        Manage all LearnPool classroom sessions
                    </p>

                </div>


                <div className="page-actions">

                    <button
                        className="outline-button"
                        onClick={fetchClasses}
                    >
                        ↻ Refresh
                    </button>

                </div>

            </div>


            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "14px",
                    marginBottom: "20px",
                    boxShadow:
                        "0 5px 20px rgba(30,45,90,0.06)"
                }}
            >

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                    placeholder="Search classes, courses or instructors..."
                    style={{
                        width: "100%",
                        height: "48px",
                        padding: "0 15px",
                        border:
                            "1px solid #dce2ec",
                        borderRadius: "9px",
                        outline: "none",
                        fontSize: "14px"
                    }}
                />

            </div>


            {loading && (

                <div className="empty-card">

                    <div className="empty-icon">
                        ⏳
                    </div>

                    <h2>
                        Loading Classes
                    </h2>

                    <p>
                        Please wait...
                    </p>

                </div>

            )}


            {!loading && error && (

                <div className="empty-card">

                    <div className="empty-icon">
                        ⚠
                    </div>

                    <h2>
                        Unable to Load Classes
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        className="primary-button"
                        onClick={fetchClasses}
                    >
                        Try Again
                    </button>

                </div>

            )}


            {!loading &&
                !error &&
                filteredClasses.length === 0 && (

                    <div className="empty-card">

                        <div className="empty-icon">
                            🎓
                        </div>

                        <h2>
                            No Classes Found
                        </h2>

                        <p>
                            There are no classroom sessions matching your search.
                        </p>

                    </div>

                )}


            {!loading &&
                !error &&
                filteredClasses.length > 0 && (

                    <div
                        style={{
                            display: "grid",
                            gap: "18px"
                        }}
                    >

                        {filteredClasses.map(
                            (classItem) => {

                                const status =
                                    getStatus(
                                        classItem
                                    );


                                return (

                                    <div
                                        key={
                                            classItem._id
                                        }
                                        style={{
                                            background:
                                                "white",
                                            borderRadius:
                                                "14px",
                                            padding:
                                                "22px",
                                            boxShadow:
                                                "0 5px 20px rgba(30,45,90,0.06)"
                                        }}
                                    >

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "space-between",
                                                gap:
                                                    "20px",
                                                flexWrap:
                                                    "wrap"
                                            }}
                                        >

                                            <div>

                                                <span
                                                    className={`class-status-badge ${status.toLowerCase()}`}
                                                >
                                                    {status ===
                                                        "LIVE" &&
                                                        "🔴 "}
                                                    {status}
                                                </span>


                                                <h2
                                                    style={{
                                                        marginTop:
                                                            "10px"
                                                    }}
                                                >
                                                    {
                                                        classItem.title
                                                    }
                                                </h2>


                                                <p
                                                    style={{
                                                        marginTop:
                                                            "6px",
                                                        color:
                                                            "#667085"
                                                    }}
                                                >
                                                    Course:{" "}

                                                    <strong>
                                                        {
                                                            classItem.courseId?.title ||
                                                            classItem.course?.title ||
                                                            "Unknown Course"
                                                        }
                                                    </strong>
                                                </p>


                                                <p
                                                    style={{
                                                        marginTop:
                                                            "5px",
                                                        color:
                                                            "#667085"
                                                    }}
                                                >
                                                    Instructor:{" "}

                                                    <strong>
                                                        {
                                                            classItem.instructorId?.name ||
                                                            classItem.instructor?.name ||
                                                            "Unknown Instructor"
                                                        }
                                                    </strong>
                                                </p>

                                            </div>


                                            <div
                                                style={{
                                                    textAlign:
                                                        "right"
                                                }}
                                            >

                                                <strong>
                                                    {
                                                        formatDate(
                                                            classItem.startTime
                                                        )
                                                    }
                                                </strong>

                                                <p>
                                                    {
                                                        formatTime(
                                                            classItem.startTime
                                                        )
                                                    }

                                                    {" - "}

                                                    {
                                                        formatTime(
                                                            classItem.endTime
                                                        )
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

        </PortalLayout>

    );
}


export default AdminClasses;