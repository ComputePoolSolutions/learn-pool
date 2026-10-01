import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import ClassCard from "../../components/ClassCard";

import {
    getClasses,
    joinClass
} from "../../services/classService";

import {
    getClassStatus
} from "../../utils/classStatus";

import "../../styles/Classroom.css";


function Classroom() {

    const navigate = useNavigate();


    const [classes, setClasses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    const [search, setSearch] =
        useState("");

    const [courseFilter, setCourseFilter] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");


    const loadClasses = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getClasses();

            const classList =
                Array.isArray(data)
                    ? data
                    : data.classes || [];

            setClasses(classList);

        } catch (error) {

            console.error(
                "Classroom loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load classroom."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadClasses();

    }, []);


    const courses = useMemo(() => {

        const map =
            new Map();

        classes.forEach(
            (classItem) => {

                const course =
                    classItem.courseId ||
                    classItem.course;

                if (
                    course &&
                    course._id
                ) {
                    map.set(
                        course._id,
                        course.title
                    );
                }

            }
        );

        return Array.from(
            map.entries()
        );

    }, [classes]);


    const filteredClasses =
        useMemo(() => {

            let result =
                [...classes];


            if (search.trim()) {

                const value =
                    search
                        .toLowerCase()
                        .trim();

                result =
                    result.filter(
                        (classItem) => {

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
                                    .includes(value) ||

                                course
                                    .toLowerCase()
                                    .includes(value) ||

                                instructor
                                    .toLowerCase()
                                    .includes(value)
                            );

                        }
                    );

            }


            if (courseFilter) {

                result =
                    result.filter(
                        (classItem) => {

                            const courseId =
                                classItem.courseId?._id ||
                                classItem.courseId ||
                                classItem.course?._id;

                            return (
                                String(courseId) ===
                                String(courseFilter)
                            );

                        }
                    );

            }


            if (statusFilter !== "all") {

                result =
                    result.filter(
                        (classItem) => {

                            return (
                                getClassStatus(
                                    classItem
                                ) === statusFilter
                            );

                        }
                    );

            }


            return result;

        }, [
            classes,
            search,
            courseFilter,
            statusFilter
        ]);


    const liveClasses =
        filteredClasses.filter(
            (item) =>
                getClassStatus(item) ===
                "live"
        );


    const upcomingClasses =
        filteredClasses
            .filter(
                (item) =>
                    getClassStatus(item) ===
                    "scheduled"
            )
            .sort(
                (a, b) =>
                    new Date(a.startTime) -
                    new Date(b.startTime)
            );


    const completedClasses =
        filteredClasses
            .filter(
                (item) =>
                    getClassStatus(item) ===
                    "completed"
            )
            .sort(
                (a, b) =>
                    new Date(b.startTime) -
                    new Date(a.startTime)
            );


    const handleJoin =
        async (classItem) => {

            try {

                const response =
                    await joinClass(
                        classItem._id
                    );

                const meetingLink =
                    response.meetingLink ||
                    response.data?.meetingLink;

                if (!meetingLink) {

                    alert(
                        "Meeting link is not available."
                    );

                    return;
                }


                window.open(
                    meetingLink,
                    "_blank",
                    "noopener,noreferrer"
                );

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Unable to join class."
                );

            }

        };


    const handleDetails =
        (classItem) => {

            navigate(
                `/classes/${classItem._id}`
            );

        };


    const handleRecording =
        (classItem) => {

            navigate(
                `/classes/${classItem._id}?recording=true`
            );

        };


    const clearFilters = () => {

        setSearch("");

        setCourseFilter("");

        setStatusFilter("all");

    };


    if (loading) {

        return (
            <div className="classroom-page">

                <div className="classroom-loading">

                    <div className="classroom-spinner"></div>

                    <p>
                        Loading classroom...
                    </p>

                </div>

            </div>
        );

    }


    if (error) {

        return (
            <div className="classroom-page">

                <div className="classroom-header">

                    <div>
                        <h1>
                            Virtual Classroom
                        </h1>

                        <p>
                            Manage and attend your live learning sessions.
                        </p>
                    </div>

                </div>


                <div className="classroom-error">

                    <div className="classroom-error-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to load classes
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        className="class-primary-button"
                        onClick={loadClasses}
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );

    }


    return (

        <div className="classroom-page">

            {/* HEADER */}

            <div className="classroom-header">

                <div>

                    <h1>
                        Virtual Classroom
                    </h1>

                    <p>
                        Join live classes, view upcoming sessions,
                        and access completed class recordings.
                    </p>

                </div>


                <button
                    className="class-refresh-button"
                    onClick={loadClasses}
                >
                    ↻ Refresh
                </button>

            </div>


            {/* FILTERS */}

            <div className="classroom-filters">

                <div className="class-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search classes, courses, or instructors..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <select
                    value={courseFilter}
                    onChange={(e) =>
                        setCourseFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Courses
                    </option>

                    {courses.map(
                        ([id, title]) => (

                            <option
                                key={id}
                                value={id}
                            >
                                {title}
                            </option>

                        )
                    )}

                </select>


                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="all">
                        All Classes
                    </option>

                    <option value="live">
                        Live
                    </option>

                    <option value="scheduled">
                        Upcoming
                    </option>

                    <option value="completed">
                        Completed
                    </option>

                    <option value="cancelled">
                        Cancelled
                    </option>

                </select>


                {(search ||
                    courseFilter ||
                    statusFilter !== "all") && (

                    <button
                        className="clear-filter-button"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>

                )}

            </div>


            {/* LIVE */}

            <section className="classroom-section">

                <div className="classroom-section-title live-title">

                    <div>
                        <span className="section-icon">
                            🔴
                        </span>

                        <div>
                            <h2>
                                Live Classes
                            </h2>

                            <p>
                                Classes happening right now
                            </p>
                        </div>
                    </div>

                    <span className="section-count">
                        {liveClasses.length}
                    </span>

                </div>


                {liveClasses.length === 0 ? (

                    <div className="classroom-empty">

                        <div className="empty-class-icon">
                            📺
                        </div>

                        <h3>
                            No live classes right now.
                        </h3>

                        <p>
                            Check the upcoming classes section
                            for your next session.
                        </p>

                    </div>

                ) : (

                    <div className="class-grid">

                        {liveClasses.map(
                            (classItem) => (

                                <ClassCard
                                    key={classItem._id}
                                    classItem={classItem}
                                    onJoin={handleJoin}
                                    onDetails={handleDetails}
                                    onRecording={handleRecording}
                                />

                            )
                        )}

                    </div>

                )}

            </section>


            {/* UPCOMING */}

            <section className="classroom-section">

                <div className="classroom-section-title">

                    <div>

                        <span className="section-icon">
                            📅
                        </span>

                        <div>
                            <h2>
                                Upcoming Classes
                            </h2>

                            <p>
                                Your next scheduled learning sessions
                            </p>
                        </div>

                    </div>

                    <span className="section-count">
                        {upcomingClasses.length}
                    </span>

                </div>


                {upcomingClasses.length === 0 ? (

                    <div className="classroom-empty">

                        <div className="empty-class-icon">
                            🗓️
                        </div>

                        <h3>
                            No upcoming classes scheduled.
                        </h3>

                        <p>
                            New classes will appear here when scheduled.
                        </p>

                    </div>

                ) : (

                    <div className="class-grid">

                        {upcomingClasses.map(
                            (classItem) => (

                                <ClassCard
                                    key={classItem._id}
                                    classItem={classItem}
                                    onDetails={handleDetails}
                                />

                            )
                        )}

                    </div>

                )}

            </section>


            {/* COMPLETED */}

            <section className="classroom-section">

                <div className="classroom-section-title">

                    <div>

                        <span className="section-icon">
                            ✅
                        </span>

                        <div>
                            <h2>
                                Completed Classes
                            </h2>

                            <p>
                                Previous sessions and recordings
                            </p>
                        </div>

                    </div>

                    <span className="section-count">
                        {completedClasses.length}
                    </span>

                </div>


                {completedClasses.length === 0 ? (

                    <div className="classroom-empty">

                        <div className="empty-class-icon">
                            🎓
                        </div>

                        <h3>
                            No completed classes available.
                        </h3>

                        <p>
                            Completed sessions will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="class-grid">

                        {completedClasses.map(
                            (classItem) => (

                                <ClassCard
                                    key={classItem._id}
                                    classItem={classItem}
                                    onDetails={handleDetails}
                                    onRecording={handleRecording}
                                />

                            )
                        )}

                    </div>

                )}

            </section>


            {filteredClasses.length === 0 &&
                classes.length > 0 && (

                    <div className="classroom-no-results">

                        <div>
                            🔎
                        </div>

                        <h3>
                            No classes match your search.
                        </h3>

                        <button
                            className="class-secondary-button"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

        </div>
    );
}


export default Classroom;