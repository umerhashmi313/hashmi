import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Divider } from '@mui/material';
import { navigationData } from './Demo'; // Correct import
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const SubheadingSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  zIndex: 10,
  position: 'relative',
  fontSize: '14px',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: '600',
  cursor: 'default', // No collapse functionality
  userSelect: 'none',
  marginTop: '-4px',
  marginBottom: '-8px',
}));

const SidebarItem = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  cursor: 'pointer',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  backgroundColor:  'transparent', // Active background remains the same
  color: active ? '#31CEB8' : 'white', // Active text color is now #31CEB8
  '&:hover': {
    transform: 'translateY(-5px)',
    backgroundColor: '#002b47',
    color: '#31CEB8', // Hover text color also becomes #31CEB8
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

const FadedDivider = styled(Divider)(({ theme }) => ({
  background: 'linear-gradient(to right, transparent, #ffffff, transparent)',
  height: '1px',
  margin: theme.spacing(1, 2),
}));

function SidebarItems() {
  const navigate = useNavigate(); // Initialize navigate hook
  const location = useLocation(); // Access current route

  const handleNavigation = (url) => {
    if (url) navigate(url); // Redirect only if URL exists
  };

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
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' },
        '&::-webkit-scrollbar-track': { backgroundColor: '#03162A' },
        paddingBottom: '100px',
      }}
    >
      {Object.entries(navigationData.Navigation).map(([sectionName, sectionItems]) => (
        <React.Fragment key={sectionName}>
          <SubheadingSection>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '16px', color: '#31CEB8' }}
            >
              {sectionName.toUpperCase()}
            </Typography>
          </SubheadingSection>

          {Object.entries(sectionItems).map(([itemName, itemData]) => {
            const IconComponent = itemData.icon;
            const isActive = location.pathname === itemData.url; // Check if the current route matches the item's URL

            return (
              <SidebarItem
                key={itemName}
                active={isActive}
                onClick={() => handleNavigation(itemData.url)}
              >
                <SidebarIcon>
                  <IconComponent  />
                </SidebarIcon>
                <Typography fontSize="13px" >{itemName}</Typography>
              </SidebarItem>
            );
          })}

          <FadedDivider />
        </React.Fragment>
      ))}
    </Box>
  );
}

export default SidebarItems;
