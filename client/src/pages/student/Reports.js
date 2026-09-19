import React from "react";

function Reports() {
    return (
        <div style={styles.page}>

            <h1>Reports</h1>

            <div style={styles.card}>
                <h2>📊 Student Reports</h2>

                <p>
                    View your course progress, assignment performance
                    and learning reports here.
                </p>

                <div style={styles.box}>
                    <h3>Course Progress</h3>
                    <p>No reports available yet.</p>
                </div>

            </div>

        </div>
    );
}

const styles = {
    page: {
        padding: "30px",
        fontFamily: "Arial, sans-serif"
    },

    card: {
        marginTop: "25px",
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
    },

    box: {
        marginTop: "25px",
        padding: "20px",
        background: "#e8f8ff",
        borderRadius: "10px"
    }
};

export default Reports;