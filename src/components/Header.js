import React from "react";
import { Link } from "react-router-dom";
import "../header.css";

const Header = ({ isLoggedIn, setIsLoggedIn } ) => {
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
                            <Link to="/" className="nav-link" onClick={() => {
                                window.localStorage.removeItem('strangers-things-token');
                                setIsLoggedIn(false);
                            }}>Log Out</Link>
                        </> :
                        <Link to="/login" className="nav-link">Log In/ Register</Link>
                }
            </nav>
        </header>
    );
};

export default Header;