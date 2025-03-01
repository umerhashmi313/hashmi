import React from 'react';
import { Box, Typography } from "@mui/material";
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import { useLocation } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Videopage() {
  const location = useLocation();
  const { video } = location.state || {};

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
          borderRadius: 5,
          width: { xs: '100%', sm: 'fit-content' },
          backgroundColor: 'white',
          height: 'fit-content',
          overflowX: 'hidden',
        }}
      >
        {/* Use video.title here */}
        <Typography
          sx={{
            fontSize: '36px',
            fontWeight: '900',
            lineHeight: '120%',
          }}
        >
          {video?.title || "No Title Available"}
        </Typography>

        {/* Replace the image overlay Box with an iframe using video.url */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: '208px', sm: '367px' },
            borderRadius: 2,
            boxShadow: 5,
            overflow: 'hidden',
          }}
        >
          <iframe 
            width="100%" 
            height="100%" 
            src={video?.url || ""} 
            title={video?.title || "Video"} 
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </Box>

        <Box
          sx={{
            width: { xs: 'fit-content', sm: '654px' },
            mt: '-10px',
            mb: { xs: '150px', sm: '40px' },
          }}
        >
          <Typography sx={{ color: '#7F8184' }}>
            Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend. Helo how are you my dear friend.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <SecondaryButton variant="contained">Back</SecondaryButton>
          <PrimaryButton variant="contained">Next</PrimaryButton>
        </Box>
      </Box>
    </>
  );
}

export default Videopage;
