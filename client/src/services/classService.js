import axios from "axios";

const API_URL = "http://localhost:5000/api/classes";


const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


/* =========================================================
   GET ALL AUTHORIZED CLASSES
========================================================= */

export const getClasses = async (params = {}) => {
    const response = await axios.get(
        API_URL,
        {
            ...getAuthHeaders(),
            params
        }
    );

    return response.data;
};


/* =========================================================
   GET SINGLE CLASS
========================================================= */

export const getClassById = async (classId) => {
    const response = await axios.get(
        `${API_URL}/${classId}`,
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   GET LIVE CLASSES
========================================================= */

export const getLiveClasses = async () => {
    const response = await axios.get(
        `${API_URL}/live`,
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   GET UPCOMING CLASSES
========================================================= */

export const getUpcomingClasses = async () => {
    const response = await axios.get(
        `${API_URL}/upcoming`,
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   GET COMPLETED CLASSES
========================================================= */

export const getCompletedClasses = async () => {
    const response = await axios.get(
        `${API_URL}/completed`,
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   JOIN CLASS
========================================================= */

export const joinClass = async (classId) => {
    const response = await axios.post(
        `${API_URL}/${classId}/join`,
        {},
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   CREATE CLASS
========================================================= */

export const createClass = async (classData) => {
    const response = await axios.post(
        API_URL,
        classData,
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   UPDATE CLASS
========================================================= */

export const updateClass = async (
    classId,
    classData
) => {
    const response = await axios.put(
        `${API_URL}/${classId}`,
        classData,
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   CANCEL CLASS
========================================================= */

export const cancelClass = async (classId) => {
    const response = await axios.patch(
        `${API_URL}/${classId}/cancel`,
        {},
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   GET RECORDING
========================================================= */

export const getRecording = async (classId) => {
    const response = await axios.get(
        `${API_URL}/${classId}/recording`,
        getAuthHeaders()
    );

    return response.data;
};


/* =========================================================
   UPLOAD RECORDING
========================================================= */

export const uploadRecording = async (
    classId,
    formData,
    onUploadProgress
) => {
    const response = await axios.post(
        `${API_URL}/${classId}/recording`,
        formData,
        {
            ...getAuthHeaders(),

            headers: {
                ...getAuthHeaders().headers,
                "Content-Type": "multipart/form-data"
            },

            onUploadProgress
        }
    );

    return response.data;
};