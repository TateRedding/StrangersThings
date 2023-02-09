import React from "react";

const MessageCard = ({ message, loggedInUserId }) => {
    return (
        <div className="message-card">
            {
                loggedInUserId === message.fromUser._id ?
                    <p>- Sent by me -</p> :
                    <p>From: {message.fromUser.username}</p>
            }
            {
                message.post.title ?
                    <p>Re: {message.post.title}</p> :
                    null
            }
            <p>{message.content}</p>
        </div>
    );
};

export default MessageCard;