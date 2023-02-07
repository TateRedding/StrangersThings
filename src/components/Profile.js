import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ APIURL, userToken }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        };
    }, []);

    return (
        <p>{userToken}</p>
    );
};

export default Profile;