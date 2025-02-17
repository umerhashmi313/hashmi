import React from 'react';
import { Box, Typography } from '@mui/material';
import { navigationData } from './CoursesDemo'; // Ensure the correct path

const FadedDivider = () => <div style={{ borderBottom: '1px solid #ddd', margin: '10px 10px' }} />; // Lighter divider color

const NavigationComponent = () => {
  return (
    <Box
      sx={{
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        pr: 1,
        display: 'flex',
        flexDirection: 'column',
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#aaa', borderRadius: '4px' },
        '&::-webkit-scrollbar-track': { backgroundColor: '#f0f0f0' },
        paddingBottom: '100px',
        backgroundColor: '#ffffff', // White background for visibility
      }}
    >
      {Object.entries(navigationData.Navigation).map(([sectionName, sectionData]) => (
        <React.Fragment key={sectionName}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '8px',
              px: '8px',
              py: '6px',
              '&:hover': { backgroundColor: '#f5f5f5' }, // Highlight on hover
            }}
          >
            {/* Dynamically render the icon */}
            {sectionData.icon &&
              React.createElement(sectionData.icon, {
                style: { fontSize: '20px', color: '#333' }, // Dark gray for icon
              })}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: '16px',
                cursor: 'pointer',
                color: '#333', // Dark gray for text
              }}
            >
              {sectionName}
            </Typography>
          </Box>
          <FadedDivider />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default NavigationComponent;
