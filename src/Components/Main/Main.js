import { 
  Box, 
  Typography, 
  Button, 
  Stack, 
  styled 
} from '@mui/material';


import { dashboardData } from './DemoMain'; // Adjust import path as needed
import './Main.css'

const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#EAFAF8',
  borderRadius: '8px',
  padding: theme.spacing(3),
  height: '10px',
  width: '93%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: '2px solid #E9E9E9'
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#021C33',
  color: 'white',
  borderRadius: '8px',
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  height:'52px',
  width:'350px'
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#021C33',
  borderRadius: '8px',
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
   height:'52px',
  width:'350px'
}));


export default function ScholarshipCard() {
  const { Dashboard } = dashboardData;
  const stats = ['Questions', 'PassRate', 'Duration', 'Score'];

  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <Box sx={{ 
      maxWidth: 718, 
      mt: -4, 
      mx: 'auto',
      p: 3,
      maxHeight: 500,
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: 3
    }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 700,
        color: '#03162A',
        mb: 3
      }}>
        MegaScholarship
      </Typography>

      {/* Description */}
      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
        When you land on a sample web page or open an email template and see content beginning with 
        "forem ipsum," the page creator placed that apparent gibberish there on purpose. Page layouts 
        look better with something in each section.
      </Typography>

      {/* Dynamic Stats Section */}
      <Stack spacing={1} sx={{ mb: 1 }}>
        {stats.map((key) => {
          const { icon: Icon, Text } = Dashboard[key];
          return (
            <StatCard key={key}>
              <Icon sx={{ color: '#031D38', fontSize: 32 }} />
              <Typography variant="body1" sx={{ fontSize: '16px' }} color="#031D38" fontWeight={500}>
                {Text}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '16px', 
                  ml: 'auto', 
                  color: '#7F8184', 
                  fontWeight: 500 
                }}
              >
                {formatLabel(key)}
              </Typography>
            </StatCard>
          );
        })}
      </Stack>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2, mx: 3 }}>
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



