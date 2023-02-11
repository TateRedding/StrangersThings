import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const MessageCard = ({ message, loggedInUserId, postData }) => {

    const navigate = useNavigate();

    const isThingActive = (postId) => {
        const post = postData.filter((post) => post._id === postId)[0];
        if (post && post.active) {
            return true;
        }
        return false;
    };

    return (
        <Card
            className="message-card"
            sx={{
                m: 3,
                minWidth: "60vw"
            }}>
            <CardContent>
                {
                    loggedInUserId === message.fromUser._id ?
                        <h3>- Sent by me -</h3> :
                        <h3>From: {message.fromUser.username}</h3>
                }
                {
                    message.post.title ?
                        <>
                            <h3>Re: {message.post.title}</h3>
                            {
                                isThingActive(message.post._id) ?
                                    null :
                                    <p className="warning">This Thing is no longer active!</p>
                            }
                        </> :
                        null
                }
                <p>{message.content}</p>
                <CardActions>
                    {
                        isThingActive(message.post._id) ?
                            <Button variant="outlined" onClick={() => navigate(`/things/${message.post._id}`)}>View Thing</Button> :
                            null
                    }
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default MessageCard;