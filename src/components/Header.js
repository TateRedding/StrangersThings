import React from "react";
import { useNavigate } from "react-router-dom";
import "../header.css";

const Header = ({ isLoggedIn, setIsLogegdIn } ) => {
    const navigate = useNavigate();
    return (
        <header>
            <h3>Stranger's Things</h3>
            <nav>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate("/things")}>Things</button>
                <button onClick={() => navigate("/profile")}>My Profile</button>
                {
                    (isLoggedIn) ?
                        <button onClick={() => {
                            window.localStorage.removeItem('strangers-things-token');
                            setIsLogegdIn(false);
                            navigate("/");
                        }}>Log Out</button> :
                        <button onClick={() => navigate("/login")}>Log In/Register</button>
                }
            </nav>
        </header>
    );
};

export default Header;