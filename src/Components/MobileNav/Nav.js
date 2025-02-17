import React from 'react';
import { Box } from '@mui/material';
import { RiMenuUnfold3Fill } from 'react-icons/ri';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Nav() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 222,
          width: '100%',
          padding: '16px',
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
           
          }}
        >
          <Box
            sx={{
              color: 'white',
              fontSize: '24px',
              height: '32px',
              width: '32px',
              display: 'flex',
              alignItems: 'center', // Center the icon vertically
              justifyContent: 'center', // Center the icon horizontally
            }}
          >
            <RiMenuUnfold3Fill />
          </Box>

          <Box>
            <img
              src="/insighticon.png" // Adjust path if the file is in a subfolder
              alt="Insight Icon"
              style={{
                width: '92px', // Adjust width
                height: '32px', // Maintain aspect ratio
              }}
            />
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            height:'30px',
            alignItems:'center'

          }}
        >
          <SearchIcon sx={{ fontSize: '20px'  }} /> {/* Set size to 15 */}
          <NotificationsIcon sx={{ fontSize: '20px' }} /> {/* Set size to 15 */}
          <AccountCircleIcon sx={{ fontSize: '25px' }} /> {/* Set size to 20 */}
        </Box>
      </Box>
    </>
  );
}

export default Nav;