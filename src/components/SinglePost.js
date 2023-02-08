import React from "react";
import { useNavigate } from "react-router-dom";
import "../single-post.css"

const SinglePost = ({ post, deletePost }) => {
    const navigate = useNavigate();
    return (
        <div className="single-post-container">
            {
                post !== undefined ?
                    <>
                        <h3>{post.title}</h3>
                        <h2>{post.author.username}</h2>
                        <p>{post.description}</p>
                        <p>{post.price}</p>
                        <p>Location: {post.location}</p>
                        <p>Will deliver? {post.willDeliver ? "Yes" : "No"}</p>
                        <div className="buttons">
                            {
                                post.isAuthor ?
                                    <>
                                        <button>Edit</button>
                                        <button onClick={() => {
                                            deletePost(post._id)
                                            navigate("/things")
                                        }}>Delete</button>
                                    </> :
                                    <button>Message Seller</button>
                            } 
                        </div>
                    </> :
                    null
            }
        </div>
    );
};

export default SinglePost;