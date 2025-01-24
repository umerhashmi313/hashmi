import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Divider } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { navigationData } from './Demo'; // Correct import

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
    cursor: 'pointer',
    userSelect: 'none',
    marginTop: '-4px',
    marginBottom: '-8px'
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
      fontFamily: "'Roboto', sans-serif",
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
  const [expandedSections, setExpandedSections] = useState({
    Students: true,
    Instructor: true,
  });

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <Box sx={{
      maxHeight: 'calc(100vh - 100px)',
      overflowY: 'auto',
      overflowX: 'hidden',
      pr: 1,
      display: 'flex',
      flexDirection: 'column',
      '&::-webkit-scrollbar': { width: '8px' },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' },
      '&::-webkit-scrollbar-track': { backgroundColor: '#03162A' },
      paddingBottom: '100px'
    }}>
      {Object.entries(navigationData.Navigation).map(([sectionName, sectionItems]) => (
        <React.Fragment key={sectionName}>
          <SubheadingSection onClick={() => toggleSection(sectionName)}>
            <Typography variant="body2"  sx={{ fontWeight: 600 }} >{sectionName.toUpperCase()}</Typography>
            {expandedSections[sectionName] ? <ExpandLess /> : <ExpandMore />}
          </SubheadingSection>
          
          {expandedSections[sectionName] && Object.entries(sectionItems).map(([itemName, itemData]) => {
            const IconComponent = itemData.icon;
            return (
              <SidebarItem key={itemName}>
                <SidebarIcon>
                  <IconComponent />
                </SidebarIcon>
                <Typography fontSize="13px" >
                  {itemName}
                </Typography>
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