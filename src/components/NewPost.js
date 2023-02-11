import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";

const NewPost = ({ APIURL, getPostData }) => {
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [willDeliverInput, setWillDeliverInput] = useState(false);

    const navigate = useNavigate();

    const createNewPost = async (event) => {
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
                    getPostData();
                    navigate("/things");
                };
            } catch (error) {
                console.error("Something went wrong!", error);
            };
        };
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& .MuiTextField-root, & .MuiButton-root": { m: .75 },
                "& .MuiTextField-root": { width: "500px" }
            }}
            onSubmit={createNewPost}>
            <TextField
                label="Title"
                value={titleInput}
                maxLength="100"
                required
                onChange={(event) => setTitleInput(event.target.value)} />
            <TextField
                label="Description"
                value={descriptionInput}
                maxLength="250"
                required
                multiline
                rows={4}
                onChange={(event) => setDescriptionInput(event.target.value)} />
            <TextField
                label="Price"
                value={priceInput}
                required
                onChange={(event) => setPriceInput(event.target.value)} />
            <TextField
                label="Location"
                value={locationInput}
                maxLength="100"
                helperText="Leave blank for [On Request]"
                onChange={(event) => setLocationInput(event.target.value)} />
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Will Deliver" />
            </FormGroup>
            <Button type="submit" variant="contained">Post Your Thing!</Button>
        </Box>
    );
};

export default NewPost;