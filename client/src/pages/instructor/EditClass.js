import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import PortalLayout from "../../components/PortalLayout";


function EditClass() {

    const { classId } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        title: "",
        description: "",
        startTime: "",
        endTime: "",
        meetingLink: "",
        maxParticipants: ""

    });

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    useEffect(() => {

        const loadClass = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:5000/api/classes/${classId}`,
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
                        "Unable to load class"
                    );

                }

                const start =
                    data.startTime
                        ? new Date(data.startTime)
                        : null;

                const end =
                    data.endTime
                        ? new Date(data.endTime)
                        : null;


                setFormData({

                    title:
                        data.title || "",

                    description:
                        data.description || "",

                    startTime:
                        start
                            ? start
                                .toISOString()
                                .slice(0, 16)
                            : "",

                    endTime:
                        end
                            ? end
                                .toISOString()
                                .slice(0, 16)
                            : "",

                    meetingLink:
                        data.meetingLink || "",

                    maxParticipants:
                        data.maxParticipants || ""

                });

            } catch (error) {

                console.error(error);

                setError(
                    error.message ||
                    "Unable to load class"
                );

            } finally {

                setLoading(false);

            }

        };


        if (classId) {
            loadClass();
        }

    }, [classId]);


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData(
            previous => ({
                ...previous,
                [name]: value
            })
        );

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setSuccess("");


        if (!formData.title.trim()) {

            setError(
                "Class title is required."
            );

            return;
        }


        if (!formData.startTime) {

            setError(
                "Start time is required."
            );

            return;
        }


        if (!formData.endTime) {

            setError(
                "End time is required."
            );

            return;
        }


        const start =
            new Date(formData.startTime);

        const end =
            new Date(formData.endTime);


        if (end <= start) {

            setError(
                "End time must be after start time."
            );

            return;
        }


        if (
            formData.meetingLink &&
            !formData.meetingLink.startsWith("http")
        ) {

            setError(
                "Please enter a valid meeting URL."
            );

            return;
        }


        if (
            formData.maxParticipants &&
            Number(formData.maxParticipants) <= 0
        ) {

            setError(
                "Maximum participants must be greater than 0."
            );

            return;
        }


        try {

            setSaving(true);

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                `http://localhost:5000/api/classes/${classId}`,
                {
                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        title:
                            formData.title,

                        description:
                            formData.description,

                        startTime:
                            start.toISOString(),

                        endTime:
                            end.toISOString(),

                        meetingLink:
                            formData.meetingLink,

                        maxParticipants:
                            formData.maxParticipants
                                ? Number(
                                    formData.maxParticipants
                                )
                                : undefined

                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to update class"
                );

            }


            setSuccess(
                "Class updated successfully."
            );


            setTimeout(() => {

                navigate(
                    "/instructor/classes"
                );

            }, 1000);


        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to update class"
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (

            <PortalLayout role="instructor">

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


    return (

        <PortalLayout role="instructor">

            <div className="page-header">

                <div>

                    <h1>
                        Edit Class
                    </h1>

                    <p>
                        Update your classroom session
                    </p>

                </div>

            </div>


            <form
                className="class-form-card"
                onSubmit={handleSubmit}
            >


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


                <div className="class-form-grid">


                    <div className="class-form-group">

                        <label>
                            Class Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter class title"
                        />

                    </div>


                    <div className="class-form-group">

                        <label>
                            Maximum Participants
                        </label>

                        <input
                            type="number"
                            name="maxParticipants"
                            value={
                                formData.maxParticipants
                            }
                            onChange={handleChange}
                            min="1"
                            placeholder="50"
                        />

                    </div>


                    <div className="class-form-group">

                        <label>
                            Start Time
                        </label>

                        <input
                            type="datetime-local"
                            name="startTime"
                            value={
                                formData.startTime
                            }
                            onChange={handleChange}
                        />

                    </div>


                    <div className="class-form-group">

                        <label>
                            End Time
                        </label>

                        <input
                            type="datetime-local"
                            name="endTime"
                            value={
                                formData.endTime
                            }
                            onChange={handleChange}
                        />

                    </div>


                    <div
                        className="class-form-group"
                        style={{
                            gridColumn:
                                "1 / -1"
                        }}
                    >

                        <label>
                            Meeting Link
                        </label>

                        <input
                            type="url"
                            name="meetingLink"
                            value={
                                formData.meetingLink
                            }
                            onChange={handleChange}
                            placeholder="https://meet.google.com/..."
                        />

                    </div>

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
                        onChange={handleChange}
                        placeholder="Enter class description"
                    />

                </div>


                <div className="class-form-actions">

                    <button
                        type="button"
                        className="outline-button"
                        onClick={() =>
                            navigate(
                                "/instructor/classes"
                            )
                        }
                        disabled={saving}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="primary-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>


            </form>

        </PortalLayout>

    );
}


export default EditClass;