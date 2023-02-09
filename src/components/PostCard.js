import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../post-card.css"

const PostCard = ({ APIURL, post, deletePost }) => {
    const [ messageInput, setMessageInput ] = useState('');

    const sendMessage = async (event) => {
        event.preventDefault();
        if (messageInput) {
            try {
                const response = await fetch(`${APIURL}/posts/${post._id}/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${window.localStorage.getItem('strangers-things-token')}`
                    },
                    body: JSON.stringify({
                        message: { content: messageInput }
                    })
                });
                const result = await response.json();
                if (result.success) {
                    setMessageInput('');
                };
            } catch (error) {
                console.error("Something went wrong!", error);
            };
        };
    };

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
                            <form onSubmit={sendMessage}>
                                <input
                                    value={messageInput}
                                    placeholder={`Message ${post.author.username}`}
                                    maxLength="500"
                                    required
                                    onChange={(event) => setMessageInput(event.target.value)} />
                                <button type="submit">Send</button>
                            </form> :
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