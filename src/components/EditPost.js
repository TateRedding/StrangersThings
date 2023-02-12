import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";

const EditPost = ({ APIURL, postData, getPostData, theme }) => {
    const [post, setPost] = useState({});
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [willDeliverInput, setWillDeliverInput] = useState(false);

    const navigate = useNavigate();

    const { postId } = useParams();

    useEffect(() => {
        if (postData) {
            setPost(postData.filter((post) => post._id === postId)[0]);
        };
    }, [postData]);

    useEffect(() => {
        if (post && Object.keys(post).length) {
            setTitleInput(post.title);
            setDescriptionInput(post.description);
            setPriceInput(post.price);
            setLocationInput(post.location);
            setWillDeliverInput(post.willDeliver);
        };
    }, [post]);

    const updatePost = async (event) => {
        event.preventDefault();
        if (!post) {
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
        if (willDeliverInput !== post.willDeliver) {
            postObject.willDeliver = willDeliverInput;
        };
        if (Object.keys(postObject).length) {
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
            <p>Leaving a box blank will result in no change to respective detail.</p>
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
                onSubmit={updatePost}>
                <ThemeProvider theme={theme}>
                    <TextField
                        label="Title"
                        value={titleInput}
                        maxLength="100"
                        color="primaryDark"
                        onChange={(event) => setTitleInput(event.target.value)} />
                    <TextField
                        label="Description"
                        value={descriptionInput}
                        maxLength="250"
                        multiline
                        rows={4}
                        color="primaryDark"
                        onChange={(event) => setDescriptionInput(event.target.value)} />
                    <TextField
                        label="Price"
                        value={priceInput}
                        color="primaryDark"
                        onChange={(event) => setPriceInput(event.target.value)} />
                    <TextField
                        label="Location"
                        value={locationInput}
                        maxLength="100"
                        color="primaryDark"
                        helperText="Leave blank for [On Request]"
                        onChange={(event) => setLocationInput(event.target.value)} />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox color="primaryDark"/>} label="Will Deliver" />
                    </FormGroup>
                    <Button type="submit" variant="contained" color="primaryLight">Update Thing</Button>
                </ThemeProvider>
            </Box>
        </>
    );
};

export default EditPost;