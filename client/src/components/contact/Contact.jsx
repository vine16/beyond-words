import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const ContactBanner = styled(Box)`
    background-image: url(https://via.placeholder.com/1500x500);
    width: 100%;
    height: 50vh;
    background-position: center;
    background-size: cover;
    filter: brightness(0.8);
`;

const ContentWrapper = styled(Box)`
    padding: 30px;
    & > h3 {
        margin-top: 40px;
        font-weight: bold;
    }
    & > p {
        margin-top: 20px;
        line-height: 1.8;
    }
`;

const DescriptionText = styled(Typography)`
    color: #555;
    font-size: 18px;
`;

const Contact = () => {
    return (
        <Box>
            <ContactBanner />
            <ContentWrapper>
                <Typography variant="h3">Let's Connect!</Typography>
                <DescriptionText>
                    Feel free to reach out to us on social media or drop us an email:
                </DescriptionText>
                <Box>
                    <Link href="https://www.instagram.com/bhatt_neha_22" color="inherit" target="_blank">
                        <Instagram style={{ marginRight: 10 }} />
                    </Link>
                    <Link href="mailto:vinay1118209@gmail.com?Subject=Hi there" target="_blank" color="inherit">
                        <Email style={{ marginRight: 10 }} />
                    </Link>
                    <Link href="https://github.com/vine16" color="inherit" target="_blank">
                        <GitHub />
                    </Link>
                </Box>
            </ContentWrapper>
        </Box>
    );
};

export default Contact;
