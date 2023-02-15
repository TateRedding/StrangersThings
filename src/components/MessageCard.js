import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const MessageCard = ({ message }) => {
    return (
        <Card
            sx={{
                mt: 1,
                mb: 1,
                width: "60vw"
            }}>
            <CardContent>
                <h3>From: {message.fromUser.username}</h3>
                <p>{message.content}</p>
            </CardContent>
        </Card>
    );
};

export default MessageCard;