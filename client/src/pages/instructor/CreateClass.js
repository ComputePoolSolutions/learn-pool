import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import axios from "axios";

import {
    createClass
} from "../../services/classService";

import "../../styles/Classroom.css";


function CreateClass() {

    const navigate = useNavigate();


    const [courses, setCourses] =
        useState([]);

    const [loadingCourses, setLoadingCourses] =
        useState(true);


    const [formData, setFormData] =
        useState({
            title: "",
            courseId: "",
            date: "",
            startTime: "",
            endTime: "",
            meetingLink: "",
            description: "",
            maxParticipants: ""
        });


    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [saving, setSaving] =
        useState(false);


    useEffect(() => {

        const loadCourses =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await axios.get(
                            "http://localhost:5000/api/courses",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    const data =
                        Array.isArray(
                            response.data
                        )
                            ? response.data
                            : response.data.courses || [];

                    setCourses(data);

                } catch (error) {

                    console.error(
                        "Course loading error:",
                        error
                    );

                    setError(
                        "Unable to load courses."
                    );

                } finally {

                    setLoadingCourses(false);

                }

            };


        loadCourses();

    }, []);


    const handleChange =
        (e) => {

            const {
                name,
                value
            } = e.target;

            setFormData(
                (previous) => ({
                    ...previous,
                    [name]: value
                })
            );

        };


    const validateForm = () => {

        if (!formData.title.trim()) {
            return "Class title is required.";
        }

        if (!formData.courseId) {
            return "Please select a course.";
        }

        if (!formData.date) {
            return "Please select a date.";
        }

        if (!formData.startTime) {
            return "Start time is required.";
        }

        if (!formData.endTime) {
            return "End time is required.";
        }

        if (
            formData.endTime <=
            formData.startTime
        ) {
            return "End time must be after start time.";
        }

        if (!formData.meetingLink.trim()) {
            return "Meeting link is required.";
        }


        try {

            const url =
                new URL(
                    formData.meetingLink
                );

            if (
                url.protocol !== "http:" &&
                url.protocol !== "https:"
            ) {
                return "Please enter a valid meeting URL.";
            }

        } catch {

            return "Please enter a valid meeting URL.";

        }


        if (
            formData.maxParticipants &&
            Number(formData.maxParticipants) < 1
        ) {
            return "Maximum participants must be at least 1.";
        }


        return "";

    };


    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setError("");

            setSuccess("");


            const validationError =
                validateForm();

            if (validationError) {

                setError(
                    validationError
                );

                return;

            }


            try {

                setSaving(true);


                const startTime =
                    new Date(
                        `${formData.date}T${formData.startTime}`
                    );

                const endTime =
                    new Date(
                        `${formData.date}T${formData.endTime}`
                    );


                const durationMinutes =
                    Math.round(
                        (
                            endTime.getTime() -
                            startTime.getTime()
                        ) / 60000
                    );


                const payload = {

                    title:
                        formData.title.trim(),

                    courseId:
                        formData.courseId,

                    startTime:
                        startTime.toISOString(),

                    endTime:
                        endTime.toISOString(),

                    meetingLink:
                        formData.meetingLink.trim(),

                    description:
                        formData.description.trim(),

                    maxParticipants:
                        formData.maxParticipants
                            ? Number(
                                formData.maxParticipants
                            )
                            : undefined,

                    durationMinutes

                };


                await createClass(
                    payload
                );


                setSuccess(
                    "Class created successfully."
                );


                setTimeout(() => {

                    navigate(
                        "/instructor/classroom"
                    );

                }, 1000);


            } catch (error) {

                console.error(
                    "Create class error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to create class."
                );

            } finally {

                setSaving(false);

            }

        };


    return (

        <div className="classroom-page">

            <div className="classroom-header">

                <div>

                    <h1>
                        Create Class
                    </h1>

                    <p>
                        Schedule a new live learning session.
                    </p>

                </div>


                <button
                    className="class-secondary-button"
                    onClick={() =>
                        navigate(
                            "/instructor/classroom"
                        )
                    }
                >
                    ← Back to Classroom
                </button>

            </div>


            <div className="class-form-card">

                {error && (

                    <div className="class-form-error">
                        {error}
                    </div>

                )}


                {success && (

                    <div className="class-form-success">
                        {success}
                    </div>

                )}


                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <div className="class-form-grid">

                        <div className="class-form-group">

                            <label>
                                Class Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="React Hooks - useEffect"
                            />

                        </div>


                        <div className="class-form-group">

                            <label>
                                Course *
                            </label>

                            <select
                                name="courseId"
                                value={
                                    formData.courseId
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    loadingCourses
                                }
                            >

                                <option value="">
                                    {loadingCourses
                                        ? "Loading courses..."
                                        : "Select Course"}
                                </option>

                                {courses.map(
                                    (course) => (

                                        <option
                                            key={
                                                course._id
                                            }
                                            value={
                                                course._id
                                            }
                                        >
                                            {
                                                course.title
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        <div className="class-form-group">

                            <label>
                                Date *
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={
                                    formData.date
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div className="class-form-group">

                            <label>
                                Start Time *
                            </label>

                            <input
                                type="time"
                                name="startTime"
                                value={
                                    formData.startTime
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div className="class-form-group">

                            <label>
                                End Time *
                            </label>

                            <input
                                type="time"
                                name="endTime"
                                value={
                                    formData.endTime
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div className="class-form-group">

                            <label>
                                Maximum Participants
                            </label>

                            <input
                                type="number"
                                name="maxParticipants"
                                min="1"
                                value={
                                    formData.maxParticipants
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="50"
                            />

                        </div>

                    </div>


                    <div className="class-form-group">

                        <label>
                            Meeting Link *
                        </label>

                        <input
                            type="url"
                            name="meetingLink"
                            value={
                                formData.meetingLink
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="https://meet.google.com/..."
                        />

                    </div>


                    <div className="class-form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="5"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Explain what students will learn in this class."
                        />

                    </div>


                    <div className="class-form-actions">

                        <button
                            type="button"
                            className="class-secondary-button"
                            onClick={() =>
                                navigate(
                                    "/instructor/classroom"
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="class-primary-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Creating..."
                                : "Create Class"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}


export default CreateClass;