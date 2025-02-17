import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { navigationData } from './Demo2';

const VerticalConnector = () => <div style={{ borderLeft: '2px solid #ccc', height: '22px', marginLeft: '4px' , backgroundcolor:'#78BBFF', opacity:'40%' }} />;
const StepIconContainer = ({ children }) => <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>;
const StepIcon = ({ active }) => <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: active ? '#78BBFF' : '#78BBFF', opacity: active ? 1 : 0.2,  }} />;
const FadedDivider = () => <div style={{ borderBottom: '1px solid #ccc', margin: '10px 10px' }} />;

const NavigationComponent = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeStep, setActiveStep] = useState(null); // Track the globally active step

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const handleStepClick = (sectionName, topicName, itemName) => {
    // Set the globally active step
    setActiveStep(`${sectionName}-${topicName}-${itemName}`);
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
      {/* Render Chapter 1 Video heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, cursor: 'pointer', px: '8px', gap:'8px' }}>
        <PlayCircleIcon sx={{ height:'18px', width:'18px', fontSize:'20px', color: '#FFFFFF', }} />
        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '16px', cursor: 'pointer' }}>
          Chapter 1 Video
        </Typography>
      </Box>
      <FadedDivider />

      {/* Render collapsible Chapter 1 section */}
      {Object.entries(navigationData.Navigation).map(([sectionName, sectionData]) => (
        <React.Fragment key={sectionName}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px', px: '4px', py: '2px' }} onClick={() => toggleSection(sectionName)}>
            {expandedSections[sectionName] ? <ExpandLess /> : <ExpandMore />}
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '16px', cursor: 'pointer' }}>
              {sectionName}
            </Typography>
          </Box>
          {/* Add a divider after the Chapter 1 heading */}
          <FadedDivider />

          {expandedSections[sectionName] && (
            <Box sx={{ pl: '10px', pr: '10px', mt: 1, mb: 2 }}>
              <Stepper orientation="vertical" connector={<VerticalConnector />}>
                {Object.entries(sectionData.topics).flatMap(([topicName, topicData]) =>
                  Object.entries(topicData.items).map(([itemName, itemData]) => {
                    const stepKey = `${sectionName}-${topicName}-${itemName}`; // Unique key for each item
                    const isActive = activeStep === stepKey; // Check if this item is active

                    return (
                      <Step key={itemName} onClick={() => handleStepClick(sectionName, topicName, itemName)}>
                        <StepLabel
                          StepIconComponent={({ active }) => (
                            <StepIconContainer>
                              <StepIcon active={isActive} />
                            </StepIconContainer>
                          )}
                          sx={{
                            cursor: 'pointer',
                            padding: 0,
                            '& .MuiStepLabel-label': {
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontWeight: isActive ? '600' : '400',
                              fontSize: '13px',
                              color: isActive ? 'white' : '#666',
                              opacity: isActive ? 1 : 0.2,
                              marginLeft: '12px',
                            },
                            '& .MuiStepLabel-iconContainer': {
                              padding: 0,
                            },
                          }}
                        >
                          <itemData.icon sx={{ fontSize: '18px', fontWeight: '600', color: isActive ? '#FFFFFF' : '#FFFFFF' }} />
                          {itemName}
                        </StepLabel>
                      </Step>
                    );
                  })
                )}
              </Stepper>
            </Box>
          )}
        </React.Fragment>
      ))}

      {/* Render Chapter 1 Quiz and Chapter 1 Notes headings */}
      {Object.entries(navigationData.AdditionalSections).map(([sectionName, sectionData]) => (
        <React.Fragment key={sectionName}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', px: '8px', py: '4px' }}>
              <sectionData.icon sx={{ fontSize: '18px', color: '#FFFFFF', mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '16px', cursor: 'pointer' }}>
                {sectionName}
              </Typography>
            </Box>
            <FadedDivider />
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default NavigationComponent;