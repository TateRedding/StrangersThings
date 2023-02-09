import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";
import "../post-card.css";

const SinglePostCard = ({ APIURL, isLoggedIn, post, deletePost }) => {
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
            <PostDetails post={post} />
            <div className="buttons-or-message-form">
                {
                    post.isAuthor ?
                    <>
                        <Link to={`/edit/${post._id}`}>Edit</Link>
                        <button onClick={() => deletePost(post._id)}>Delete</button>
                    </> :
                        isLoggedIn ? 
                            <form onSubmit={sendMessage}>
                                <input
                                    value={messageInput}
                                    placeholder={`Message ${post.author.username}`}
                                    maxLength="500"
                                    required
                                    onChange={(event) => setMessageInput(event.target.value)} />
                                <button type="submit">Send</button>
                            </form> :
                            <p>Log in to message this seller!</p>
                }
            </div>
        </div>
    );
};

export default SinglePostCard;