import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import "../things.css"
import SinglePost from "./SinglePost";

const Things = ({ APIURL, isLoggedIn, postData, getPostData}) => {
    const { postId } = useParams();

    const navigate = useNavigate();

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
        } catch (error) {
            console.error("Something went wrong!", error);
        };
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);

    return (
        postId ?
            <>
                <SinglePost post={postData.filter((post) => post._id === postId)[0]} deletePost={deletePost} />
            </> :
            <>
                <Link to="/newpost">Create Post</Link>
                <div className="post-container">{
                    postData.map((post) => {
                        if (post.active) {
                            return <PostCard key={post._id} post={post} deletePost={deletePost} />
                        };
                    })
                }</div>
            </>
    );
};

export default Things;