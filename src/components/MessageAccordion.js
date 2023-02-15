import React from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const MessageAccordion = ({ message, loggedInUserId, postData, theme }) => {
    const navigate = useNavigate();
    return (
        <Accordion sx={{ width: "60vw" }} >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                {
                    loggedInUserId === message.fromUser._id ?
                        <Typography sx={{ width: "33%" }}>- Sent by me -</Typography> :
                        <Typography sx={{ width: "33%" }}>From: {message.fromUser.username}</Typography>
                }
                <Typography sx={{ color: "text.secondary" }}>Re: {message.post.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <p>{message.content}</p>
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" color="primaryDark" onClick={() => navigate(`/things/${message.post._id}`)}>View Thing</Button>
                </ThemeProvider>
            </AccordionDetails>
        </Accordion>
    );
};

export default MessageAccordion;