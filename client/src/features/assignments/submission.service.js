import axios from "axios";

const API_URL =
    "http://localhost:5000/api/assignments";


const getAuthHeaders = () => {

    const token =
        localStorage.getItem("token");

    return {
        headers: {
            Authorization:
                `Bearer ${token}`
        }
    };
};


/*
=========================================================
GET MY SUBMISSION
=========================================================
*/

export const getMySubmission =
    async (assignmentId) => {

        const studentId =
            JSON.parse(
                localStorage.getItem("user")
            )?._id ||
            JSON.parse(
                localStorage.getItem("user")
            )?.id;

        const response =
            await axios.get(
                `${API_URL}/${assignmentId}/submission`,
                {
                    ...getAuthHeaders(),
                    params: {
                        studentId
                    }
                }
            );

        return response.data;
    };


/*
=========================================================
SUBMIT ASSIGNMENT
=========================================================
*/

export const submitAssignment =
    async (
        assignmentId,
        submissionData
    ) => {

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        const studentId =
            user?._id || user?.id;

        const response =
            await axios.post(
                `${API_URL}/${assignmentId}/submission`,
                {
                    ...submissionData,
                    studentId
                },
                getAuthHeaders()
            );

        return response.data;
    };


/*
=========================================================
UPDATE SUBMISSION
=========================================================
*/

export const updateSubmission =
    async (
        assignmentId,
        submissionData
    ) => {

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        const studentId =
            user?._id || user?.id;

        const response =
            await axios.post(
                `${API_URL}/${assignmentId}/submission`,
                {
                    ...submissionData,
                    studentId
                },
                getAuthHeaders()
            );

        return response.data;
    };


/*
=========================================================
GET ALL SUBMISSIONS
=========================================================
*/

export const getAssignmentSubmissions =
    async (
        assignmentId,
        params = {}
    ) => {

        const response =
            await axios.get(
                `${API_URL}/${assignmentId}/submissions`,
                {
                    ...getAuthHeaders(),
                    params
                }
            );

        return response.data;
    };


/*
=========================================================
GET SINGLE SUBMISSION
=========================================================
*/

export const getSubmission =
    async (
        assignmentId,
        submissionId
    ) => {

        const response =
            await axios.get(
                `${API_URL}/${assignmentId}/submissions/${submissionId}`,
                getAuthHeaders()
            );

        return response.data;
    };


const submissionService = {
    getMySubmission,
    submitAssignment,
    updateSubmission,
    getAssignmentSubmissions,
    getSubmission
};

export default submissionService;