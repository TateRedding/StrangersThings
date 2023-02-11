import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePostCard from "./SinglePostCard";
import MessageCard from "./MessageCard";

const SinglePost = ({ APIURL, isLoggedIn, postData, deletePost }) => {
    const [ post, setPost ] = useState({});

    const { postId } = useParams();

    useEffect(() => {
        if (postData.length) {
            setPost(postData.filter((post) => post._id === postId)[0]);
        }
    }, [postData]);

    return (
        <div className="single-post-container">
            {
                post && Object.keys(post).length ?
                    <SinglePostCard APIURL={APIURL} isLoggedIn={isLoggedIn} post={post} deletePost={deletePost} /> :
                    null
            }
            {
                post.isAuthor ?
                    <div className="single-post-messages">
                        {
                            post.messages.length ?
                                post.messages.map((message) => <MessageCard key={message._id} message={message} /> ) :
                                <p>No messages about this post.</p>
                        }
                    </div> :
                    null
            }
        </div>
    );
};

export default SinglePost;