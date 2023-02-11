import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

const Header = ({ isLoggedIn, setIsLoggedIn, theme } ) => {

    const navigate = useNavigate();

    return (
        <header>
            <h3>Stranger's Things</h3>
            <Box sx={{
                "& .MuiButton-root": { m: .75 }
            }}>
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" className="nav-button" color="secondary" onClick={() => navigate('/')}>Home</Button>
                    <Button variant="outlined" className="nav-button" color="secondary" onClick={() => navigate('/things')}>Things</Button>
                    {
                        (isLoggedIn) ?
                            <>
                                <Button variant="outlined" className="nav-button" color="secondary" onClick={() => navigate('/profile')}>My Profile</Button>
                                <Button variant="outlined" className="nav-button" color="secondary" onClick={() => {
                                    window.localStorage.removeItem("strangers-things-token");
                                    setIsLoggedIn(false);
                                    navigate('/')
                                }}>Log Out</Button>
                            </> :
                            <Button variant="outlined" className="nav-button" color="secondary" onClick={() => navigate('/login')}>Log In/ Register</Button>
                    }
                </ThemeProvider>
            </Box>
        </header>
    );
};

export default Header;