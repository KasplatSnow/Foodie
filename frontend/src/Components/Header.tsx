import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#EEEEEE',
  '&:hover': {
    backgroundColor: '#D0D0D0',
  },
  marginRight: 0,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
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
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left side logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Foodie
          </Typography>

          {/* Center search bar */}
          <Box sx={{ display: 'flex'}}>
            <Search>
              <StyledInputBase
                placeholder="Restaurants..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            {/* vertical line divider */ }
            <Box sx = {{backgroundColor: '#B4B4B4', width: '2px'}}>

            </Box>
            <Search>
              <StyledInputBase
                placeholder="Address, Zip Code..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button>
              <SearchIconWrapper sx = {{backgroundColor: '#0085FF'}}>
                <SearchIcon sx = {{color: 'white'}} />
              </SearchIconWrapper>
            </Button>
          </Box>

          {/* Right side buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Business
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Write a Review
            </Typography>
            <Button variant="outlined" sx={{ display: { xs: 'none', sm: 'block' } }}>Login</Button>
            <Button variant="outlined" sx = {{ display: { xs: 'none', sm: 'block' }, backgroundColor: '#0085FF', color: 'white'}}>Sign Up</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
