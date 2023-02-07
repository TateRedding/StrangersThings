import React from "react";
import { useNavigate } from "react-router-dom";
import "../header.css";

const Header = ({ userToken, setUserToken } ) => {
    const navigate = useNavigate();
    return (
        <header>
            <h3>Stranger's Things</h3>
            <nav>
                <button onClick={() => navigate('/')}>Home</button>
                <button>Things</button>
                <button onClick={() => navigate("/profile")}>My Profile</button>
                {
                    (userToken) ?
                        <button onClick={() => {
                            setUserToken('')
                            navigate("/");
                        }}>Log Out</button> :
                        <button onClick={() => navigate("/login")}>Log In/Register</button>
                }
            </nav>
        </header>
    );
};

export default Header;