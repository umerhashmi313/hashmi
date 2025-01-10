import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box, InputBase, Button, IconButton, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PagesIcon from '@mui/icons-material/Pages';
import SchoolIcon from '@mui/icons-material/School';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';  // Drip icon as an example

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#000',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  zIndex: 1,
}));

const SidebarContainer = styled(Box)(({ theme, sidebarOpen }: { sidebarOpen: boolean }) => ({
  backgroundColor: '#001f3f',
  color: '#ffffff',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: sidebarOpen ? '15%' : '5%',
  transition: 'width 0.3s ease',
  position: 'relative',
  paddingTop: theme.spacing(1),
}));

const SidebarToggle = styled(IconButton)(({ theme, sidebarOpen }: { sidebarOpen: boolean }) => ({
  position: 'absolute',
  top: '14px',
  right: sidebarOpen ? '-20px' : '-18px',
  backgroundColor: '#000',
  color: '#ffffff',
  borderRadius: '50%',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  fontSize: '2rem',
  zIndex: 2,
  '&:hover': {
    backgroundColor: '#333',
    transform: 'translateY(-10%) scale(1.2)',
  },
}));

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#003366',
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

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const FadedDivider = styled(Divider)(({ theme }) => ({
  background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
  margin: theme.spacing(1, 0),
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(1),
}));

const CollectButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  backgroundColor: '#000', // Black background
  color: '#ffffff', // White text
  '&:hover': {
    backgroundColor: '#333',
  },
}));

const ProfileIcon = styled(AccountCircleIcon)(({ theme }) => ({
  fontSize: '2rem', // Slightly larger profile icon
  color: '#000', // Black color
}));

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <SidebarContainer sidebarOpen={sidebarOpen}>
        <SidebarToggle
          sidebarOpen={sidebarOpen}
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </SidebarToggle>

        {/* Sidebar Content */}
        {sidebarOpen && (
          <>
            <SidebarItem sx={{pl:2}}>
              <SidebarIcon>
                <LocalDrinkIcon  sx={{color : 'red'}}/> {/* Drip Icon */}
              </SidebarIcon>
              <Typography variant="h6" fontSize="1.1rem" fontWeight="bold">Insight MDCAT</Typography>
            </SidebarItem>
            <FadedDivider />

            <SidebarItem>
              <Typography variant="body2" fontSize="1rem" sx={{ pl: 1}}>STUDENTS</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <DashboardIcon />
              </SidebarIcon>
              <Typography fontSize="0.75rem">Dashboard</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <PagesIcon />
              </SidebarIcon>
              <Typography fontSize="0.75rem">Pages</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <SchoolIcon />
              </SidebarIcon>
              <Typography fontSize="0.75rem">Courses</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <AnnouncementIcon />
              </SidebarIcon>
              <Typography fontSize="0.75rem">Announcements</Typography>
            </SidebarItem>

            <FadedDivider />

            <SidebarItem>
              <Typography variant="body2" fontSize="1rem" sx={{pl:1}}>INSTRUCTOR</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <DashboardIcon />
              </SidebarIcon>
              <Typography fontSize="0.75rem">Dashboard</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <PagesIcon />
              </SidebarIcon>
              <Typography fontSize="0.75rem">Pages</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <SchoolIcon />
              </SidebarIcon>
              <Typography fontSize="0.75rem">Courses</Typography>
            </SidebarItem>
            <SidebarItem>
              <SidebarIcon>
                <AnnouncementIcon />
              </SidebarIcon>
              <Typography fontSize="0.75rem">Announcements</Typography>
            </SidebarItem>

            <FadedDivider />

            {/* Footer Section (Settings and Logout) */}
            <FooterSection>
              <SidebarItem>
                <SidebarIcon>
                  <SettingsIcon />
                </SidebarIcon>
                <Typography fontSize="0.75rem">Settings</Typography>
              </SidebarItem>
              <SidebarItem>
                <SidebarIcon>
                  <ExitToAppIcon />
                </SidebarIcon>
                <Typography fontSize="0.75rem">Logout</Typography>
              </SidebarItem>
            </FooterSection>
          </>
        )}
      </SidebarContainer>

      {/* Main Content */}
      <Box flexGrow={1}>
        <Header position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Course Dashboard
            </Typography>
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center" sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                <SearchIcon />
                <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
              </Box>
              <CollectButton variant="contained" startIcon={<EmojiEventsIcon sx={{ color: 'gold' }} />} sx={{ ml: 2  ,  borderRadius: 5 , boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
                Collect Rewards
              </CollectButton>
              <IconButton sx={{ color: '#000' }}>
                <NotificationsIcon />
              </IconButton>
              <IconButton sx={{ color: '#000' , fontSize: '3rem' }}>
                <ProfileIcon /> {/* Larger Profile Icon */}
              </IconButton>
            </Box>
          </Toolbar>
        </Header>
        
      </Box>
    </Box>
  );
}
