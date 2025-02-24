import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert,Link,  Checkbox, FormControlLabel } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import backgroundImage from '../../Assets/mntr.svg';
import LogoImage from '../../Assets/logo.svg';
import IllustrationImage from '../../Assets/illustration.svg';
import { Link as RouterLink } from "react-router-dom";

const LoginPage = ({onLogin}) => {

    console.log("LoginPage received onLogin:", onLogin); // Debugging line
  
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
    <Container maxWidth="xl" sx={{ display: 'flex',  height: {xs:'100%',sm:'100vh'}, m: '0' }}>
    <Box
      sx={{
        display:{xs:'none' , sm:'flex'},
        flex:2.8,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize:'cover',
        backgroundPosition: 'center',
        height: 'auto',
        
       
      }}
    ></Box>

    <Box sx={{ flex: 1, display: 'flex', width: '100%', flexDirection: 'column', backgroundColor: '#fff', padding: '48px', gap: '48px' ,ml:{xs:'-25px'} }}>
      <Box
        sx={{
          width: '100%',
          height: '50px',
          backgroundImage: `url(${LogoImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'start',
          backgroundRepeat: 'no-repeat',
          marginBottom: 2,
          display: 'flex',
        }}
      />
      <Box sx={{ gap: '24px' }}>
        <Box
          sx={{
            width: '100%',
            overflowX:'hidden',
            justifyContent:'center',
            alignItems:'center',
            height: '244px',
            backgroundImage: `url(${IllustrationImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'start',
            backgroundRepeat: 'no-repeat',
            marginBottom: 2,
            display: 'flex',
          }}
        />
        <Box sx={{ gap: '48px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: '800' }}>Welcome! Sign up to get started.</Typography>

          <Box>
           

            <Box
              component="input"
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: "100%",
                padding: "12px",
                height: '30px',
                backgroundColor: "#E9E9E9",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                marginTop: '10px',
                fontSize: "16px",
              }}
            />

            <Box
              component="input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: "100%",
                padding: "12px",
                height: '30px',
                backgroundColor: "#E9E9E9",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                fontSize: "16px",
                marginTop: "10px",
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 1 }}>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>
          </Box>

          <Box sx={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
            <PrimaryButton sx={{ width: '100%' }} onClick={handleLogin}>Login</PrimaryButton>
            {/* <SecondaryButton sx={{ backgroundColor: '#31CEB8', width: '100%', my: '30px' }}>
              Sign Up With Google
            </SecondaryButton> */}
          </Box>

          {error && <Typography color="error">{error}</Typography>}

          <Box>
            <Typography>Dn't have an account?  <Link to="/signup" component={RouterLink}>SignUp</Link></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Container>
  );
};

export default LoginPage;







// {error && <Alert severity="error">{error}</Alert>}