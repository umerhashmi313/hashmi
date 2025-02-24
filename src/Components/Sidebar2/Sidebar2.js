import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box,  IconButton, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { RiMenuFold3Fill } from "react-icons/ri";
import SidebarItems from './SidebarItems2';
import { navigationData } from './Demo2'; // Correct import
import CottageIcon from '@mui/icons-material/Cottage';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect  } from 'react';
import { Card, CardContent, Avatar,CircularProgress } from "@mui/material";



const SidebarContainer = styled(Box)(({ theme, sidebarOpen }) => ({
  backgroundColor: '#03162A',
  color: '#ffffff',
  height: '100vh',
  width: sidebarOpen ? '235px' : '60px',
  transition: 'width 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden', // Add scroll for sidebar if content overflows
  

}));




const SidebarToggle = styled(IconButton)(({ sidebarOpen }) => ({
  position: 'fixed',
  top: '20px',
  left: sidebarOpen ? 'calc(234px - 20px)' : '13px', // Adjusted right position
  backgroundColor: '#ffffff',
  color: '#000',
  borderRadius: '20%',
  width: '35px',
  height: '35px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  zIndex: 1300,
  fontSize: '1.6rem',
  transition: 'left 0.3s ease', // Add transition
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
  paddingBottom: theme.spacing(1),
  backgroundColor: '#03162A', // Darker background similar to the Insight section
}));

const SidebarItemFooter = styled(SidebarItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#002b47', // Same highlight for footer items
    transform: 'translateY(-5px)',
  },
}));
 





export default function Sidebar2({ sidebarOpen, toggleSidebar ,  onLogout }) {
   const [courseData, setCourseData] = useState(null);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
       const fetchCourseData = async () => {
         const authToken = localStorage.getItem("authToken"); // Get token from local storage
   
         if (!authToken) {
           console.error("No auth token found.");
           setLoading(false);
           return;
         }
   
         try {
           const response = await fetch("https://backend-lms-xpp7.onrender.com/api/courses/complete-course-outline/", {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${authToken}`, // Include token in headers
             },
           });
   
           if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
           }
   
           const data = await response.json();
           console.log(data)
           setCourseData(data[0]); // Assuming first course in the list
           console.log(data)
         } catch (error) {
           console.error("Error fetching course data:", error);
         } finally {
           setLoading(false);
         }
       };
   
       fetchCourseData();
     }, []);
     
  const navigate = useNavigate();

  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (!courseData) {
      return <Typography>Error loading course data.</Typography>;
    }
  return (
    <Box display="flex" >
      {/* Sidebar */}
      <SidebarContainer sidebarOpen={sidebarOpen}>
        <SidebarToggle sidebarOpen={sidebarOpen} onClick={toggleSidebar}>
          {sidebarOpen ? <RiMenuFold3Fill /> : <RiMenuUnfold3Fill />}
        </SidebarToggle>
        {sidebarOpen && (
          <>
          <SidebarItemNoHover 
  sx={{ 
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', // Takes the full width of the sidebar
    height: 'auto', // Ensures height adjusts to fit the content
    paddingLeft:'0',
    paddingRight:'20px',
    paddingTop:'18px',
    paddingBottom:'12px'

  }}
>
  <img
    src="/insighticon.png" // Adjust path if the file is in a subfolder
    alt="Insight Icon"
    style={{
      width: '132px', // Width for the image
      height: '46px', // Height for the image
    }}
  />
</SidebarItemNoHover>

 <BlackDivider />
   <SidebarItems/>
   <FooterSection>
  <Black2Divider />
  {[ 
    { icon: CottageIcon, text: 'Home' ,onClick: () => navigate('/Courses'),  },
    { icon: SettingsIcon, text: 'Settings' },
    { icon: ExitToAppIcon, text: 'Logout', onClick: onLogout },
    
     // Add onClick handler for logout
  ].map((item, index) => (
    <SidebarItemFooter key={index}
     onClick={item.onClick}>
      <SidebarIcon>
        <item.icon />
      </SidebarIcon>
      <Typography sx={{ fontFamily: "'Roboto', sans-serif" }} fontSize="0.9rem">
        {item.text}
      </Typography>
    </SidebarItemFooter>
  ))}
</FooterSection>

          </>
        )}
       {!sidebarOpen && (
  <>
    {/* Main Navigation Icons
    {Object.entries(navigationData.Navigation).map(([sectionName, sectionItems]) => (
      Object.entries(sectionItems).map(([key, item], index) => (
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
      ))
    ))} */}

    {/* Footer Icons - Pushed to bottom */}
    <Box sx={{ marginTop: 'auto' ,
     }}>
      {[
        {icon:CottageIcon , text:'Home'  , onClick: () => navigate('/Courses'), },// Navigate to /Courses on click },
        { icon: SettingsIcon, text: 'Settings' },
        { icon: ExitToAppIcon, text: 'Logout' ,  onClick: onLogout  }
      ].map((item, index) => (
        <SidebarItem  onClick={item.onClick}
          key={`footer-${index}`}
          sx={{ ml: '-3px', mb:'10px', gap:'3px' }}
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
    </Box>

  );
}

