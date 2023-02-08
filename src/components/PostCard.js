import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../post-card.css"

const PostCard = ({ post, deletePost }) => {

    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <h4>{post.author.username}</h4>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>Location: {post.location}</p>
            <p>Will deliver? {post.willDeliver ? "Yes" : "No"}</p>
            <div className="buttons">
                {
                    post.isAuthor ?
                        <>
                            <Link to={`/edit/${post._id}`}>Edit</Link>
                            <button onClick={() => deletePost(post._id)}>Delete</button>
                        </> :
                        useLocation().pathname !== "/things" ?
                            <button>{`Message ${post.author.username}`}</button> :
                            null
                }
                {
                    useLocation().pathname === "/things" ?
                        <Link to={`/things/${post._id}`}>View Thing</Link> :
                        null
                }   
            </div>
        </div>
    );
};

export default PostCard;