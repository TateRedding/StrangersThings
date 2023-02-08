import React, { useEffect, useState } from "react";

const EditPost = ({ post }) => {
    const [ titleInput, setTitleInput ] = useState('');
    const [ descriptionInput, setDescriptionInput ] = useState('');
    const [ priceInput, setPriceInput ] = useState('');
    const [ locationInput, setLocationInput ] = useState('');
    const [ willDeliverInput, setWillDeliverInput ] = useState('');

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
        // create new object
        // send to API
        // go back to thing view
    };
    
    return (
        <>
            <p>Leaving a box blank will not change that detail</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    name="title"
                    value={titleInput}
                    maxLength="100"
                    onChange={(event) => setTitleInput(event.target.value)} />
                <label htmlFor="description">Description:</label>
                <input
                    name="description"
                    value={descriptionInput}
                    maxLength="200"
                    onChange={(event) => setDescriptionInput(event.target.value)} />
                <label htmlFor="price">Price:</label>
                <input
                    name="price"
                    value={priceInput}
                    onChange={(event) => setPriceInput(event.target.value)} />
                <label htmlFor="location">Location:</label>
                <input
                    name="location"
                    value={locationInput}
                    maxLength="100"
                    onChange={(event) => setLocationInput(event.target.value)} />
                <label htmlFor="will-deliver">Will Deliver?</label>
                <input
                    type="checkbox"
                    name="will-deliver"
                    checked={willDeliverInput}
                    onChange={() => {
                        setWillDeliverInput(!willDeliverInput)
                    }} />
                <button type="submit">Update</button>
            </form>
        </>
    );
};

export default EditPost;