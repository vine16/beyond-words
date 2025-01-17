import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as AddIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const PostContainer = styled(Box)(({ theme }) => ({
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
    font-size: 22px;
    border-bottom: 1px solid #ccc;
`;

const StoryTextarea = styled(TextareaAutosize)`
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

const defaultPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [postDetails, setPostDetails] = useState(defaultPost);
    const [selectedFile, setSelectedFile] = useState('');
    const { account } = useContext(DataContext);

    const placeholderImage =
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const imageSrc = postDetails.picture || placeholderImage;

    useEffect(() => {
        const uploadImage = async () => {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('name', selectedFile.name);
                formData.append('file', selectedFile);

                const response = await API.uploadFile(formData);
                setPostDetails((prevPost) => ({ ...prevPost, picture: response.data }));
            }
        };

        uploadImage();
        const category = location.search?.split('=')[1] || 'All';
        setPostDetails((prevPost) => ({
            ...prevPost,
            categories: category,
            username: account.username,
        }));
    }, [selectedFile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostDetails((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleSavePost = async () => {
        await API.createPost(postDetails);
        navigate('/');
    };

    return (
        <PostContainer>
            <BannerImage src={imageSrc} alt="Post banner" />

            <FormWrapper>
                <label htmlFor="uploadFile">
                    <AddIcon fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="uploadFile"
                    style={{ display: 'none' }}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <TitleInput
                    name="title"
                    placeholder="Enter your title here"
                    onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" onClick={handleSavePost}>
                    Publish
                </Button>
            </FormWrapper>

            <StoryTextarea
                minRows={5}
                placeholder="Write your story here..."
                name="description"
                onChange={handleInputChange}
            />
        </PostContainer>
    );
};

export default CreatePost;
