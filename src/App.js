import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import ScholarshipCard from './Components/Main/Main';


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = sidebarOpen ? 240 : 72;
  const headerHeight = 64;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      {/* Sidebar */}
      <Box sx={{
        width: sidebarWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease',
      }}>
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </Box>

      {/* Main Content Area */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight:'100vh',
        overflow:'auto'
      }}>
        {/* Header */}
        <Box sx={{ 
          height: headerHeight,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'background.paper'
        }}>
          <Header />
        </Box>

        {/* Scrollable Content */}
        <Box sx={{
          flex: 1,
          backgroundColor: '#f5f6fa',
          overflowY: 'auto',
          p: 3,
        }}>
          {/* Content Container with Margin Top */}
          <Box sx={{
            mt: 4, // Margin top for cards
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            // minHeight: 'calc(100vh - 64px - 16px)' // Adjust for header + margins
          
          }}>
            {/* Left Card (66%) */}
            <Box sx={{
              flex: '0 0 66%',
              maxWidth: '66%',
              minWidth: 0,
            }}>
              <ScholarshipCard />
            </Box>
           
            </Box>
        </Box>
      </Box>
    </Box>
  );
}