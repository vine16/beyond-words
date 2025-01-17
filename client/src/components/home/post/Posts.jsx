import { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';

//components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                let response = await API.getAllPosts({ category: category || '' });
                if (response.isSuccess) {
                    setPosts(response.data);
                } else {
                    setError('Failed to fetch posts');
                }
            } catch (error) {
                setError('Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category]);

    // Loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                {error}
            </Box>
        );
    }

    // No posts available
    if (posts?.length === 0) {
        return (
            <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                No data is available for the selected category.
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {posts.map(post => (
                <Grid item lg={3} sm={4} xs={12} key={post._id}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                        <Post post={post} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
