import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";

const SinglePost = ({ postData, deletePost }) => {
    const [ post, setPost ] = useState({});

    const { postId } = useParams();

    useEffect(() => {
        if (postData !== undefined) {
            setPost(postData.filter((post) => post._id === postId)[0]);
        }
    }, [postData]);

    return (
        <div className="single-post-container">
            {
                post !== undefined && Object.keys(post).length > 0 ?
                    <PostCard post={post} deletePost={deletePost} /> :
                    null
            }
            <p>Messages regarding this post will be displayed if sent or recieved by logged in user.</p>
        </div>
    );
};

export default SinglePost;