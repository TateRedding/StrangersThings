import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Alert from '@mui/material/Alert';
import PostDetails from "./PostDetails";
import Snackbar from '@mui/material/Snackbar';
import TextField from "@mui/material/TextField"
import { ThemeProvider } from "@mui/material/styles";

const SinglePostCard = ({ APIURL, isLoggedIn, post, deletePost, theme }) => {
    const [messageInput, setMessageInput] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    const sendMessage = async (event) => {
        event.preventDefault();
        if (messageInput) {
            try {
                const response = await fetch(`${APIURL}/posts/${post._id}/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${window.localStorage.getItem('strangers-things-token')}`
                    },
                    body: JSON.stringify({
                        message: { content: messageInput }
                    })
                });
                const result = await response.json();
                if (result.success) {
                    setShowSuccessMessage(true);
                    setMessageInput('');
                } else {
                    setShowErrorMessage(true);
                };
            } catch (error) {
                console.error("Something went wrong!", error);
            };
        };
    };

    return (
        <Card sx={{
            m: 1,
            minWidth: "60vw",
            "& .MuiTextField-root, & .MuiButton-root": { m: .75 },
            "& .MuiTextField-root": { width: "100%" }
        }}>
            <CardContent>
                <PostDetails post={post} />
            </CardContent>
            <CardActions>
                <ThemeProvider theme={theme}>
                    {
                        post.isAuthor ?
                            <>
                                <Button variant="outlined" color="primaryDark" onClick={() => navigate(`/edit/${post._id}`)}>Edit</Button>
                                <Button variant="outlined" color="error" onClick={() => deletePost(post._id)}>Delete</Button>
                                <Button variant="outlined" color="primaryDark" onClick={() => history.back()}>Back</Button>
                            </> :
                            isLoggedIn ?
                                <Box
                                    sx={{
                                        width: "80%"
                                    }}
                                    component="form"
                                    autoComplete="off"
                                    onSubmit={sendMessage}>
                                    <TextField
                                        value={messageInput}
                                        placeholder={`Message ${post.author.username}`}
                                        maxLength="500"
                                        required
                                        multiline
                                        color="primaryDark"
                                        onChange={(event) => setMessageInput(event.target.value)} />
                                    <Button type="submit" color="primaryDark">Send</Button>
                                    <Snackbar
                                        open={showSuccessMessage}
                                        autoHideDuration={6000}
                                        onClose={() => setShowSuccessMessage(false)} >
                                        <Alert variant="filled" severity="success">Message Sent!</Alert>
                                    </Snackbar>
                                    <Snackbar
                                        open={showErrorMessage}
                                        autoHideDuration={6000}
                                        onClose={() => setShowErrorMessage(false)} >
                                        <Alert variant="filled" severity="error">Something went wrong! Try sending again.</Alert>
                                    </Snackbar>
                                    <Button variant="outlined" color="primaryDark" onClick={() => history.back()}>Back</Button>
                                </Box> :
                                <Box>
                                    <p>Log in to message this seller!</p>
                                    <Button variant="outlined" color="primaryDark" onClick={() => history.back()}>Back</Button>
                                </Box>
                    }
                </ThemeProvider>
            </CardActions>
        </Card>
    );
};

export default SinglePostCard;