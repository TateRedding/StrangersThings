import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../header.css";

const Header = ({ isLoggedIn, setIsLoggedIn } ) => {
    const navigate = useNavigate();
    return (
        <header>
            <h3>Stranger's Things</h3>
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/things" className="nav-link">Things</Link>
                {
                    (isLoggedIn) ?
                        <>
                            <Link to="/profile" className="nav-link">My Profile</Link>
                            <button onClick={() => {
                                window.localStorage.removeItem('strangers-things-token');
                                setIsLoggedIn(false);
                                navigate("/");
                            }}>Log Out</button>
                        </> :
                        <Link to="/login" className="nav-link">Log In/ Register</Link>
                }
            </nav>
        </header>
    );
};

export default Header;