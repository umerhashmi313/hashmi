import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const StepperContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  position: 'relative',
}));

const StepperItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  marginBottom: theme.spacing(4),
  '&:last-child': {
    marginBottom: 0,
    '&:before': {
      display: 'none',
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    left: '15px',
    top: '28px',
    bottom: 0,
    width: '2px',
    backgroundColor: '#4a90e2',
  }
}));

const StepperDot = styled(Box)(({ theme }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  backgroundColor: '#4a90e2',
  marginRight: theme.spacing(2),
  position: 'relative',
  zIndex: 2,
}));

const StepperContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
}));

export default function ContentStepper() {
  const steps = [
    'MDCAT English Video',
    'MDCAT English Quiz',
    'MDCAT English Blog'
  ];

  return (
    <StepperContainer>
      {steps.map((step, index) => (
        <StepperItem key={index}>
          <StepperDot />
          <StepperContent>
            <Typography variant="h6" component="div" sx={{ 
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 500,
              marginLeft: '20px'
            }}>
              {step}
            </Typography>
          </StepperContent>
        </StepperItem>
      ))}
    </StepperContainer>
  );
}