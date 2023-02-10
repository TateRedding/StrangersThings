import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const MessageCard = ({ message, loggedInUserId, postData }) => {

    const isThingActive = (postId) => {
        const post = postData.filter((post) => post._id === postId)[0];
        if (post && post.active) {
            return true;
        }
        return false;
    };

    return (
        <Card sx={{
            m: 1,
            minWidth: "60vw"
        }}>
            <CardContent>
                {
                    loggedInUserId === message.fromUser._id ?
                        <Typography>- Sent by me -</Typography> :
                        <Typography variant="h6">From: {message.fromUser.username}</Typography>
                }
                {
                    message.post.title ?
                        <Typography variant="h5" sx={{
                            mb: 1,
                            mt: 1
                        }}>Re: {message.post.title} {
                            isThingActive(message.post._id) ?
                                null :
                                <Typography color="red">This Thing is no longer active!</Typography>
                        }</Typography> :
                        null
                }
            <p>{message.content}</p>
            </CardContent>
        </Card>
    );
};

export default MessageCard;