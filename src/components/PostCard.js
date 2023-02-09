import React from "react";
import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";
import "../post-card.css";

const PostCard = ({ post, deletePost }) => {
    return (
        <div className="post-card">
            <PostDetails post={post} />
            <div className="buttons">
                {
                    post.isAuthor ?
                        <>
                            <Link to={`/edit/${post._id}`}>Edit</Link>
                            <button onClick={() => deletePost(post._id)}>Delete</button>
                        </> :
                            null
                }
                <Link to={`/things/${post._id}`}>View Thing</Link>
            </div>
        </div>
    );
};

export default PostCard;