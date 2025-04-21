import React from "react";

const ErrorPage: React.FC = () => {
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            textAlign: "center" as const,
            fontFamily: "'Arial', sans-serif",
        },
        heading: {
            fontSize: "2rem",
            marginBottom: "1rem",
        },
        message: {
            fontSize: "1.2rem",
            marginBottom: "1.5rem",
        },
        button: {
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#721c24",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        },
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Oops! Something went wrong.</h1>
            <p style={styles.message}>The page you are looking for does not exist or an error occurred.</p>
            <button style={styles.button} onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default ErrorPage;