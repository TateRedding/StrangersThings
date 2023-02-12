import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";

const Things = ({ isLoggedIn, postData, deletePost, theme }) => {
    const [currPostData, setCurrPostData] = useState(postData);

    const navigate = useNavigate();

    useEffect(() => {
        if (postData) {
            setCurrPostData(postData);
        }
    }, [postData]);

    const filterPosts = (value) => {
        const searchTerm = value.toLowerCase();
        setCurrPostData(postData.filter((post) => {
            return (
                post.title.toLowerCase().includes(searchTerm) ||
                post.author.username.toLowerCase().includes(searchTerm) ||
                post.location.toLowerCase().includes(searchTerm)
            );
        }));
    };

    return (
        <ThemeProvider theme={theme}>
            <TextField
                label="Filter Posts"
                variant="standard"
                autoComplete="off"
                color="primaryDark"
                sx={{
                    width: "50ch"
                }}
                onChange={(event) => filterPosts(event.target.value)} />
            {
                isLoggedIn ?
                    <Button
                        variant="contained"
                        color="primaryLight"
                        onClick={() => navigate("/newpost")}
                        sx={{
                            m: 1
                        }}
                    >Create Post</Button> :
                    null
            }
            <div className="post-container">{
                currPostData.map((post) => {
                    if (post.active) {
                        return <PostCard key={post._id} post={post} deletePost={deletePost} theme={theme} />
                    };
                })
            }</div>
        </ThemeProvider>
    );
};

export default Things;