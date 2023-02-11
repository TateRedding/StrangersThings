import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PostDetails from "./PostDetails";

const Home = ({ postData }) => {
    const [post, setPost] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (postData.length) {
            const index = Math.floor(Math.random() * postData.length);
            setPost(postData[index]);
        };
    }, [postData]);


    return (
        <>
            <h1>Welcome to Stranger's Things!</h1>
            <h3>Buy or sell all the random Things around your home!</h3>
            <p>Check out this post now!</p>
            {
                (Object.keys(post).length) ?
                    <Card sx={{
                        m: 3,
                        minWidth: "60vw"
                    }}>
                        <CardContent>
                            <PostDetails post={post} />
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" onClick={() => navigate(`/things/${post._id}`)}>View Thing</Button>
                        </CardActions>
                    </Card> :
                    null
            }
        </>
    );
};

export default Home;