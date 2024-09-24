import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      setTimeout(() => setError(''), 5000); 
      return;
    }

    // Reset password logic here (API call)
    // For demonstration, we'll just log the values
    console.log({ tempPassword, newPassword });

    // Simulate success
    setSuccess('Password has been reset successfully.');
    setError('');
    setTimeout(() => setSuccess(''), 5000); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, position: 'relative' }}>
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>

        <TextField
          label="Temporary Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}

        <Button
          variant="contained"
          color="primary"
          onClick={handleResetPassword}
          sx={{ mt: 2 }}
        >
          Reset Password
        </Button>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton component={Link} to="/login">
            <ArrowBack />
          </IconButton>
          <Typography variant="body2" align="center" mt={1}> Back to login</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
