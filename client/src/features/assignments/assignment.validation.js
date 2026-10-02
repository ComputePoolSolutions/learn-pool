export const validateAssignment = (data) => {
    const errors = {};

    if (!data.title || !data.title.trim()) {
        errors.title = "Assignment title is required.";
    }

    if (!data.courseId) {
        errors.courseId = "Please select a course.";
    }

    if (!data.details || !data.details.trim()) {
        errors.details = "Assignment instructions are required.";
    }

    if (!data.dueDate) {
        errors.dueDate = "Due date is required.";
    } else {
        const dueDate = new Date(data.dueDate);

        if (isNaN(dueDate.getTime())) {
            errors.dueDate = "Please enter a valid due date.";
        }
    }

    const maxScore = Number(data.maxScore);

    if (
        !data.maxScore ||
        Number.isNaN(maxScore) ||
        !Number.isFinite(maxScore) ||
        maxScore <= 0
    ) {
        errors.maxScore =
            "Maximum score must be greater than 0.";
    }

    return errors;
};


export const validateGrade = (
    score,
    maxScore
) => {
    const numericScore = Number(score);
    const numericMaxScore = Number(maxScore);

    if (
        Number.isNaN(numericScore) ||
        !Number.isFinite(numericScore)
    ) {
        return "Score must be a valid number.";
    }

    if (
        numericScore < 0
    ) {
        return "Score cannot be negative.";
    }

    if (
        numericScore > numericMaxScore
    ) {
        return `Score cannot be greater than ${numericMaxScore}.`;
    }

    return "";
};


export const calculatePercentage = (
    score,
    maxScore
) => {
    const numericScore = Number(score);
    const numericMaxScore = Number(maxScore);

    if (
        !numericMaxScore ||
        numericMaxScore <= 0
    ) {
        return 0;
    }

    return Number(
        (
            (numericScore / numericMaxScore) *
            100
        ).toFixed(2)
    );
};