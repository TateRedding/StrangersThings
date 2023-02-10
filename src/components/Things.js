import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import TextField from "@mui/material/TextField";
import "../things.css"

const Things = ({ isLoggedIn, postData, deletePost }) => {
    const [ currPostData, setCurrPostData ] = useState(postData);

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
            <>
                <TextField
                    label="Filter Posts"
                    variant="standard"
                    autoComplete="off"
                    onChange={(event) => filterPosts(event.target.value)} />
                {
                    isLoggedIn ?
                        <Link to="/newpost">Create Post</Link> :
                    null
                }
                <div className="post-container">{
                    currPostData.map((post) => {
                        if (post.active) {
                            return <PostCard key={post._id} post={post} deletePost={deletePost} />
                        };
                    })
                }</div>
            </>
    );
};

export default Things;