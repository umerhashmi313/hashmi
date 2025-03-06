import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box, InputBase, Button, IconButton, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { RiMenuFold3Fill } from "react-icons/ri";
import Header from '../Header/Header';
import SidebarItems from './SidebarItems';
import { navigationData } from './Demo'; // Correct import


const SidebarContainer = styled(Box)(({ theme, sidebarOpen }) => ({
  backgroundColor: '#03162A',
  color: '#ffffff',
  height: '100vh',
  width: sidebarOpen ? '260px' : '60px',
  transition: 'width 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto', // Add scroll for sidebar if content overflows

}));




const SidebarToggle = styled(IconButton)(({ sidebarOpen }) => ({
  position: 'fixed',
  top: '20px',
    left: sidebarOpen ? 'calc(260px - 20px)' : '13px', // Adjusted right position
  backgroundColor: '#ffffff',
  color: '#000',
  borderRadius: '20%',
  width: '35px',
  height: '35px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  zIndex: 1300,
  fontSize: '1.6rem',
  transition: 'left 0.5s ease', // Add transition
  '&:hover': {
    backgroundColor: '#f0f0f0',
    transform: 'scale(1.1)',
  },
}));


const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  cursor: 'pointer', // Make cursor pointer on hover
  transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition for transform and background
  '&:hover': {
    transform: 'translateY(-5px)', // Translate along Y-axis
    backgroundColor: '#002b47', // Highlight background on hover
  },
}));

const SidebarItemNoHover = styled(SidebarItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: ' #03162A',
  transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition for transform and background
  '&:hover': {
    transform: 'none', // Remove any hover transformation
    backgroundColor: 'transparent', // Remove hover background color change
  },
}));

const SidebarIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  marginRight: theme.spacing(1),
  marginLeft: '17px',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));


const BlackDivider = styled(Divider)(({ theme }) => ({
  background: 'transparent',
  height: '0.5px',
  margin: theme.spacing(1, 0),
  boxShadow: '0 2px 4px  rgba(255, 255, 255, 0.79)', // Add a subtle shadow at the top
}));

const Black2Divider = styled(Divider)(({ theme }) => ({
  background: 'transparent',
  height: '0.5px',
  margin: theme.spacing(1, 0),
  boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.79)', // White shadow effect
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  marginLeft:'-15px',
  paddingBottom: theme.spacing(1),
  backgroundColor: '#03162A', // Darker background similar to the Insight section
}));

const SidebarItemFooter = styled(SidebarItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#002b47', // Same highlight for footer items
    transform: 'translateY(-5px)',
  },
}));

export default function Sidebar({ sidebarOpen, toggleSidebar,  onLogout  }) {
  return (
   
      <SidebarContainer sidebarOpen={sidebarOpen}>
        <SidebarToggle sidebarOpen={sidebarOpen} onClick={toggleSidebar}>
          {sidebarOpen ? <RiMenuFold3Fill /> : <RiMenuUnfold3Fill />}
        </SidebarToggle>
        {sidebarOpen && (
          <>
            <SidebarItemNoHover sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 5 }}>
              <img
                src="/insighticon.png" // Adjust path if the file is in a subfolder
                alt="Insight Icon"
                style={{
                  width: '150px', // Adjust width
                  height: 'auto', // Maintain aspect ratio
                }}
              />
            </SidebarItemNoHover>
 <BlackDivider />
   <SidebarItems/>
   <FooterSection>
  <Black2Divider />
  {[
    { icon: SettingsIcon, text: 'Settings' },
    { icon: ExitToAppIcon, text: 'Logout' ,onClick: onLogout }
  ].map((item, index) => (
    <SidebarItemFooter sx={{
     
    }}
    onClick={item.onClick}
    key={index}>
      <SidebarIcon>
        <item.icon />
      </SidebarIcon>
      <Typography sx={{ fontSize:'14px', fontWeight:400 , lineHeight:'16px' }} >
        {item.text}
      </Typography>
    </SidebarItemFooter>
  ))}
</FooterSection>
          </>
        )}
        {!sidebarOpen && (
  <>
    {/* Main Navigation Icons */}
    {Object.entries(navigationData.Navigation.Students).map(([key, item], index) => (
      <SidebarItem 
        key={key}
        sx={{ 
          ml: '-3px',
          mt: index === 0 ? '60px' : undefined 
        }}
      >
        <SidebarIcon>
          <item.icon />
        </SidebarIcon>
      </SidebarItem>
    ))}

    {/* Footer Icons - Pushed to bottom */}
    <Box sx={{ marginTop: 'auto' }}>
      {[
        { icon: SettingsIcon, text: 'Settings' },
        { icon: ExitToAppIcon, text: 'Logout', onClick: onLogout  }
      ].map((item, index) => (
        <SidebarItem   onClick={item.onClick}
          key={`footer-${index}`}
          sx={{ ml: '-10px' , mb:'10px' , gap:'3px' }}
        >
          <SidebarIcon>
            <item.icon />
          </SidebarIcon>
        </SidebarItem>
      ))}
    </Box>
  </>
)}
      </SidebarContainer>
  

  );
}

