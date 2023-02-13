import React from "react";

const PostDetails = ({ post }) => {
    return (
        <div className="post-details">
            <h2>{post.title}</h2>
            <h3>{post.author.username}</h3>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>{post.location}</p>
            <p>{
                post.willDeliver ?
                    "Willing to deliver" : "Not willing to deliver"
            }</p>
        </div>
    );
};

export default PostDetails;