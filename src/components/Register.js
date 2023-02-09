import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../register.css";

const Register = ({ APIURL, setIsLoggedIn }) => {
    const [ usernameInput, setUsernameInput ] = useState('');
    const [ passwordOneInput, setPasswordOneInput ] = useState('');
    const [ passwordTwoInput, setPasswordTwoInput ] = useState('');
    const [ nameTaken, setNameTaken ] = useState(false);

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
                    window.localStorage.setItem('strangers-things-token', result.data.token);
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
        <form onSubmit={registerUser}>
            {
                (nameTaken) ?
                    <p>Username is already taken! Try something else.</p> :
                    null
            }
            <label htmlFor="username">Username (3 characters minimum):</label>
            <input
                name="username"
                value={usernameInput}
                minLength="3"
                maxLength="20"
                required
                onChange={(event) => {
                    setUsernameInput(event.target.value)
                    setNameTaken(false);
                }} />
            <label htmlFor="password-one">Password (8 characters minimum):</label>
            <input
                type="password"
                name="password-one"
                value={passwordOneInput}
                minLength="8"
                maxLength="25"
                required
                onChange={(event) => setPasswordOneInput(event.target.value)} />
            <label htmlFor="password-two">Re-enter password:</label>
            <input
                type="password"
                name="password-two"
                value={passwordTwoInput}
                minLength="8"
                maxLength="25"
                required
                onChange={(event) => setPasswordTwoInput(event.target.value)} />
            {
                (passwordOneInput !== passwordTwoInput) ?
                    <p className="match-warning">Passwords must match!</p> :
                    null
            }
            <button type="submit">Create Account</button>
        </form>
    );
};

export default Register;