import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate("/home");
    };

    return (
        <motion.div
            className="not-found-page"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f8f9fa",
                color: "#343a40",
                textAlign: "center",
            }}
        >
            <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: "4rem", marginBottom: "1rem" }}
            >
                404
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ fontSize: "1.5rem", marginBottom: "2rem" }}
            >
                Oops! The page you're looking for doesn't exist.
            </motion.p>
            <motion.button
                onClick={handleGoToDashboard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    color: "#fff",
                    backgroundColor: "#007bff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Go to Home
            </motion.button>
        </motion.div>
    );
};

export default NotFoundPage;