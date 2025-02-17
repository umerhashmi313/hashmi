import React from 'react'
import { Box, Typography, Paper, Button, Grid, Checkbox } from "@mui/material";
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons'
import img from '../../Assets/neuron.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AudioPlayer from './VoiceNote';
function Notespage() {
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
              boxShadow:10,

              
            }}
          >
            
           <AudioPlayer/>

           <Typography sx={{
              fontSize:'36px',
               fontWeight:'900',
               lineHeight:'120%',
            
            }} >
                       Heading 1 
            </Typography>

       <Box sx={{
        width:{xs:'fit-content', sm:'654px'},
    
       

       }}>
        <Typography sx={{
          color:'#7F8184'
        }}>
            Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend.
            Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend.
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

export default Notespage
