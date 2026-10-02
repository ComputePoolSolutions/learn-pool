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
GET ALL ASSIGNMENTS
=========================================================
*/

export const getAssignments =
    async (params = {}) => {

        const response =
            await axios.get(
                API_URL,
                {
                    ...getAuthHeaders(),
                    params
                }
            );

        return response.data;
    };


/*
=========================================================
GET SINGLE ASSIGNMENT
=========================================================
*/

export const getAssignment =
    async (assignmentId) => {

        const response =
            await axios.get(
                `${API_URL}/${assignmentId}`,
                getAuthHeaders()
            );

        return response.data;
    };


/*
=========================================================
CREATE ASSIGNMENT
=========================================================
*/

export const createAssignment =
    async (assignmentData) => {

        const response =
            await axios.post(
                API_URL,
                assignmentData,
                getAuthHeaders()
            );

        return response.data;
    };


/*
=========================================================
UPDATE ASSIGNMENT
=========================================================
*/

export const updateAssignment =
    async (
        assignmentId,
        assignmentData
    ) => {

        const response =
            await axios.put(
                `${API_URL}/${assignmentId}`,
                assignmentData,
                getAuthHeaders()
            );

        return response.data;
    };


/*
=========================================================
PUBLISH ASSIGNMENT
=========================================================
*/

export const publishAssignment =
    async (assignmentId) => {

        const response =
            await axios.patch(
                `${API_URL}/${assignmentId}/publish`,
                {},
                getAuthHeaders()
            );

        return response.data;
    };


/*
=========================================================
CLOSE ASSIGNMENT
=========================================================
*/

export const closeAssignment =
    async (assignmentId) => {

        const response =
            await axios.patch(
                `${API_URL}/${assignmentId}/close`,
                {},
                getAuthHeaders()
            );

        return response.data;
    };


/*
=========================================================
ARCHIVE ASSIGNMENT
=========================================================
*/

export const archiveAssignment =
    async (assignmentId) => {

        const response =
            await axios.patch(
                `${API_URL}/${assignmentId}/archive`,
                {},
                getAuthHeaders()
            );

        return response.data;
    };


const assignmentService = {
    getAssignments,
    getAssignment,
    createAssignment,
    updateAssignment,
    publishAssignment,
    closeAssignment,
    archiveAssignment
};

export default assignmentService;