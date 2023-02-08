import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = ({ APIURL, setIsLoggedIn }) => {
    const [ usernameInput, setUsernameInput ] = useState('');
    const [ passwordInput, setPasswordInput ] = useState('');
    const [ invalidLogin,  setInvalidLogin ] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
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
                if (result.error !== null && result.error.name === "InvalidCredentials") {
                    setInvalidLogin(true);
                } else if (result.success) {
                    window.localStorage.setItem('strangers-things-token', result.data.token)
                    setIsLoggedIn(true);
                    setUsernameInput('');
                    setPasswordInput('');
                    navigate("/profile");
                };
            } catch (error) {
                console.error("Something went wrong!", error);
            };
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            {
                (invalidLogin) ?
                    <p>Incorrect username or password. Try again.</p> :
                    null
            }
            <label htmlFor="username">Username:</label>
            <input
                name="username"
                value={usernameInput}
                minLength="3"
                maxLength="20"
                required
                onChange={(event) => setUsernameInput(event.target.value)} />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                name="password"
                value={passwordInput}
                minLength="8"
                maxLength="25"
                required
                onChange={(event) => setPasswordInput(event.target.value)} />
            <button type="submit">Log In</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </form>
    );
};

export default LogIn;