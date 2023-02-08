import React from "react";
import PostCard from "./PostCard";

const SinglePost = ({ post, deletePost }) => {
    return (
        <div className="single-post-container">
            {
                post !== undefined ?
                    <PostCard post={post} deletePost={deletePost} /> :
                    null
            }
            <p>Messages regarding this post will be displayed if sent or recieved by logged in user.</p>
        </div>
    );
};

export default SinglePost;