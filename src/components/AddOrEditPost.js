import React from "react";
import { useParams } from "react-router-dom";
import EditPost from "./EditPost";
import NewPost from "./NewPost";

const AddOrEditPost = ({ APIURL, postData, getPostData }) => {
    const { postId } = useParams();

    return (
        <>{
            postId ?
                <EditPost APIURL={APIURL} post={postData.filter((post) => post._id === postId)[0]} getPostData={getPostData} /> :
                <NewPost APIURL={APIURL} getPostData={getPostData} />
        }</>
    )

};

export default AddOrEditPost;