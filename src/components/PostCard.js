import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PostDetails from "./PostDetails";
import { ThemeProvider } from "@mui/material/styles";


const PostCard = ({ post, deletePost, theme }) => {
    const navigate = useNavigate();
    return (
        <Card sx={{
            mt: 1,
            mb: 1,
            minWidth: "60vw"
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
                            </> :
                            null
                    }
                    <Button variant="outlined" color="primaryDark" onClick={() => navigate(`/things/${post._id}`)}>View Thing</Button>
                </ThemeProvider>
            </CardActions>
        </Card>
    );
};

export default PostCard;