import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchField: React.FC = (): JSX.Element => {
  const MediaQuery = {
    'max.768': useMediaQuery('(max-width:768px)'),
  };

  return (
    <Search sx={{
      backgroundColor: '#dae8f0',
      color: '#000',
      borderRadius: '15px',
      margin: MediaQuery ? 0 : '0 20px',
    }}
    >
      <SearchIconWrapper>
        <SearchIcon sx={{ color: '#000' }} />
      </SearchIconWrapper>
      <StyledInputBase
        sx={{ color: '#000' }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};
export default SearchField;
