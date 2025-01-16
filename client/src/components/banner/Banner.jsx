
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://png.pngtree.com/thumb_back/fh260/background/20240610/pngtree-computer-of-a-programmer-with-lines-code-of-software-image_15746003.jpg) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>Beyond Words</Heading>
            <SubHeading>A Blog for Every Thought</SubHeading>
        </Image>
    )
}

export default Banner;