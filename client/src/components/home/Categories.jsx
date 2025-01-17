import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    padding: 8px;
    display: block;
    &:hover {
        background-color: #f0f0f0;
        border-radius: 5px;
    }
`;

const ActiveCategoryLink = styled(StyledLink)`
    background-color: #d3e6ff;
    border-radius: 5px;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <>
            <StyledButton variant="contained" component={Link} to={`/create?category=${category || ''}`}>
                Create Blog
            </StyledButton>
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(cat => (
                            <TableRow key={cat.id}>
                                <TableCell>
                                    {
                                        category === cat.type 
                                        ? <ActiveCategoryLink to={`/?category=${cat.type}`}>
                                            {cat.type}
                                          </ActiveCategoryLink>
                                        : <StyledLink to={`/?category=${cat.type}`}>
                                            {cat.type}
                                          </StyledLink>
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;