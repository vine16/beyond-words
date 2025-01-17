import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const BackgroundBanner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left bottom;
    background-size: cover;
`;

const ContentWrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 40px;
    }
`;

const StyledText = styled(Typography)`
    color: #6c757d;
`;

const AboutPage = () => {
    return (
        <Box>
            <BackgroundBanner />
            <ContentWrapper>
                <Typography variant="h3">Our Journey</Typography>
                <StyledText variant="h5">
                    Hey there! We are Vinay and Neha, currently pursuing Computer Engineering at Gurugram University. 
                    With a keen interest in technology, we enjoy bringing ideas to life and solving real-world problems. 
                    <br />
                    Want to collaborate or simply say hi? Feel free to reach out or drop us an email!
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/vine16" color="inherit" target="_blank">
                            <GitHub />
                        </Link>
                    </Box>
                </StyledText>
                <StyledText variant="h5">
                    Connect with us on:
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/vinayj01/" color="inherit" target="_blank">
                            <LinkedIn />
                        </Link>
                    </Box>
                    or shoot an email at 
                    <Link 
                        href="mailto:vinay1118209@gmail.com?Subject=Let's%20Connect!" 
                        target="_blank" 
                        color="inherit"
                    >
                        <Email />
                    </Link>.
                </StyledText>
            </ContentWrapper>
        </Box>
    );
};

export default AboutPage;
