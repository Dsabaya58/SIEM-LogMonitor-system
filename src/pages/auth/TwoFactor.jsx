import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });

      const result = await response.json();

      if (result.success) {
        setSeverity('success');
        setMessage('OTP verified successfully!');
      } else {
        setSeverity('error');
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setSeverity('error');
      setMessage('An error occurred. Please try again later.');
    }

    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f4f4"
      p={3}
    >
      <Paper elevation={3} sx={{ width: 400, padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Two-Factor Authentication
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter OTP"
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Verify
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TwoFactorAuth;
