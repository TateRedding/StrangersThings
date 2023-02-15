import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';
import EditPost from "./components/EditPost";
import Header from "./components/Header";
import Home from "./components/Home";
import IconButton from '@mui/material/IconButton';
import LogIn from "./components/LogIn";
import NewPost from "./components/NewPost";
import Profile from "./components/Profile";
import Register from "./components/Register";
import SinglePost from "./components/SinglePost";
import Snackbar from "@mui/material/Snackbar";
import Things from "./components/Things";

const App = () => {
    const APIURL = "https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am"
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('strangers-things-token'));
    const [postData, setPostData] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primaryDark: {
                main: "#415865"
            },
            primaryLight: {
                main: "#7a9eb1"
            },
            secondaryDark: {
                main: "#ffe1b6"
            },
            secondaryLight: {
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
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                getPostData={getPostData}
                theme={theme} />
            <main>
                <Routes>
                    <Route path="/" element={
                        <Home
                            postData={postData}
                            theme={theme} />} />
                    <Route path="/login" element={
                        <LogIn APIURL={APIURL}
                            setIsLoggedIn={setIsLoggedIn}
                            getPostData={getPostData}
                            theme={theme} />} />
                    <Route path="/register" element={
                        <Register APIURL={APIURL}
                            setIsLoggedIn={setIsLoggedIn}
                            theme={theme} />} />
                    <Route path="/profile" element={
                        <Profile APIURL={APIURL}
                            postData={postData}
                            theme={theme} />} />
                    <Route path="/things" element={
                        <Things isLoggedIn={isLoggedIn}
                            postData={postData}
                            deletePost={deletePost}
                            theme={theme} />} />
                    <Route path="/things/:postId" element={
                        <SinglePost APIURL={APIURL}
                            isLoggedIn={isLoggedIn}
                            postData={postData}
                            deletePost={deletePost}
                            setSuccessMessage={setSuccessMessage}
                            setShowSuccessMessage={setShowSuccessMessage}
                            setShowErrorMessage={setShowErrorMessage}
                            theme={theme} />} />
                    <Route path="/newpost" element={
                        <NewPost APIURL={APIURL}
                            getPostData={getPostData}
                            setSuccessMessage={setSuccessMessage}
                            setShowSuccessMessage={setShowSuccessMessage}
                            setShowErrorMessage={setShowErrorMessage}
                            theme={theme} />} />
                    <Route path="/edit/:postId" element={
                        <EditPost APIURL={APIURL}
                            postData={postData}
                            getPostData={getPostData}
                            setSuccessMessage={setSuccessMessage}
                            setShowSuccessMessage={setShowSuccessMessage}
                            setShowErrorMessage={setShowErrorMessage}
                            theme={theme} />} />
                </Routes>
                <Snackbar
                    open={showSuccessMessage}
                    autoHideDuration={6000}
                    onClose={() => {
                        setSuccessMessage('');
                        setShowSuccessMessage(false)
                    }}>
                    <Alert
                        variant="filled"
                        severity="success"
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => setShowSuccessMessage(false)} >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        } >{successMessage}</Alert>
                </Snackbar>
                <Snackbar
                    open={showErrorMessage}
                    autoHideDuration={6000}
                    onClose={() => {
                        setShowErrorMessage(false)
                    }} >
                    <Alert
                        variant="filled"
                        severity="error"
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => setShowErrorMessage(false)} >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        } >Something went wrong! Try again.</Alert>
                </Snackbar>
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