import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = ({ APIURL, userToken }) => {
    const [ titleInput, setTitleInput ] = useState('');
    const [ descriptionInput, setDescriptionInput ] = useState('');
    const [ priceInput, setPriceInput ] = useState('');
    const [ locationInput, setLocationInput ] = useState('');
    const [ willDeliverInput, setWillDeliverInput ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title*:</label>
            <input
                name="title"
                value={titleInput}
                maxLength="100"
                required
                onChange={(event) => setTitleInput(event.target.value)} />
            <label htmlFor="description">Description*:</label>
            <input
                name="description"
                value={descriptionInput}
                maxLength="200"
                required
                onChange={(event) => setDescriptionInput(event.target.value)} />
            <label htmlFor="price">Price*:</label>
            <input
                type="number"
                name="price"
                value={priceInput}
                required
                onChange={(event) => setPriceInput(event.target.value.toString())} />
            <label htmlFor="location">Location (leave blank for on request):</label>
            <input
                name="location"
                value={locationInput}
                maxLength="100"
                onChange={(event) => setLocationInput(event.target.value)} />
            <label htmlFor="will-deliver">Will Deliver?</label>
            <input
                type="checkbox"
                name="will-deliver"
                onChange={() => {
                    setWillDeliverInput(!willDeliverInput)
                }} />
            <button type="submit">Post your Thing!</button>
        </form>
    );
};

export default NewPost;