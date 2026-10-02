import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    getAssignment
} from "../assignment.service";


const useAssignment =
    (assignmentId) => {

        const [
            assignment,
            setAssignment
        ] = useState(null);

        const [
            loading,
            setLoading
        ] = useState(true);

        const [
            error,
            setError
        ] = useState("");


        const loadAssignment =
            useCallback(
                async () => {

                    if (!assignmentId) {

                        setLoading(false);
                        return;
                    }

                    try {

                        setLoading(true);
                        setError("");

                        const data =
                            await getAssignment(
                                assignmentId
                            );

                        setAssignment(
                            data.assignment ||
                            data
                        );

                    } catch (error) {

                        console.error(
                            "Assignment loading error:",
                            error
                        );

                        setError(
                            error.response?.data?.message ||
                            "Failed to load assignment."
                        );

                    } finally {

                        setLoading(false);
                    }

                },
                [assignmentId]
            );


        useEffect(() => {

            loadAssignment();

        }, [loadAssignment]);


        return {
            assignment,
            loading,
            error,
            reload: loadAssignment
        };
    };


export default useAssignment;