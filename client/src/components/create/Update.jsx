import React, { useState, useEffect } from 'react';
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as AddIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '40px 80px',
    [theme.breakpoints.down('md')]: {
        margin: '20px',
    },
}));

const BannerImage = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const FormWrapper = styled(FormControl)`
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const TitleInput = styled(InputBase)`
    flex-grow: 1;
    margin: 0 20px;
    font-size: 24px;
    border-bottom: 1px solid #ccc;
`;

const DescriptionTextarea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 30px;
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    &:focus-visible {
        outline: 2px solid #3f51b5;
    }
`;

const placeholderImage =
    'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

const defaultPost = {
    title: '',
    description: '',
    picture: '',
    username: 'nehabhatt',
    categories: 'Tech',
    createdDate: new Date(),
};

const UpdatePost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [postDetails, setPostDetails] = useState(defaultPost);
    const [selectedFile, setSelectedFile] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const response = await API.getPostById(id);
            if (response.isSuccess) {
                setPostDetails(response.data);
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        const uploadImage = async () => {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('name', selectedFile.name);
                formData.append('file', selectedFile);

                const response = await API.uploadFile(formData);
                if (response.isSuccess) {
                    setPostDetails((prevDetails) => ({
                        ...prevDetails,
                        picture: response.data,
                    }));
                    setImagePreview(response.data);
                }
            }
        };
        uploadImage();
    }, [selectedFile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const updatePost = async () => {
        await API.updatePost(postDetails);
        navigate(`/details/${id}`);
    };

    return (
        <Wrapper>
            <BannerImage src={postDetails.picture || placeholderImage} alt="Banner" />

            <FormWrapper>
                <label htmlFor="fileInput">
                    <AddIcon fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <TitleInput
                    name="title"
                    placeholder="Enter post title"
                    value={postDetails.title}
                    onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" onClick={updatePost}>
                    Update
                </Button>
            </FormWrapper>

            <DescriptionTextarea
                name="description"
                minRows={5}
                placeholder="Share your thoughts..."
                value={postDetails.description}
                onChange={handleInputChange}
            />
        </Wrapper>
    );
};

export default UpdatePost;
