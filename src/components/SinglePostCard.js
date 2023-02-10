import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PostDetails from "./PostDetails";
import TextField from "@mui/material/TextField"

const SinglePostCard = ({ APIURL, isLoggedIn, post, deletePost }) => {
    const [ messageInput, setMessageInput ] = useState('');

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
                    setMessageInput('');
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
                {
                    post.isAuthor ?
                    <>
                        <Button variant="outlined" onClick={() => navigate(`/edit/${post._id}`)}>Edit</Button>
                        <Button variant="outlined" color="error" onClick={() => deletePost(post._id)}>Delete</Button>
                        <Button variant="outlined" onClick={() => navigate("/things")}>Back</Button>
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
                                    onChange={(event) => setMessageInput(event.target.value)} />
                                <Button type="submit">Send</Button>
                                <Button variant="outlined" onClick={() => navigate("/things")}>Back</Button>
                            </Box> :
                            <Box>
                                <p>Log in to message this seller!</p>
                                <Button variant="outlined" onClick={() => navigate("/things")}>Back</Button>
                            </Box>
                }
            </CardActions>
        </Card>
    );
};

export default SinglePostCard;