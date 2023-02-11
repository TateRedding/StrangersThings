import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PostDetails from "./PostDetails";


const PostCard = ({ post, deletePost }) => {
    const navigate = useNavigate();
    return (
        <Card sx={{
            m: 3,
            minWidth: "60vw"
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
                        </> :
                        null
                }
                <Button variant="outlined" onClick={() => navigate(`/things/${post._id}`)}>View Thing</Button>
            </CardActions>
        </Card>
    );
};

export default PostCard;