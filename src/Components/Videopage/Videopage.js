import React from 'react'
import { Box, Typography, Paper, Button, Grid, Checkbox } from "@mui/material";
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons'
import img from '../../Assets/neuron.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
function Videopage() {
  return (
    <>
    <Box
            sx={{
              display: 'flex',
              flexDirection:'column',
              // border:'1px solid black',
              gap: '16px',
              padding:'16px',
              borderRadius:5,
              width:{xs:'100%', sm:'fit-content'},
              backgroundColor:'white',
              height:'fit-content',
              overflowX:'hidden',
              
            }}
          >
            <Typography sx={{
              fontSize:'36px',
               fontWeight:'900',
               lineHeight:'120%',
            
            }} >
                       Heading 1 
            </Typography>
            <Box
      sx={{
        position: 'relative', // Required for absolute positioning of the overlay
      
        height: {xs:'208px' , sm:'367px'},
        borderRadius: 2,
        boxShadow: 5,
        overflow: 'hidden', // Ensures the overlay respects the border radius
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={img} // Fetch image from questions array
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.56)', // 56% opacity black
          borderRadius: 2, // Match the image's border radius
          zIndex: 1, // Ensure the overlay is above the image but below the icon
        }}
      />

      {/* Play Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '42%',
          zIndex: 2, // Ensure the icon is above the overlay
          color: 'white', // Icon color
        }}
      >
        <PlayArrowIcon
          sx={{
            width: '80px',
            height: '70px',
          }}
        />
      </Box>
    </Box>

       <Box sx={{
        width:{xs:'fit-content', sm:'654px'},
        mt:'-10px',
        mb:{xs:'150px', sm:'40px'}

       }}>
        <Typography sx={{
          color:'#7F8184'
        }}>
            Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend.
        </Typography>
       </Box>

        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%'}}>
                 <SecondaryButton variant="contained" >Back</SecondaryButton>
                 <PrimaryButton variant="contained" >Next</PrimaryButton>
               </Box>
                             </Box>
                             </>
  )
}

export default Videopage
