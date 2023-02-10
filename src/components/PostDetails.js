import React from "react";
import Typography from "@mui/material/Typography";

const PostDetails = ({ post }) => {
    return (
        <>
            <Typography variant="h3">{post.title}</Typography>
            <Typography variant="h5">{post.author.username}</Typography>
            <Typography>{post.description}</Typography>
            <Typography>{post.price}</Typography>
            <Typography>Will deliver? {post.willDeliver ? "Yes" : "No"}</Typography>
        </>
    );
};

export default PostDetails;