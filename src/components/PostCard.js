import React from "react";

const PostCard = ({ post, APIURL, getPostData }) => {

    const deletePost = async () => {
        try {
            await fetch(`${APIURL}/posts/${post._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem('strangers-things-token')}`
                }
            });
            getPostData();
        } catch (error) {
            console.error("Something went wrong!", error);
        };
    };

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
                            <button onClick={deletePost}>Delete</button>
                        </>
                    ) :
                    (
                        <button>View Thing</button>
                    )
            }</div>
        </div>
    );
};

export default PostCard;