export const getClassStatus = (classItem) => {
    if (!classItem) {
        return "scheduled";
    }

    if (classItem.status === "cancelled") {
        return "cancelled";
    }

    const now = new Date();

    const startTime = new Date(classItem.startTime);
    const endTime = new Date(classItem.endTime);

    if (now < startTime) {
        return "scheduled";
    }

    if (now >= startTime && now < endTime) {
        return "live";
    }

    return "completed";
};


export const getStatusLabel = (status) => {
    switch (status) {
        case "live":
            return "LIVE";

        case "scheduled":
            return "UPCOMING";

        case "completed":
            return "COMPLETED";

        case "cancelled":
            return "CANCELLED";

        default:
            return "UNKNOWN";
    }
};


export const getStatusClass = (status) => {
    switch (status) {
        case "live":
            return "status-live";

        case "scheduled":
            return "status-upcoming";

        case "completed":
            return "status-completed";

        case "cancelled":
            return "status-cancelled";

        default:
            return "";
    }
};