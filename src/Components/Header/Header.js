import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  styled,
  useMediaQuery,
  useTheme,
  Chip,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useQuery } from 'react-query';

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

const BlackDivider = styled(Divider)(({ theme }) => ({
  background: 'black',
  opacity: '16%',
  height: '0.1px',
  margin: theme.spacing(1, 1),
  boxShadow: '0 2px 4px rgba(255, 255, 255, 0.79)',
}));

// Function to fetch user data using the user id from localStorage.
const fetchUserData = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("No user id found in localStorage");
  }
  const response = await fetch(`https://backend-lms-xpp7.onrender.com/api/Students/${userId}/`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function Header({ onLogout }) {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down(1145));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(722));

  // State for profile dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Using React Query to fetch user data.
  const { data: userData, isLoading, error } = useQuery(["userData", localStorage.getItem("user.id")], fetchUserData);

  return (
    <StyledHeader position="sticky">
      <Toolbar>
        <Typography
          variant="h5"
          fontWeight='700'
          sx={{
            flexGrow: 1,
            ml: '70px',
            fontSize: isSmallScreen ? '20px' : '30px',
          }}
        >
          Course Dashboard
        </Typography>
        <Box display="flex" alignItems="center">
          {/* {!isMobileView && (
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
          )} */}
          {/* {isMobileView ? (
            <IconButton sx={{ color: '#000' }}>
              <SearchIcon />
              <EmojiEventsIcon sx={{ color: 'gold', ml: 1 }} />
            </IconButton>
          ) : (
            <CollectButton
              variant="contained"
              startIcon={<EmojiEventsIcon sx={{ color: 'gold' }} />}
              sx={{ ml: 2, mr: 1.5, mb: 0.7 }}
            >
              Collect Rewards
            </CollectButton>
          )} */}
          {/* <IconButton sx={{ color: '#000' }}>
            <NotificationsIcon />
          </IconButton> */}
          
          {/* Profile Icon with Picture */}
          <IconButton sx={{ cursor: 'pointer' }} onClick={handleClick}>
            <Avatar
              src="https://randomuser.me/api/portraits/men/75.jpg" // Fallback profile pic
              alt="Profile"
              sx={{ width: 45, height: 45 }}
            />
          </IconButton>

          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: { width: 'fit-content',minWidth:'230px', p: '16px', borderRadius: 2 },
            }}
          >
            <MenuItem disabled sx={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start'  }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' , gap: '40px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '14px', }}>
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="Profile"
                    sx={{ width: 50, height: 50, mb: 1 , }}
                  />
                  <Box>
                    {/* Display fetched full name or fallback */}
                    <Typography fontWeight="bold" sx={{color:'black'}}>
                      {isLoading || error ? "Loading..." : userData?.full_name || "User Name"}
                    </Typography>
                    {/* Display fetched roll number or fallback */}
                    <Typography variant="body2" color="black">
                     Roll No: {isLoading || error ? "" : userData?.roll_no || "Roll No"}
                    </Typography>
                  </Box>
                </Box> 
                {/* <Chip
                  label= {isLoading || error ? "" : userData?.roll_no || "Roll No"}
                  sx={{
                    backgroundColor: "#BFF0E9",
                    color: "green",
                    height: "25px",
                    fontWeight: 500,
                    fontSize: '15px',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                /> */}
              </Box>
            </MenuItem>
            <BlackDivider/>
            <MenuItem>
              <PermIdentityIcon sx={{ mr: 1 }} />
              Account
            </MenuItem>
            <MenuItem>
              <SettingsIcon sx={{ mr: 1 }} />
              Settings
            </MenuItem>
            <BlackDivider/>
            <MenuItem sx={{ color: '#31CEB8' }} onClick={onLogout}>
              <LogoutIcon sx={{ mr: 1, color: '#31CEB8' }} />
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledHeader>
  );
}

export default Header;
