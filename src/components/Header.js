import React from "react";
import { useNavigate } from "react-router-dom";
import "../header.css";

const Header = () => {
    const navigate = useNavigate();
    return (
        <header>
            <h3>Stranger's Things</h3>
            <nav>
                <button onClick={() => navigate('/')}>Home</button>
                <button>Things</button>
                <button>My Profile</button>
                <button onClick={() => navigate("/login")}>LogIn/Register</button>
            </nav>
        </header>
    );
};

export default Header;