import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';
import backgroundImage from '../../Assets/login.avif';

const LoginPage = ({ onLogin }) => {
  // State for user credentials and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login API call
  const handleLogin = async () => {
    setError(''); // Clear previous errors
  
    try {
      const response = await fetch('https://backend-lms-xpp7.onrender.com/api/Login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Raw Response:", response); // Debugging API response
  
      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid email or password'); // Authentication error
        } else if (response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(`Error: ${response.statusText}`);
        }
        return;
      }
  
      const data = await response.json();
      console.log("Parsed Response Data:", data); // Debugging API response
     
      
      if (!data.access) {
        console.error("No access token found in API response.");
        return;
      }
      alert('Login Successful');
      localStorage.setItem('authToken', data.access); // Store token
      localStorage.setItem('userId', data.user_id);
  
   
      console.log("Token & User ID Stored:", {
        token: localStorage.getItem("authToken"),
        userId: localStorage.getItem("userId"),
  
    });
  
      onLogin(data.access); // Pass token to Main.js

    } catch (error) {
      console.error("Login Error:", error);
      setError('Network error. Please check your connection.');
    }
  };
  
  

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f7f7f7',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: 4,
            boxShadow: 3,
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 3 }} align="center">
            Login
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
