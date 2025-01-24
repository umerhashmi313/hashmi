import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#e3f2fd',    // Light blue for backgrounds
      main: '#2196f3',     // Medium blue
      dark: '#1976d2',     // Dark blue for buttons
      lighter: '#f5fbff'   // Very light blue for secondary button
    },
    // ... other palette configurations
  },
  // ... other theme customizations
});

export default theme;