import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Header = ({ isLoggedIn, setIsLoggedIn } ) => {

    const navigate = useNavigate();

    return (
        <header>
            <h3>Stranger's Things</h3>
            <Box sx={{
                "& .MuiButton-root": { m: .75 }
            }}>
                <Button variant="outlined" className="nav-button" onClick={() => navigate('/')}>Home</Button>
                <Button variant="outlined" className="nav-button" onClick={() => navigate('/things')}>Things</Button>
                {
                    (isLoggedIn) ?
                        <>
                            <Button variant="outlined" className="nav-button" onClick={() => navigate('/profile')}>My Profile</Button>
                            <Button variant="outlined" className="nav-button" onClick={() => {
                                window.localStorage.removeItem("strangers-things-token");
                                setIsLoggedIn(false);
                                navigate('/')
                            }}>Log Out</Button>
                        </> :
                        <Button variant="outlined" className="nav-button" onClick={() => navigate('/login')}>Log In/ Register</Button>
                }
            </Box>
        </header>
    );
};

export default Header;