import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageCard from "./MessageCard";
import "../profile.css"

const Profile = ({ APIURL, isLoggedIn }) => {
    const [ userData, setUserData ] = useState({});
    const [ inbox, setInbox ] = useState([]);
    const [ sentMessages, setSentMessages ] = useState([]);

    useEffect(() => {
        const getUserData = async() => {
            try {
                const response = await fetch(`${APIURL}/users/me`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${window.localStorage.getItem('strangers-things-token')}`
                    }
                });
                const result = await response.json();
                if (result.success) {
                    setUserData(result.data);
                    setInbox(result.data.messages.filter((message) => message.fromUser._id !== result.data._id));
                    setSentMessages(result.data.messages.filter((message) => message.fromUser._id === result.data._id));
                };
            } catch (error) {
                console.error("Something went wrong!", error);
            };
        };
        getUserData();
    }, []);

    return (
        <div className="messages">
            <div className="message-container">
                <h2>{userData.username}</h2>
                <h3>Inbox</h3>
                    {
                        (Object.keys(userData).length > 0 && inbox.length > 0) ?
                            inbox.map((message) => <MessageCard key={message._id} message={message} loggedInUserId={userData._id} />) :
                            <h3>No messages to display!</h3>
                    }
            </div>
            <div className="message-container">
                <h3>Sent</h3>
                    {
                        (Object.keys(userData).length > 0 && sentMessages.length > 0) ?
                            sentMessages.map((message) => <MessageCard key={message._id} message={message} loggedInUserId={userData._id} />) :
                            <h3>No messages to display!</h3>
                    }
            </div>
        </div>
    );
};

export default Profile;