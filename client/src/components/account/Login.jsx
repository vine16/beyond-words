import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)`
    width: 400px;
    margin: 0 auto;
    box-shadow: 5px 2px 5px 2px rgba(0, 0, 0, 0.6);
`;

const Logo = styled('img')({
    width: 100,
    margin: '50px auto 0',
    display: 'block',
    paddingBottom: '10px'
});

const FormWrapper = styled(Box)`
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PrimaryButton = styled(Button)`
    background-color: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 4px;
    text-transform: none;
`;

const SecondaryButton = styled(Button)`
    background-color: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    text-transform: none;
`;

const InfoText = styled(Typography)`
    font-size: 12px;
    color: #878787;
`;

const ErrorMessage = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    font-weight: 600;
    margin-top: 5px;
`;

const initialLoginState = { username: '', password: '' };
const initialSignupState = { name: '', username: '', password: '' };

const Login = ({ isUserAuthenticated }) => {
    const [loginDetails, setLoginDetails] = useState(initialLoginState);
    const [signupDetails, setSignupDetails] = useState(initialSignupState);
    const [activeView, setActiveView] = useState('login');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const logoURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzbN7fmnn7cl_F-bE-ZoSdHA5pE3MgWnDyxg&s';

    useEffect(() => {
        setError('');
    }, [loginDetails]);

    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        type === 'login'
            ? setLoginDetails({ ...loginDetails, [name]: value })
            : setSignupDetails({ ...signupDetails, [name]: value });
    };

    const handleLogin = async () => {
        const response = await API.userLogin(loginDetails);
        if (response.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true);
            setLoginDetails(initialLoginState);
            navigate('/');
        } else {
            setError('Login failed! Please try again.');
        }
    };

    const handleSignup = async () => {
        const response = await API.userSignup(signupDetails);
        if (response.isSuccess) {
            setError('');
            setSignupDetails(initialSignupState);
            setActiveView('login');
        } else {
            setError('Signup failed! Please try again.');
        }
    };

    const toggleView = () => {
        setActiveView((prev) => (prev === 'login' ? 'signup' : 'login'));
    };

    return (
        <Container>
            <Box>
                <Logo src={logoURL} alt="App Logo" />
                {activeView === 'login' ? (
                    <FormWrapper>
                        <TextField
                            variant="standard"
                            value={loginDetails.username}
                            onChange={(e) => handleInputChange(e, 'login')}
                            name="username"
                            label="Username"
                        />
                        <TextField
                            variant="standard"
                            value={loginDetails.password}
                            onChange={(e) => handleInputChange(e, 'login')}
                            name="password"
                            label="Password"
                        />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
                        <InfoText align="center">OR</InfoText>
                        <SecondaryButton onClick={toggleView}>Create an Account</SecondaryButton>
                    </FormWrapper>
                ) : (
                    <FormWrapper>
                        <TextField
                            variant="standard"
                            onChange={(e) => handleInputChange(e, 'signup')}
                            name="name"
                            label="Name"
                        />
                        <TextField
                            variant="standard"
                            onChange={(e) => handleInputChange(e, 'signup')}
                            name="username"
                            label="Username"
                        />
                        <TextField
                            variant="standard"
                            onChange={(e) => handleInputChange(e, 'signup')}
                            name="password"
                            label="Password"
                        />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <SecondaryButton onClick={handleSignup}>Sign Up</SecondaryButton>
                        <InfoText align="center">OR</InfoText>
                        <PrimaryButton onClick={toggleView}>Already Have an Account</PrimaryButton>
                    </FormWrapper>
                )}
            </Box>
        </Container>
    );
};

export default Login;
