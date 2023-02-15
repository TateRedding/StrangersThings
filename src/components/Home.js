import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";

const Home = ({ postData, theme }) => {
    const [post, setPost] = useState({});

    useEffect(() => {
        if (postData.length) {
            const index = Math.floor(Math.random() * postData.length);
            setPost(postData[index]);
        };
    }, [postData]);

    return (
        <>
            <h1>Welcome to Stranger's Things!</h1>
            <h3>Buy or sell all the random Things around your home!</h3>
            <p>Check out this post now!</p>
            {
                (Object.keys(post).length) ?
                    <PostCard post={post} theme={theme} />:
                    null
            }
        </>
    );
};

export default Home;