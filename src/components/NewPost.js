import React, { useState } from "react";

const NewPost = ({ APIURL }) => {
    const [ titleInput, setTitleInput ] = useState('');
    const [ descriptionInput, setDescriptionInput ] = useState('');
    const [ priceInput, setPriceInput ] = useState('');
    const [ locationInput, setLocationInput ] = useState('');
    const [ willDeliverInput, setWillDeliverInput ] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (titleInput && descriptionInput && priceInput) {
            const postObject = {
                title: titleInput,
                description: descriptionInput,
                price: priceInput,
            };
            if (locationInput) {
                postObject.location = locationInput;
            };
            if (willDeliverInput) {
                postObject.willDeliver = willDeliverInput;
            }
            try {
                const response = await fetch(`${APIURL}/posts`, {
                    method: "POST",
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
                    navigate("/things");
                };
            } catch (error) {
                console.error("Something went wrong!", error);
            };
        };
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
                name="price"
                value={priceInput}
                required
                onChange={(event) => setPriceInput(event.target.value)} />
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
                checked={willDeliverInput}
                onChange={() => {
                    setWillDeliverInput(!willDeliverInput)
                }} />
            <button type="submit">Post your Thing!</button>
        </form>
    );
};

export default NewPost;