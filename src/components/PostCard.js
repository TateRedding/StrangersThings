import React from "react";

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>Location: {post.location}</p>
            <p>Will deliver? {post.willDeliver ? "Yes" : "No"}</p>
            <div className="buttons">{
                post.isAuthor ?
                    (
                        <>
                            <button>Edit</button>
                            <button>Delete</button>
                        </>
                    ) :
                    (
                        <button>Send Message</button>
                    )
            }</div>
        </div>
    );
};

export default PostCard;