import { styled, Box, Typography } from '@mui/material';

const BackgroundContainer = styled(Box)`
    width: 100%;
    height: 50vh;
    background-image: url(https://png.pngtree.com/thumb_back/fh260/background/20240610/pngtree-computer-of-a-programmer-with-lines-code-of-software-image_15746003.jpg);
    background-position: center;
    background-size: 55%;
    background-repeat: repeat-x;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainHeading = styled(Typography)`
    font-size: 64px;
    color: #fff;
    line-height: 1.2;
    text-align: center;
`;

const Tagline = styled(Typography)`
    font-size: 18px;
    color: #000;
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    margin-top: 10px;
`;

const Banner = () => {
    return (
        <BackgroundContainer>
            <MainHeading>Beyond Words</MainHeading>
            <Tagline>A Blog for Every Thought</Tagline>
        </BackgroundContainer>
    );
};

export default Banner;
