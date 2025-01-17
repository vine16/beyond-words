import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    display: flex;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Header = () => {
    const navigate = useNavigate();

    // Handle logout functionality
    const logout = async () => {
        // Assuming you might want to clear user data here
        // localStorage.removeItem("user"); // For example
        navigate('/account'); // Redirect to login/account page
    };

    return (
        <Component position="static">
            <Container>
                <Link to='/'> 
                    <Button color="inherit">HOME</Button>
                </Link>
                <Link to='/about'>
                    <Button color="inherit">ABOUT</Button>
                </Link>
                <Link to='/contact'>
                    <Button color="inherit">CONTACT</Button>
                </Link>
                <Button color="inherit" onClick={logout}>LOGOUT</Button>
            </Container>
        </Component>
    );
};

export default Header;
