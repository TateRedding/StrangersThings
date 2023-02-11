import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = ({ APIURL, setIsLoggedIn }) => {
    const [ usernameInput, setUsernameInput ] = useState('');
    const [ passwordOneInput, setPasswordOneInput ] = useState('');
    const [ passwordTwoInput, setPasswordTwoInput ] = useState('');
    const [ nameTaken, setNameTaken ] = useState(false);
    const [ showPasswordOne, setShowPasswordOne] = useState(false);
    const [ showPasswordTwo, setShowPasswordTwo] = useState(false);

    const navigate = useNavigate();
    
    const registerUser = async (event) => {
        event.preventDefault();
         if (passwordOneInput === passwordTwoInput && usernameInput && passwordOneInput) {
            try {
                const response = await fetch(`${APIURL}/users/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: {
                            username: usernameInput,
                            password: passwordOneInput
                        }
                    })
                });
                const result = await response.json();
                if (result.error !== null && result.error.name === "UserExists") {
                    setNameTaken(true);
                } else if (result.success) {
                    window.localStorage.setItem("strangers-things-token", result.data.token);
                    setIsLoggedIn(true);
                    setUsernameInput('');
                    setPasswordOneInput('');
                    setPasswordTwoInput('');
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
                "& .MuiTextField-root, & .MuiFormControl-root, & .MuiButton-root": { m: .75},
                "& .MuiTextField-root, & .MuiFormControl-root": { width: "100%" }
            }}
            onSubmit={registerUser}>
            {
                (nameTaken) ?
                    <p>Username is already taken! Try something else.</p> :
                    null
            }
            <TextField
                label="Username"
                value={usernameInput}
                minLength="3"
                maxLength="20"
                required
                helperText="Must be at least 3 characters"
                onChange={(event) => setUsernameInput(event.target.value)} />
            <FormControl>
                <InputLabel htmlFor="password-one">Password *</InputLabel>
                <OutlinedInput
                    id="password-one"
                    type={showPasswordOne ? "text" : "password"}
                    label="Password *"
                    value={passwordOneInput}
                    minLength="8"
                    required
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPasswordOne(!showPasswordOne)}
                        edge="end"
                        >
                        {showPasswordOne ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={(event) => setPasswordOneInput(event.target.value)} />
                <FormHelperText>Must be at least 8 characters</FormHelperText>
            </FormControl>
            {
                (passwordOneInput !== passwordTwoInput) ?
                    <p className="warning">Passwords must match!</p> :
                    null
            }
            <FormControl>
                <InputLabel htmlFor="password-two">Re-enter Password *</InputLabel>
                <OutlinedInput
                    id="password-two"
                    type={showPasswordTwo ? "text" : "password"}
                    label="Re-enter Password *"
                    value={passwordTwoInput}
                    minLength="8"
                    required
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                        edge="end"
                        >
                        {showPasswordTwo ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={(event) => setPasswordTwoInput(event.target.value)}
                />
            </FormControl>
            <Button type="submit" variant="contained">Register</Button>
            <p>Already have an account? <Link to="/login">Click here!</Link></p>
        </Box>
    );
};

export default Register;