import axios from "axios";

const API_URL =
    "http://localhost:5000/api/assignments";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


export const gradeSubmission = async (
    assignmentId,
    submissionId,
    gradeData
) => {
    const response = await axios.post(
        `${API_URL}/${assignmentId}/submissions/${submissionId}/grade`,
        gradeData,
        getAuthHeaders()
    );

    return response.data;
};


export const regradeSubmission = async (
    assignmentId,
    submissionId,
    gradeData
) => {
    const response = await axios.put(
        `${API_URL}/${assignmentId}/submissions/${submissionId}/grade`,
        gradeData,
        getAuthHeaders()
    );

    return response.data;
};


export const getAssignmentStats = async (
    assignmentId
) => {
    const response = await axios.get(
        `${API_URL}/${assignmentId}/stats`,
        getAuthHeaders()
    );

    return response.data;
};


export default {
    gradeSubmission,
    regradeSubmission,
    getAssignmentStats
};