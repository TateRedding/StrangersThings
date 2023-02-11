import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LogIn = ({ APIURL, setIsLoggedIn, getPostData }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const logIn = async (event) => {
        event.preventDefault();
        if (usernameInput && passwordInput) {
            setInvalidLogin(false);
            try {
                const response = await fetch(`${APIURL}/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: {
                            username: usernameInput,
                            password: passwordInput
                        }
                    })
                });
                const result = await response.json();
                if (result.error && result.error.name === "InvalidCredentials") {
                    setInvalidLogin(true);
                } else if (result.success) {
                    window.localStorage.setItem("strangers-things-token", result.data.token)
                    setIsLoggedIn(true);
                    setUsernameInput('');
                    setPasswordInput('');
                    getPostData();
                    navigate("/profile");
                };
            } catch (error) {
                console.error("Something went wrong!", error);
            };
        };
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& .MuiTextField-root, & .MuiFormControl-root, & .MuiButton-root": { m: .75 },
                "& .MuiTextField-root, & .MuiFormControl-root": { width: "100%" }
            }}
            onSubmit={logIn}>
            {
                (invalidLogin) ?
                    <p>Incorrect username or password. Try again.</p> :
                    null
            }
            <TextField
                label="Username"
                value={usernameInput}
                minLength="3"
                maxLength="20"
                required
                onChange={(event) => setUsernameInput(event.target.value)} />
            <FormControl>
                <InputLabel htmlFor="password">Password *</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Password *"
                    value={passwordInput}
                    minLength="8"
                    required
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={(event) => setPasswordInput(event.target.value)}
                />
            </FormControl>
            <Button type="submit" variant="contained">Log In</Button>
            <p>Don't have an account? <Link to="/register">Click here!</Link></p>
        </Box>
    );
};

export default LogIn;