import { Box, Typography, Paper, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
import { useState } from 'react';

const Profile = () => {
  const [notifications, setNotifications] = useState('email');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const handleNotificationChange = (event) => {
    setNotifications(event.target.value);
  };

  const handleTwoFAChange = (event) => {
    setTwoFAEnabled(event.target.checked);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      {/* Profile Information */}
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Password Management */}
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Current Password" type="password" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="New Password" type="password" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Update Password
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Notification Preferences */}
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Notification Method</InputLabel>
            <Select
              value={notifications}
              onChange={handleNotificationChange}
              label="Notification Method"
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="sms">SMS</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Box>

      {/* 2FA Settings */}
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Two-Factor Authentication
          </Typography>
          <FormControlLabel
            control={<Switch checked={twoFAEnabled} onChange={handleTwoFAChange} />}
            label="Enable Two-Factor Authentication"
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
