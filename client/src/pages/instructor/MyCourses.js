import React, { useEffect, useState } from "react";

function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: ""
    });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/courses"
            );

            const data = await response.json();

            if (Array.isArray(data)) {
                setCourses(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createCourse = async (e) => {
        e.preventDefault();

        try {
            const storedUser = localStorage.getItem("user");

            let instructorId =
                "6a9dbb0cbdbdca5980760325";

            if (storedUser) {
                const user = JSON.parse(storedUser);

                instructorId =
                    user._id ||
                    user.id ||
                    instructorId;
            }

            const response = await fetch(
                "http://localhost:5000/api/courses",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        instructorId: instructorId,
                        duration: formData.duration
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Course creation failed");
                return;
            }

            alert("Course created successfully!");

            setFormData({
                title: "",
                description: "",
                duration: ""
            });

            setShowForm(false);
            loadCourses();

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };

    return (
        <div>

            <div className="page-header">
                <div>
                    <h1>My Courses</h1>
                    <p>Manage the courses you teach.</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    + New Course
                </button>
            </div>

            {showForm && (
                <div className="content-card">

                    <div className="section-title">
                        <span>➕</span>
                        <h2>Create New Course</h2>
                    </div>

                    <form onSubmit={createCourse}>

                        <label>Course Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter course title"
                            required
                        />

                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter course description"
                            required
                        />

                        <label>Duration</label>

                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Example: 3 Months"
                        />

                        <div className="form-buttons">

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Create Course
                            </button>

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

            <div className="content-card">

                <div className="section-title">
                    <span>📚</span>
                    <h2>All My Courses</h2>
                </div>

                {courses.length === 0 ? (

                    <div className="empty-state">
                        <div className="empty-icon">📚</div>

                        <h3>No Courses Found</h3>

                        <p>
                            You have not created any courses yet.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() => setShowForm(true)}
                        >
                            + Create Your First Course
                        </button>
                    </div>

                ) : (

                    <div className="course-grid">

                        {courses.map((course) => (

                            <div
                                className="course-card"
                                key={course._id}
                            >

                                <div className="course-icon">
                                    📘
                                </div>

                                <h3>{course.title}</h3>

                                <p>{course.description}</p>

                                <div className="course-info">

                                    <span>
                                        ⏱ {course.duration || "N/A"}
                                    </span>

                                    <span className="active-badge">
                                        Active
                                    </span>

                                </div>

                                <button className="outline-button">
                                    View Course
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyCourses;