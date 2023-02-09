import React from "react";

const PostDetails = ({ post }) => {
    return (
        <div className="post-details">
            <h3>{post.title}</h3>
            <h4>{post.author.username}</h4>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>Location: {post.location}</p>
            <p>Will deliver? {post.willDeliver ? "Yes" : "No"}</p>
        </div>
    );
};

export default PostDetails;