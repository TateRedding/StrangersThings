import React from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { ThemeProvider } from "@mui/material/styles";

const MessageCard = ({ message, loggedInUserId, postData, theme }) => {

    const navigate = useNavigate();

    const isThingActive = (postId) => {
        if (postData) {
            const post = postData.filter((post) => post._id === postId)[0];
            if (post && post.active) {
                return true;
            }
        }
        return false;
    };

    return (
        <Card
            className="message-card"
            sx={{
                mt: 1,
                mb: 1,
                width: "60vw"
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
                    <ThemeProvider theme={theme}>
                        {
                            isThingActive(message.post._id) ?
                                <Button variant="outlined" color="primaryDark" onClick={() => navigate(`/things/${message.post._id}`)}>View Thing</Button> :
                                null
                        }
                    </ThemeProvider>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default MessageCard;