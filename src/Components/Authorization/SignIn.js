import React, { useState } from 'react';
import { Box, Typography, Container, Link, Checkbox, FormControlLabel } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons';
import backgroundImage from '../../Assets/mntr.svg';
import LogoImage from '../../Assets/logo.svg';
import IllustrationImage from '../../Assets/illustration.svg';
import { Link as RouterLink } from "react-router-dom";

const SignPage = ({ onSignUpSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle Sign Up API call
  const handleSignUp = async () => {
    setError(""); // Clear previous errors

    try {
      const payload = {
        email,
        full_name: fullName,
        role: "student",
        is_staff: false,
        is_superuser: false,
        password,
        roll_no: "null",
      };

      const response = await fetch("https://backend-lms-xpp7.onrender.com/api/Students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
        return;
      }

      alert("Sign-Up Successful! Please log in.");
      onSignUpSuccess(); // Redirect to login page
    } catch (error) {
      console.error("Sign-Up Error:", error);
      setError("Network error. Please check your connection.");
    }
  };
  
  

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', height: '100%', m: '0' }}>
      <Box
        sx={{
          flex: 2.8,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'auto',
        }}
      ></Box>

      <Box sx={{ flex: 1, display: 'flex', width: '100%', flexDirection: 'column', backgroundColor: '#fff', padding: '48px', gap: '48px' }}>
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
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                sx={{
                  width: "100%",
                  padding: "12px",
                  height: '30px',
                  backgroundColor: "#E9E9E9",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                }}
              />

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
              <PrimaryButton sx={{ width: '100%' }} onClick={handleSignUp}>Sign Up</PrimaryButton>
              <SecondaryButton sx={{ backgroundColor: '#31CEB8', width: '100%', my: '30px' }}>
                Sign Up With Google
              </SecondaryButton>
            </Box>

            {error && <Typography color="error">{error}</Typography>}

            <Box>
              <Typography>Already have an account?  <Link to="/login" component={RouterLink}>Login</Link></Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignPage;
