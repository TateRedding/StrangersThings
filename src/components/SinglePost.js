import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import MessageCard from "./MessageCard";

const SinglePost = ({ APIURL, postData, deletePost }) => {
    const [ post, setPost ] = useState({});

    const { postId } = useParams();

    useEffect(() => {
        if (postData.length > 0) {
            setPost(postData.filter((post) => post._id === postId)[0]);
        }
    }, [postData]);

    return (
        <div className="single-post-container">
            {
                post !== undefined && Object.keys(post).length > 0 ?
                    <PostCard APIURL={APIURL} post={post} deletePost={deletePost} /> :
                    null
            }
            {
                post.isAuthor ?
                    <>
                        <p>Messages about this post</p>
                        {
                            post.messages.map((message) => <MessageCard key={message._id} message={message} /> )
                        }
                    </> :
                    null
            }
        </div>
    );
};

export default SinglePost;