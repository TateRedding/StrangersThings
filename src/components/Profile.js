import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ APIURL, userToken }) => {
    const [ userData, setUserData ] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        } else {
            const getUserData = async() => {
                try {
                    const response = await fetch(`${APIURL}/users/me`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${userToken}`
                        }
                    });
                    const result = await response.json();
                    if (result.success) {
                        setUserData(result);
                    };
                } catch (error) {
                    console.error("Something went wrong!", error);
                };
            };
        getUserData();
        };
    }, []);

    return (
        <>
            <div className="messages-container">
                <h3>Inbox</h3>
                {/* map thorough userData.data.messages and create message cards */}
            </div>
            <div className="messages-container">
                <h3>Sent</h3>
                {/* map thorough userData.data.messages and create message cards */}
            </div>
        </>
    );
};

export default Profile;