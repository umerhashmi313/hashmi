import React, { useState } from 'react';
import { Box, IconButton, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RiMenuUnfold3Fill, RiMenuFold3Fill } from 'react-icons/ri';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// Import your navigation data and SidebarItems as needed
// import SidebarItems from '.,/sidebar/SidebarItems';
import { navigationData } from '../Sidebar/Demo'; // Make sure this file exists and exports your navigation data
import SidebarItems from '../Sidebar/SidebarItems';

// Sidebar container styled to cover the viewport when open
const SidebarContainer = styled(Box)(({ theme, sidebarOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: sidebarOpen ? '100vw' : '0px', // full width when open, 0 when closed
  backgroundColor: '#03162A',
  color: '#ffffff',
  overflowX: 'hidden',
  transition: 'width 0.3s ease',
  zIndex: 1200,
}));

// Sidebar toggle button always accessible
const SidebarToggle = styled(IconButton)(({ theme  }) => ({
  position: 'absolute',
  top: '20px',
  left:  '85%',
  backgroundColor: '#ffffff',
  color: '#000',
  borderRadius: '20%',
  width: '35px',
  height: '35px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  zIndex: 1300,
  fontSize: '1.6rem',
  transition: 'transform 0.3s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    transform: 'scale(1.1)',
  },
}));

// A few more styled components for content and items
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  cursor: 'pointer',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    backgroundColor: '#002b47',
  },
}));

const SidebarIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  marginRight: theme.spacing(1),
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(1),
  backgroundColor: '#03162A',
}));

// The Sidebar component
function Sidebar({ sidebarOpen, toggleSidebar, onLogout }) {
  return (
    <SidebarContainer sidebarOpen={sidebarOpen}>
   {/* // In your Sidebar component, uncomment the SidebarToggle usage: */}
<SidebarToggle onClick={toggleSidebar}>
  {sidebarOpen ? <RiMenuFold3Fill /> : <RiMenuUnfold3Fill />}
</SidebarToggle>

      {sidebarOpen && (
        <Box sx={{
          //  mt: 6,
         p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Top Section: Logo */}
          <Box sx={{ mb: 2 }}>
            <img
              src="/insighticon.png"
              alt="Insight Icon"
              style={{ width: '150px', height: 'auto' }}
            />
          </Box>
          <Divider sx={{ background: '#ffffff', mb: 2 }} />
          
         <SidebarItems/>
          
          {/* Footer Section */}
          <FooterSection>
            <Divider sx={{ background: '#ffffff', mb: 2 }} />
            <SidebarItem onClick={onLogout}>
              <SidebarIcon>
                <ExitToAppIcon />
              </SidebarIcon  >
              <Typography variant="body1">Logout</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <SettingsIcon />
              </SidebarIcon>
              <Typography variant="body1">Settings</Typography>
            </SidebarItem>
          </FooterSection>
        </Box>
      )}
    </SidebarContainer>
  );
}

// The Nav component with the top navigation bar
export default function Nav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear tokens from localStorage/sessionStorage
    localStorage.removeItem('authToken');
    // // Optionally, update your authentication context or state
    // setUser(null);
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 222,
          width: '100%',
          padding: '16px',
          backgroundColor: '#03162A', // Adjust background as needed
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: 'flex', gap: '8px', flexDirection:'row',
           alignItems: 'center' ,
           justifyContent:'center' }}>
          <IconButton onClick={toggleSidebar} sx={{ color: 'white'  }}>
          { sidebarOpen ? <RiMenuFold3Fill /> : <RiMenuUnfold3Fill />}
          </IconButton>
          <Box>
            <img
              src="/insighticon.png"
              alt="Insight Icon"
              style={{ width: '92px', height: '32px' }}
            />
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'center',
            height: '30px',
          }}
        >
          <SearchIcon sx={{ fontSize: '20px' }} />
          <NotificationsIcon sx={{ fontSize: '20px' }} />
          <AccountCircleIcon sx={{ fontSize: '25px' }} />
        </Box>
      </Box>
      
      {/* Render the Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} onLogout={handleLogout} />
    </>
  );
}
