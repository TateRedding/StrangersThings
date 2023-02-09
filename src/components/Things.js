import React from "react";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import "../things.css"

const Things = ({ APIURL, isLoggedIn, postData, deletePost}) => {
    return (
            <>
                {
                    isLoggedIn ?
                        <Link to="/newpost">Create Post</Link> :
                    null
                } 
                <div className="post-container">{
                    postData.map((post) => {
                        if (post.active) {
                            return <PostCard key={post._id} APIURL={APIURL} post={post} deletePost={deletePost} />
                        };
                    })
                }</div>
            </>
    );
};

export default Things;