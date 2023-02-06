import React from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const navigate = useNavigate();
    return (
        <main>
            <h2>UserName</h2>
            <h2>Password</h2>
            <button>LogIn</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </main>
    );
};

export default LogIn;