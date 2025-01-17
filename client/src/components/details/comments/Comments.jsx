import { useState, useEffect, useContext } from "react";
import { Box, TextareaAutosize, Button, styled, CircularProgress, Typography} from "@mui/material";

import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

//components
import Comment from "./Comment";

const Container = styled(Box)`
    margin-top: 50px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
`;

const Image = styled("img")({
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%;
    margin: 0 20px;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    border: 1px solid #ddd;
    &:focus {
        outline: none;
        border-color: #4caf50;
    }
`;

const PostButton = styled(Button)`
    height: 40px;
    font-size: 16px;
`;

const LoadingIndicator = styled(CircularProgress)`
    display: block;
    margin: 20px auto;
`;

const initialValue = {
    name: "",
    postId: "",
    date: new Date(),
    comments: "",
};

const Comments = ({ post }) => {
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const { account } = useContext(DataContext);

    const defaultImageUrl =
        "https://static.thenounproject.com/png/12017-200.png"; // Default profile image

    // Fetch comments when the component is mounted or when toggle changes
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
            setLoading(false);
        };
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value,
        });
    };

    const addComment = async () => {
        setLoading(true);
        await API.newComment(comment);
        setComment(initialValue);
        setToggle((prev) => !prev); // Trigger re-fetch of comments
        setLoading(false);
    };

    return (
        <Box>
            <Container>
                <Image src={defaultImageUrl} alt="profile" />
                <StyledTextArea
                    rowsMin={5}
                    placeholder="What's on your mind?"
                    onChange={handleChange}
                    value={comment.comments}
                />
                <PostButton
                    variant="contained"
                    color="primary"
                    onClick={addComment}
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Post"}
                </PostButton>
            </Container>

            {loading ? (
                <LoadingIndicator />
            ) : (
                <Box mt={2}>
                    {comments && comments.length > 0 ? (
                        comments.map((comment) => (
                            <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No comments yet. Be the first to comment!
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Comments;
