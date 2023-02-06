import React, { useState } from "react";
import "../register.css";

const Register = () => {
    const [ usernameInput, setUserNameInput ] = useState('');
    const [ passwordOneInput, setPasswordOneInput ] = useState('');
    const [ passwordTwoInput, setPasswordTwoInput ] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(usernameInput);
        console.log(passwordOneInput);
        console.log(passwordTwoInput);
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    name="username"
                    value={usernameInput}
                    onChange={(event) => setUserNameInput(event.target.value)} />
                    <label htmlFor="ppassword-one">Password:</label>
                <input
                    name="password-one"
                    value={passwordOneInput}
                    onChange={(event) => setPasswordOneInput(event.target.value)} />
                    <label htmlFor="password-two">Re-enter password:</label>
                <input
                    name="password-two"
                    value={passwordTwoInput}
                    onChange={(event) => setPasswordTwoInput(event.target.value)} />
                <button type="submit">Create Account</button>
            </form>
        </main>
    );
};

export default Register;