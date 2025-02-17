import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, Button, Grid, Checkbox } from "@mui/material";
import { IconButton, Slider, Menu, MenuItem } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SpeedIcon from '@mui/icons-material/Speed';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopIcon from '@mui/icons-material/StopCircle';

// Helper function to format seconds into minutes:seconds format
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);

  // This function is triggered when the audio is playing or time is updated
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Set the audio's duration when the metadata is loaded
  const handleDurationLoaded = () => {
    setDuration(audioRef.current.duration);
  };

  // Play or pause the audio
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle slider change (to manually adjust the time)
  const handleSliderChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  // Handle playback speed changes
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
    audioRef.current.playbackRate = event.target.value;
    setAnchorEl(null);
  };

  // Open the speed menu
  const handleSpeedMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the speed menu
  const handleCloseSpeedMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Update currentTime while playing
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval when not playing
    }
  }, [isPlaying]);

  return (
    <Box sx={{
     width:{sm:'653px', xs:'100%' },
     height:'fit-content',
     boxSizing:'border-box',
     backgroundColor : '#03162A',
     display:'flex',
     padding:'16px',
     flexDirection:'row',
     justifyContent:'flex-start',
     borderRadius:'16px',
     boxShadow:15
        }}>
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <IconButton onClick={handlePlayPause}>
        {isPlaying ? <StopIcon  sx={{
          width:{sm:'90px', xs:'45px'} , height:{sm:'90px', xs:'45px'} , color:'white'
        }} /> : <PlayCircleOutlineIcon sx={{
           width:{sm:'90px', xs:'45px'} , height:{sm:'90px', xs:'45px'} , color:'white'
        }} />}
      </IconButton>

      <Box sx={{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:'16px',
        color:'white'


      }}>
      
      {/* Show formatted current time / total time */}
      <Typography variant="body2" sx={{
      }} >
        {formatTime(currentTime)} / {formatTime(duration)}
      </Typography>
      {/* Progress bar */}
      <Slider
        value={currentTime}
        min={0}
        max={duration}
        onChange={handleSliderChange}
        onMouseUp={handleTimeUpdate}
        style={{ flex: 1 , color:'white'
        }}
      />
   

      {/* Speed menu */}
      <IconButton  sx={{
        color:'white'
      }} onClick={handleSpeedMenuClick}>
        <SpeedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseSpeedMenu}
      >
        <MenuItem onClick={() => handleSpeedChange({ target: { value: 0.5 } })}>0.5x</MenuItem>
        <MenuItem onClick={() => handleSpeedChange({ target: { value: 1 } })}>1x</MenuItem>
        <MenuItem onClick={() => handleSpeedChange({ target: { value: 1.5 } })}>1.5x</MenuItem>
        <MenuItem onClick={() => handleSpeedChange({ target: { value: 2 } })}>2x</MenuItem>
      </Menu>
      </Box>

      {/* Audio element */}
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/Audio.mp3`} // Reference the audio in the public folder
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleDurationLoaded}
      />
    </div>
    </Box>
  );
}

export default AudioPlayer;
