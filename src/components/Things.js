import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import "../things.css"

const Things = ({ APIURL, userToken }) => {
    const [ postData, setPostData ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        } else {
            const getPostData = async() => {
                try {
                    const response = await fetch(`${APIURL}/posts`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${userToken}`
                        }
                    });
                    const result = await response.json();
                    if (result.success) {
                        setPostData(result.data.posts);
                    };
                } catch (error) {
                    console.error("Something went wrong!", error);
                };
            };
            getPostData();
        };
    }, []);

    return (
        <>
            <button onClick={() => navigate("/newpost")}>Create Post</button>
            <div className="post-container">{
                postData.map((post) => {
                    if (post.active) {
                        return <PostCard key={post._id} post={post} />
                    };
                })
            }</div>
        </>
    );
};

export default Things;