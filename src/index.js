import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Things from "./components/Things";
import AddOrEditPost from "./components/AddOrEditPost";

const App = () => {
    const APIURL = "https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am"
    const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('strangers-things-token'));
    const [ postData, setPostData ] = useState([]);

    const getPostData = async() => {
        try {
            const response = await fetch(`${APIURL}/posts`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem('strangers-things-token')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setPostData(result.data.posts);
            };
        } catch (error) {
            console.error("Something went wrong!", error);
        };
    };
    
    useEffect(() => {
        getPostData();
    }, []);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn APIURL={APIURL} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register APIURL={APIURL} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/profile" element={<Profile APIURL={APIURL} isLoggedIn={isLoggedIn} />} />
                    <Route path="/things" element={<Things APIURL={APIURL} isLoggedIn={isLoggedIn} postData={postData} getPostData={getPostData} />} />
                    <Route path="/things/:postId" element={<Things APIURL={APIURL} isLoggedIn={isLoggedIn} postData={postData} getPostData={getPostData} />} />
                    <Route path="/newpost" element={<AddOrEditPost APIURL={APIURL} postData={postData} getPostData={getPostData} />} />
                    <Route path="/edit/:postId" element={<AddOrEditPost APIURL={APIURL} postData={postData} getPostData={getPostData} />} />
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