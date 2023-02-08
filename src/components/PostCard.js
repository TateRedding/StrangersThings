import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post, deletePost }) => {

    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>Location: {post.location}</p>
            <p>Will deliver? {post.willDeliver ? "Yes" : "No"}</p>
            <div className="buttons">
                {
                    post.isAuthor ?
                        <>
                            <button>Edit</button>
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