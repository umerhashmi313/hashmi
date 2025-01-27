import { 
  Box, 
  Typography, 
  Button, 
  Stack, 
  styled 
} from '@mui/material';

import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons'

import { dashboardData } from './DemoMain'; // Adjust import path as needed
import './Main.css'

const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#EAFAF8',
  borderRadius: '8px',
  padding:'8px',
  height: '40px',
  width: '654',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #E9E9E9',
  gap:'8px',
  boxSizing: 'border-box', // Add this to include border/padding in height
}));




export default function ScholarshipCard() {
  const { Dashboard } = dashboardData;
  const stats = ['Questions', 'PassRate', 'Duration', 'Score'];

  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <Box  sx={{ 
      maxWidth: 686, 
      mt: -5, 
      mx: 'auto',
      padding: '16px',
      // height: 458, // Consider removing fixed height if content varies
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: 5,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Add this
    }}>
      {/* Content Section */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flex: 1 // Add this to take available space
      }}>
      
      
      <Box sx={{
        
        display: 'flex',
  flexDirection: 'column',
  gap: '8px'
      }}> 
      {/* Header */}
      <Box sx={{
        gap:'8px'
      }}>
      <Typography   sx={{ 
        fontWeight: 900,
        color: 'black',
        fontSize : '12px',
        
      }}>
        MODULE 1 > CHAPTER 
      </Typography>
      <Typography  gutterBottom sx={{ 
        fontWeight: 700,
        color: '#03162A',
        fontSize : '32px',
        lineHeight :'120%'
      }}>
        MegaScholarship
      </Typography>
        </Box>
      

      {/* Description */}
      <Typography variant="body1" color="text.secondary" sx={{
        height:'72px',
        gap:'8px'
      }} paragraph >
        When you land on a sample web page or open an email template and see content beginning with 
        "forem ipsum," the page creator placed that apparent gibberish there on purpose. Page layouts 
        look better with something in each section.
      </Typography>
      </Box>

      {/* Dynamic Stats Section */}
      <Box sx={{
        height:'184px',
        gap : '8px',
         flex: 1 

      }
      }><Stack spacing={1} >
        {stats.map((key) => {
          const { icon: Icon, Text } = Dashboard[key];
          return (
            <StatCard key={key}>
              <Icon sx={{ color: '#000000', height:'20px' , width:'20px'}} />
              <Typography variant="body1" sx={{ fontSize: '16px' ,  lineHeight:'150%' }} color="#212B36"  fontWeight={400}>
                {Text}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '16px', 
                  ml: 'auto', 
                  color: '#7F8184', 
                  fontWeight: 400,
                  lineHeight:'150%'
                }}
              >
                {formatLabel(key)}
              </Typography>
            </StatCard>
          );
        })}
      </Stack>
      </Box>
   
   </Box>
    

      {/* Action Buttons */}
      <Box sx={{ 
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        marginTop: '32px', // Add this to push to bottom
       
      }}>
        <PrimaryButton variant="contained">
          Start Quiz
        </PrimaryButton>
        <SecondaryButton variant="contained">
          View Previous Result
        </SecondaryButton>
      </Box>

    </Box>
  );
}



