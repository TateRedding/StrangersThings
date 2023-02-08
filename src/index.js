import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Things from "./components/Things";
import NewPost from "./components/NewPost";

const App = () => {
    const APIURL = "https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am"
    const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('strangers-things-token'));

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn APIURL={APIURL} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register APIURL={APIURL} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/profile" element={<Profile APIURL={APIURL} isLoggedIn={isLoggedIn} />} />
                    <Route path="/things" element={<Things APIURL={APIURL} isLoggedIn={isLoggedIn} />} />
                    <Route path="/things/:postId" element={<Things APIURL={APIURL} isLoggedIn={isLoggedIn} />} />
                    <Route path="/newpost" element={<NewPost APIURL={APIURL} isLoggedIn={isLoggedIn} />} />
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