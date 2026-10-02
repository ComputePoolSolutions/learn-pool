import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import PortalLayout
    from "../../../components/PortalLayout";

import {
    getAssignment
} from "../assignment.service";

import {
    getMySubmission,
    submitAssignment
} from "../submission.service";


const AssignmentSubmitPage = () => {

    const {
        assignmentId
    } = useParams();


    const navigate =
        useNavigate();


    const [assignment, setAssignment] =
        useState(null);


    const [submissionText, setSubmissionText] =
        useState("");


    const [loading, setLoading] =
        useState(true);


    const [submitting, setSubmitting] =
        useState(false);


    const [error, setError] =
        useState("");


    /* =========================================================
       LOAD ASSIGNMENT + PREVIOUS SUBMISSION
    ========================================================= */

    const loadData = useCallback(async () => {

        try {

            setLoading(true);

            setError("");


            /* -------------------------------------------------
               GET ASSIGNMENT
            ------------------------------------------------- */

            const assignmentResponse =
                await getAssignment(
                    assignmentId
                );


            const data =
                assignmentResponse.assignment ||
                assignmentResponse;


            setAssignment(data);


            /* -------------------------------------------------
               GET PREVIOUS SUBMISSION
            ------------------------------------------------- */

            try {

                const submissionResponse =
                    await getMySubmission(
                        assignmentId
                    );


                const submission =
                    submissionResponse.submission;


                if (submission) {

                    setSubmissionText(
                        submission.submissionText ||
                        ""
                    );

                }

            } catch (submissionError) {

                console.log(
                    "No previous submission."
                );

            }

        } catch (error) {

            console.error(
                "Load assignment error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load assignment."
            );

        } finally {

            setLoading(false);

        }

    }, [assignmentId]);


    /* =========================================================
       LOAD DATA
    ========================================================= */

    useEffect(() => {

        loadData();

    }, [loadData]);


    /* =========================================================
       SUBMIT ASSIGNMENT
    ========================================================= */

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!submissionText.trim()) {

            setError(
                "Please enter your submission."
            );

            return;

        }


        try {

            setSubmitting(true);

            setError("");


            await submitAssignment(
                assignmentId,
                {
                    submissionText
                }
            );


            navigate(
                `/student/assignments/${assignmentId}`
            );


        } catch (error) {

            console.error(
                "Submit assignment error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to submit assignment."
            );


        } finally {

            setSubmitting(false);

        }

    };


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <PortalLayout role="student">

                <div className="assignment-page">

                    <div className="assignment-loading">

                        <div className="assignment-loading-spinner">
                            ⟳
                        </div>

                        <p>
                            Loading assignment...
                        </p>

                    </div>

                </div>

            </PortalLayout>

        );

    }


    /* =========================================================
       PAGE
    ========================================================= */

    return (

        <PortalLayout role="student">

            <div className="assignment-page">

                {/* =================================================
                   PAGE HEADER
                ================================================= */}

                <div className="assignment-page-header">

                    <div>

                        <h1>
                            Submit Assignment
                        </h1>

                        <p>
                            {assignment?.title}
                        </p>

                    </div>

                </div>


                {/* =================================================
                   ERROR
                ================================================= */}

                {error && (

                    <div className="class-form-error">

                        {error}

                    </div>

                )}


                {/* =================================================
                   FORM
                ================================================= */}

                <div className="class-form-card">


                    {/* =================================================
                       INSTRUCTIONS
                    ================================================= */}

                    <div className="class-form-group">

                        <label>
                            Assignment Instructions
                        </label>


                        <div className="assignment-instructions">

                            {assignment?.details}

                        </div>

                    </div>


                    {/* =================================================
                       SUBMISSION
                    ================================================= */}

                    <div className="class-form-group">

                        <label>
                            Your Submission
                        </label>


                        <textarea
                            rows="12"
                            value={submissionText}
                            onChange={(event) =>
                                setSubmissionText(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your assignment submission here..."
                        />

                    </div>


                    {/* =================================================
                       ACTIONS
                    ================================================= */}

                    <div className="class-form-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate(
                                    `/student/assignments/${assignmentId}`
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="button"
                            className="primary-button"
                            disabled={submitting}
                            onClick={handleSubmit}
                        >

                            {submitting
                                ? "Submitting..."
                                : "Submit Assignment"}

                        </button>

                    </div>

                </div>

            </div>

        </PortalLayout>

    );

};


export default AssignmentSubmitPage;