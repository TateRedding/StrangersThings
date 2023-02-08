import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = ({ APIURL, postData, getPostData }) => {
    const [ post, setPost ] = useState({});
    const [ titleInput, setTitleInput ] = useState('');
    const [ descriptionInput, setDescriptionInput ] = useState('');
    const [ priceInput, setPriceInput ] = useState('');
    const [ locationInput, setLocationInput ] = useState('');
    const [ willDeliverInput, setWillDeliverInput ] = useState('');

    const navigate = useNavigate();

    const { postId } = useParams();

    useEffect(() => {
        if (postData !== undefined) {
            setPost(postData.filter((post) => post._id === postId)[0]);
        }
    }, [postData]);
    
    useEffect(() => {
        if (post !== undefined) {
            setTitleInput(post.title);
            setDescriptionInput(post.description);
            setPriceInput(post.price);
            setLocationInput(post.location);
            setWillDeliverInput(post.willDeliver);
        };
    }, [post]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (post === undefined) {
            return;
        };
        const postObject = {};
        if (titleInput && titleInput !== post.title) {
            postObject.title = titleInput;
        };
        if (descriptionInput && descriptionInput !== post.description) {
            postObject.description = descriptionInput;
        };
        if (priceInput && priceInput !== post.price) {
            postObject.price = priceInput;
        };
        if (locationInput && locationInput !== post.location) {
            postObject.location = locationInput;
        };
        if (willDeliverInput && willDeliverInput !== post.willDeliver) {
            postObject.willDeliver = willDeliverInput;
        };
        if (Object.keys(postObject).length !== 0) {
            try {
                const response = await fetch(`${APIURL}/posts/${postId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${window.localStorage.getItem('strangers-things-token')}`
                    },
                    body: JSON.stringify({
                        post: postObject
                    })
                });
                const result = await response.json();
                if (result.success) {
                    setTitleInput('');
                    setDescriptionInput('');
                    setPriceInput('');
                    setLocationInput('');
                    setWillDeliverInput(false);
                    getPostData();
                    navigate(`/things/${postId}`);
                }
            } catch (error) {
                console.error("Something went wrong!", error);
            };
        };
    };
    
    return (
        <>
            <p>Leaving a box blank will leave detail unchanged</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    name="title"
                    value={titleInput || ''}
                    maxLength="100"
                    onChange={(event) => setTitleInput(event.target.value)} />
                <label htmlFor="description">Description:</label>
                <input
                    name="description"
                    value={descriptionInput || ''}
                    maxLength="200"
                    onChange={(event) => setDescriptionInput(event.target.value)} />
                <label htmlFor="price">Price:</label>
                <input
                    name="price"
                    value={priceInput || ''}
                    onChange={(event) => setPriceInput(event.target.value)} />
                <label htmlFor="location">Location:</label>
                <input
                    name="location"
                    value={locationInput || ''}
                    maxLength="100"
                    onChange={(event) => setLocationInput(event.target.value)} />
                <label htmlFor="will-deliver">Will Deliver?</label>
                <input
                    type="checkbox"
                    name="will-deliver"
                    checked={willDeliverInput || false}
                    onChange={() => {
                        setWillDeliverInput(!willDeliverInput)
                    }} />
                <button type="submit">Update</button>
            </form>
        </>
    );
};

export default EditPost;