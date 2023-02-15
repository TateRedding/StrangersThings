import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

const Header = ({ isLoggedIn, setIsLoggedIn, getPostData, theme }) => {

    const navigate = useNavigate();

    return (
        <header>
            <h3>Stranger's Things</h3>
            <Box sx={{
                "& .MuiButton-root": { m: .75 }
            }}>
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" className="nav-button" color="primaryLight" onClick={() => navigate('/')}>Home</Button>
                    <Button variant="outlined" className="nav-button" color="primaryLight" onClick={() => navigate('/things')}>Things</Button>
                    {
                        (isLoggedIn) ?
                            <>
                                <Button variant="outlined" className="nav-button" color="primaryLight" onClick={() => navigate('/profile')}>My Profile</Button>
                                <Button variant="outlined" className="nav-button" color="primaryLight" onClick={() => {
                                    window.localStorage.removeItem("strangers-things-token");
                                    setIsLoggedIn(false);
                                    getPostData();
                                    navigate('/')
                                }}>Log Out</Button>
                            </> :
                            <Button variant="outlined" className="nav-button" color="primaryLight" onClick={() => navigate('/login')}>Log In/ Register</Button>
                    }
                </ThemeProvider>
            </Box>
        </header>
    );
};

export default Header;