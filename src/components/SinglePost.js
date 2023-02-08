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
        </div>
    );
};

export default SinglePost;