import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Button,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Added missing import

// Renamed styled component to avoid conflict
const StyledHeader = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  height:'60px',
  color: '#000',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  zIndex: 1,
}));

const CollectButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  height: '33px',
  backgroundColor: '#03162A',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#333',
  },
}));

const ProfileIcon = styled(AccountCircleIcon)(({ theme }) => ({
  fontSize: '2rem',
  color: '#000',
}));

function Header() {
  return (
    <StyledHeader position="sticky">
      <Toolbar>
        <Typography variant="h5" fontWeight="bold" fontSize="30px" sx={{ flexGrow: 1, ml: '20px' }}>
          Course Dashboard
        </Typography>
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            sx={{
              bgcolor: 'white',
              p: 1,
              mb :1,
              height: '15px',
              width: '239px',
              borderRadius: 5,
              
              boxShadow: '0 5px 4px rgba(0,0,0,0.2)',
            }}
          >
            <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
            <SearchIcon />
          </Box>
          <CollectButton
            variant="contained"
            startIcon={<EmojiEventsIcon sx={{ color: 'gold' }} />}
            sx={{ ml: 2, mr: 1.5  , mb: .7}}
          >
            Collect Rewards
          </CollectButton>
          <IconButton sx={{ color: '#000' }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{ color: '#000' }}>
            <ProfileIcon sx={{ fontSize: '2.7rem' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledHeader>
  );
}

export default Header;