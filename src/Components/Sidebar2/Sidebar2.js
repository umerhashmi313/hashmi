import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Divider, CircularProgress, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { RiMenuUnfold3Fill, RiMenuFold3Fill } from "react-icons/ri";
import SidebarItems from './SidebarItems2';
import CottageIcon from '@mui/icons-material/Cottage';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import LogoImage from '../../Assets/logo.svg';

const SidebarContainer = styled(Box)(({ theme, sidebarOpen }) => ({
  backgroundColor: '#03162A',
  color: '#ffffff',
  height: '100vh',
  width: sidebarOpen ? '250px' : '60px',
  
  transition: 'width 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  boxSizing:'border-box'
}));

const SidebarToggle = styled(IconButton)(({ sidebarOpen }) => ({
  position: 'fixed',
  top: '20px',
  left: sidebarOpen ? 'calc(250px - 20px)' : '13px',
  backgroundColor: '#ffffff',
  color: '#000',
  borderRadius: '20%',
  width: '35px',
  height: '35px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  zIndex: 1300,
  fontSize: '1.6rem',
  transition: 'left 0.3s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    transform: 'scale(1.1)',
  },
}));

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

const SidebarItemNoHover = styled(SidebarItem)(({ theme }) => ({
  backgroundColor: '#03162A',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    transform: 'none',
    backgroundColor: 'transparent',
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

const BlackDivider = styled(Divider)(({ theme }) => ({
  background: 'transparent',
  height: '0.5px',
  margin: theme.spacing(1, 0),
  boxShadow: '0 2px 4px rgba(255, 255, 255, 0.79)',
}));

const Black2Divider = styled(Divider)(({ theme }) => ({
  background: 'transparent',
  height: '0.5px',
  margin: theme.spacing(1, 0),
  boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.79)',
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  display: 'flex',
  marginLeft:'-15px',
  flexDirection: 'column',
  paddingBottom: theme.spacing(1),
  backgroundColor: '#03162A',
}));

const SidebarItemFooter = styled(SidebarItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#002b47',
    transform: 'translateY(-5px)',
  },
}));

export default function Sidebar2({ sidebarOpen, toggleSidebar, onLogout , selectedCourseId }) {
  const navigate = useNavigate();

  // Use React Query to fetch the course data.
  const fetchCourseData = async ({ signal }) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No auth token found.");
    }
    const response = await fetch("https://backend-lms-xpp7.onrender.com/api/courses/complete-course-outline/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data[0]; // Assuming the first course is needed.
  };

  const { data: courseData, error, isLoading } = useQuery("courseData", fetchCourseData, {
    staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes.
  });

  if (error) {
    console.error("Error fetching course data:", error);
  }

  return (
   
      <SidebarContainer sidebarOpen={sidebarOpen}>
        <SidebarToggle sidebarOpen={sidebarOpen} onClick={toggleSidebar}>
          {sidebarOpen ? <RiMenuFold3Fill /> : <RiMenuUnfold3Fill />}
        </SidebarToggle>
        {sidebarOpen ? (
          <>
            <SidebarItemNoHover
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 'auto',
                paddingLeft: '0',
                paddingRight: '20px',
                paddingTop: '18px',
                paddingBottom: '12px',
              }}
            >
              <img
                src="/insighticon.png"
                alt="Insight Icon"
                style={{
                  width: '132px',
                  height: '46px',
                }}
              />
            </SidebarItemNoHover>

            <BlackDivider />
            <SidebarItems selectedCourseId={selectedCourseId} />
            <FooterSection>
              <Black2Divider />
              {[
                { icon: CottageIcon, text: 'Home', onClick: () => navigate('/dashboard') },
                { icon: SettingsIcon, text: 'Settings' },
                { icon: ExitToAppIcon, text: 'Logout', onClick: onLogout },
              ].map((item, index) => (
                <SidebarItemFooter key={index} onClick={item.onClick}>
                  <SidebarIcon>
                    <item.icon />
                  </SidebarIcon>
                  <Typography sx={{   fontSize:'14px', fontWeight:400 , lineHeight:'16px' }} >
                    {item.text}
                  </Typography>
                </SidebarItemFooter>
              ))}
            </FooterSection>
          </>
        ) : (
          <Box sx={{ marginTop: 'auto' }}>
            {[
              { icon: CottageIcon, text: 'Home', onClick: () => navigate('/dashboard') },
              { icon: SettingsIcon, text: 'Settings' },
              { icon: ExitToAppIcon, text: 'Logout', onClick: onLogout },
            ].map((item, index) => (
              <SidebarItem key={`footer-${index}`} onClick={item.onClick} sx={{ ml: '-3px', mb: '10px', gap: '3px' }}>
                <SidebarIcon>
                  <item.icon />
                </SidebarIcon>
              </SidebarItem>
            ))}
          </Box>
        )}
      </SidebarContainer>

   
  );
}
