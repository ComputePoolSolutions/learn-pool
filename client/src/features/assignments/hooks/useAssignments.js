import { useCallback, useEffect, useState } from "react";
import { getAssignments } from "../assignment.service";

const useAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadAssignments = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAssignments();

            const list = Array.isArray(data)
                ? data
                : data.assignments || [];

            setAssignments(list);
        } catch (error) {
            console.error("Assignments loading error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load assignments."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAssignments();
    }, [loadAssignments]);

    return {
        assignments,
        loading,
        error,
        reload: loadAssignments
    };
};

export default useAssignments;