import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Button,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const StyledHeader = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  height: 'auto',
  color: '#000',
  boxShadow: 'none',
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
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down(1145)); // Adjust breakpoint for 1145px
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(722)); // Adjust breakpoint for 722px

  return (
    <StyledHeader position="sticky">
      <Toolbar>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            flexGrow: 1,
            ml: '20px',
            fontSize: isSmallScreen ? '20px' : '30px', // Adjust font size conditionally
          }}
        >
          Course Dashboard
        </Typography>
        <Box display="flex" alignItems="center">
          {!isMobileView && (
            <Box
              display="flex"
              alignItems="center"
              sx={{
                bgcolor: 'white',
                p: 1,
                mb: 1,
                height: '15px',
                width: '239px',
                borderRadius: 5,
              }}
            >
              <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
              <SearchIcon />
            </Box>
          )}
          {isMobileView ? (
            <IconButton sx={{ color: '#000' }}>
              <SearchIcon />
              <EmojiEventsIcon sx={{color:'gold', ml: 1}}/>
            </IconButton>
          ) : (
            <CollectButton
              variant="contained"
              startIcon={<EmojiEventsIcon sx={{ color: 'gold' }} />}
              sx={{ ml: 2, mr: 1.5, mb: 0.7 }}
            >
              Collect Rewards
            </CollectButton>
          )}
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
