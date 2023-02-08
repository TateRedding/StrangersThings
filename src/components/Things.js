import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import "../things.css"

const Things = ({ isLoggedIn, postData, deletePost}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);

    return (
            <>
                <Link to="/newpost">Create Post</Link>
                <div className="post-container">{
                    postData.map((post) => {
                        if (post.active) {
                            return <PostCard key={post._id} post={post} deletePost={deletePost} />
                        };
                    })
                }</div>
            </>
    );
};

export default Things;