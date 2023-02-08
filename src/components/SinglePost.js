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
                                        <Link to={`/edit/${post._id}`}>Edit</Link>
                                        <button onClick={() => {
                                            deletePost(post._id)
                                            navigate("/things")
                                        }}>Delete</button>
                                    </> :
                                    <button>{`Message ${post.author.username}`}</button>
                            } 
                        </div>
                    </> :
                    null
            }
        </div>
    );
};

export default SinglePost;