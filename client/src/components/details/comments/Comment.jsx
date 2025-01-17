import React, { useContext } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { API } from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";

const CommentWrapper = styled(Box)`
    margin-top: 30px;
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
`;

const CommentHeader = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const AuthorName = styled(Typography)`
    font-weight: 600;
    font-size: 16px;
    margin-right: 20px;
`;

const CommentDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteButton = styled(Delete)`
    margin-left: auto;
    cursor: pointer;
    color: #f44336;

    &:hover {
        color: #d32f2f;
    }
`;

const CommentText = styled(Typography)`
    font-size: 14px;
    line-height: 1.5;
    color: #333;
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);

    const handleDelete = async () => {
        await API.deleteComment(comment._id);
        setToggle((prev) => !prev);
    };

    return (
        <CommentWrapper>
            <CommentHeader>
                <AuthorName>{comment.name}</AuthorName>
                <CommentDate>{new Date(comment.date).toDateString()}</CommentDate>
                {comment.name === account.username && (
                    <DeleteButton onClick={handleDelete} />
                )}
            </CommentHeader>
            <CommentText>{comment.comments}</CommentText>
        </CommentWrapper>
    );
};

export default Comment;
