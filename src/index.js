import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Things from "./components/Things";

const App = () => {
    const APIURL = "https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am"
    const [ userToken, setUserToken ] = useState('');

    // For profile and posts page, useEffect on a load should first check if userToken is true:
    // if true, get the information needed for the page, if not, redirect to /login

    return (
        <>
            <Header userToken={userToken} setUserToken={setUserToken} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn APIURL={APIURL} setUserToken={setUserToken} />} />
                    <Route path="/register" element={<Register APIURL={APIURL} setUserToken={setUserToken} />} />
                    <Route path="/profile" element={<Profile APIURL={APIURL} userToken={userToken} />} />
                    <Route path="/things" element={<Things APIURL={APIURL} userToken={userToken} />} />
                </Routes>
            </main>
        </>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);