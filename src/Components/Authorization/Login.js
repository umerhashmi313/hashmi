import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, Link, Checkbox, FormControlLabel, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import backgroundImage from '../../Assets/mntr.svg';
import LogoImage from '../../Assets/logo.svg';
import IllustrationImage from '../../Assets/illustration.svg';
import { Link as RouterLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Make sure to initialize react-toastify somewhere in your app, for example in your root component:
// toast.configure();

const LoginPage = ({ onLogin }) => {
  console.log("LoginPage received onLogin:", onLogin); // Debugging line

  // State for user credentials, error message, loading status and password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle login API call
  const handleLogin = async () => {
    setError(''); // Clear previous errors
    setIsLoading(true); // Start loader
  
    try {
      const response = await fetch('https://backend-lms-xpp7.onrender.com/api/Login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid email or password');
        } else if (response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(`Error: ${response.statusText}`);
        }
        setIsLoading(false);
        return;
      }
  
      const data = await response.json();
  
      if (!data.access) {
        console.error("No access token found in API response.");
        setIsLoading(false);
        return;
      }
  
      toast.success("Login Successful", {
        autoClose: 2000,
        hideProgressBar: true,
        style: { backgroundColor: "#4caf50", color: "white" },
      });
  
      // Store token, user_id, and role in local storage
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('userId', data.user_id);
      localStorage.setItem('userRole', data.role); // Store role
  
      console.log("Stored Credentials:", {
        token: localStorage.getItem("authToken"),
        userId: localStorage.getItem("userId"),
        role: localStorage.getItem("userRole"),
      });
  
      // Pass token and role to Main component
      onLogin(data.access, data.role);
    } catch (error) {
      console.error("Login Error:", error);
      setError('Network error. Please check your connection.');
    }
    setIsLoading(false);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', height: '100%', m: '0' }}>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flex: 2.8,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'auto',
        }}
      ></Box>

      <Box sx={{ flex: 1, display: 'flex', width: '100%', flexDirection: 'column', backgroundColor: '#fff', padding: '48px', gap: '48px', ml: { xs: '-25px' } }}>
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
              overflowX: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
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
            <Typography sx={{ fontSize: '20px', fontWeight: '800' }}>Welcome! Sign in to get started.</Typography>

            <Box>
              <TextField
                variant="outlined"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{
                  backgroundColor: "#E9E9E9",
                  borderRadius: "8px",
                  marginTop: '10px',
                  '& fieldset': { border: 'none' },
                }}
              />

              <TextField
                variant="outlined"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{
                  backgroundColor: "#E9E9E9",
                  borderRadius: "8px",
                  marginTop: '10px',
                  '& fieldset': { border: 'none' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
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
              <PrimaryButton
                sx={{ width: '100%' }}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} sx={{color:'white'}} /> : "Login"}
              </PrimaryButton>
              {/* Uncomment below if needed
              <SecondaryButton sx={{ backgroundColor: '#31CEB8', width: '100%', my: '30px' }}>
                Sign Up With Google
              </SecondaryButton> */}
            </Box>

            {error && <Typography color="error">{error}</Typography>}

            <Box>
              <Typography>
                Don't have an account? <Link to="/signup" component={RouterLink}>SignUp</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
