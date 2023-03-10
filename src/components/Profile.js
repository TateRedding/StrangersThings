import React, { useState, useEffect } from "react";
import MessageAccordion from "./MessageAccordion";

const Profile = ({ APIURL, postData, theme }) => {
    const [userData, setUserData] = useState({});
    const [inbox, setInbox] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);

    const isThingActive = (postId) => {
        if (postData) {
            const post = postData.filter((post) => post._id === postId)[0];
            if (post && post.active) {
                return true;
            };
        };
        return false;
    };

    useEffect(() => {
        const getUserData = async () => {
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
        <div className="profile">
            <h2>{userData.username}</h2>
            {
                (Object.keys(userData).length) ?
                    <div className="message-container">
                        <h3>Inbox</h3>
                        {
                            (Object.keys(userData).length && inbox.length) ?
                                inbox.map((message) => {
                                    return (
                                        isThingActive(message.post._id) ?
                                            <MessageAccordion
                                                key={message._id}
                                                message={message}
                                                loggedInUserId={userData._id}
                                                postData={postData}
                                                theme={theme} /> :
                                            null
                                    );
                                }) :
                                <p>No messages to display!</p>
                        }
                        <h3>Sent</h3>
                        {
                            (Object.keys(userData).length && sentMessages.length) ?
                                sentMessages.map((message) => {
                                    return (
                                        isThingActive(message.post._id) ?
                                            <MessageAccordion
                                                key={message._id}
                                                message={message}
                                                loggedInUserId={userData._id}
                                                postData={postData}
                                                theme={theme} /> :
                                            null
                                    );
                                }) :
                                <p>No messages to display!</p>
                        }
                    </div> :
                    <h3>Loading messages...</h3>
            }

        </div>
    );
};

export default Profile;