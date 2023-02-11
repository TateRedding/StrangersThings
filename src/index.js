import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Things from "./components/Things";
import SinglePost from "./components/SinglePost";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";

const App = () => {
    const APIURL = "https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am"
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('strangers-things-token'));
    const [postData, setPostData] = useState([]);

    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: "#415865"
            },
            secondary: {
                main: "#7a9eb1"
            },
            neutral: {
                main: "#f9f8eb"
            }
        }
    });

    const getPostData = async () => {
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

    const deletePost = async (postId) => {
        try {
            await fetch(`${APIURL}/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem('strangers-things-token')}`
                }
            });
            getPostData();
            navigate("/things");
        } catch (error) {
            console.error("Something went wrong!", error);
        };
    };

    useEffect(() => {
        getPostData();
    }, []);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} theme={theme} />
            <main>
                <Routes>
                    <Route path="/" element={<Home postData={postData} />} />
                    <Route path="/login" element={<LogIn APIURL={APIURL} setIsLoggedIn={setIsLoggedIn} getPostData={getPostData} />} />
                    <Route path="/register" element={<Register APIURL={APIURL} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/profile" element={<Profile APIURL={APIURL} postData={postData} />} />
                    <Route path="/things" element={<Things isLoggedIn={isLoggedIn} postData={postData} deletePost={deletePost} />} />
                    <Route path="/things/:postId" element={<SinglePost APIURL={APIURL} isLoggedIn={isLoggedIn} postData={postData} deletePost={deletePost} />} />
                    <Route path="/newpost" element={<NewPost APIURL={APIURL} getPostData={getPostData} />} />
                    <Route path="/edit/:postId" element={<EditPost APIURL={APIURL} postData={postData} getPostData={getPostData} />} />
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