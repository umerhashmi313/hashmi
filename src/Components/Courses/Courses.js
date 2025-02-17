import React from 'react'
import { Box, Typography, Paper, Button, Grid, Checkbox } from "@mui/material";
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons'
import img from '../../Assets/neuron.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StackBars from './Charts';
import NavigationComponent from './CoursesItem';
function Courses() {
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
                       Course Title
            </Typography>
           

       <Box sx={{
        width:{xs:'fit-content', sm:'654px'},
        mt:'-10px',
    

       }}>
        <Typography sx={{
          color:'#7F8184'
        }}>
            Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend.
        </Typography>
       </Box>

       <Box>
                 <Box>
                    <StackBars/>
                 </Box>

                   <Typography variant='h2'  sx={{
                    fontSize:'24px',
                    fontWeight:900,
                    mb:'8px'
                   }}>
                    Course Outline :
                   </Typography>

                   <NavigationComponent/>
                </Box>

        <Box sx={{ display: 'flex', gap: '8px',mt:'-70px', justifyContent: 'center',alignItems:'center', width: '100%' , flexDirection:'column'}}>
                 <PrimaryButton variant="contained" sx={{fontSize:'16px' }} >Start Quiz</PrimaryButton>
                 <SecondaryButton variant="contained" sx={{fontSize:'16px', color:'#063565'}}>View Previous Results</SecondaryButton>
                 
               </Box>


             
 </Box>
                             </>
  )
}

export default Courses

