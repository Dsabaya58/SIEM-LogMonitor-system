import { Box, Typography, Paper, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useState } from 'react';

const Settings = () => {
  const [notificationSetting, setNotificationSetting] = useState('instant');
  const [dataRetention, setDataRetention] = useState('30'); // days
  const [integrationService, setIntegrationService] = useState('');
  const [logSourceURL, setLogSourceURL] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState({
    viewLogs: false,
    manageUsers: false,
    configureSettings: false,
    viewReports: false
  });

  const roles = ['Admin', 'Analyst', 'Viewer'];
  const availablePermissions = [
    { name: 'View Logs', key: 'viewLogs' },
    { name: 'Manage Users', key: 'manageUsers' },
    { name: 'Configure Settings', key: 'configureSettings' },
    { name: 'View Reports', key: 'viewReports' }
  ];

  const handleNotificationChange = (event) => {
    setNotificationSetting(event.target.value);
  };

  const handleDataRetentionChange = (event) => {
    setDataRetention(event.target.value);
  };

  const handleIntegrationChange = (event) => {
    setIntegrationService(event.target.value);
  };

  const handleLogSourceChange = (event) => {
    setLogSourceURL(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handlePermissionChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked
    });
  };

  const handleSave = () => {
    // Collect all settings data
    const settingsData = {
      logSourceURL,
      integrationService,
      notificationSetting,
      dataRetention,
      selectedRole,
      permissions
    };
    
    // Here, you would typically send this data to your API or backend service
    console.log('Settings Saved:', settingsData);
    
    // For demonstration purposes, you can display an alert
    alert('Settings have been saved!');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Manage Log Sources */}
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Manage Log Sources
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Log Source URL" 
              variant="outlined" 
              value={logSourceURL}
              onChange={handleLogSourceChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" fullWidth>
              Add Source
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* User Roles & Permissions */}
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            User Roles & Permissions
          </Typography>
          <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              onChange={handleRoleChange}
              label="Role"
            >
              {roles.map(role => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormGroup>
            {availablePermissions.map(permission => (
              <FormControlLabel
                key={permission.key}
                control={
                  <Checkbox
                    checked={permissions[permission.key]}
                    onChange={handlePermissionChange}
                    name={permission.key}
                  />
                }
                label={permission.name}
              />
            ))}
          </FormGroup>
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Save Role & Permissions
          </Button>
        </Paper>
      </Box>

      {/* Integration Settings */}
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Integration Settings
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Integration Service</InputLabel>
            <Select
              value={integrationService}
              onChange={handleIntegrationChange}
              label="Integration Service"
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="sms">SMS</MenuItem>
              <MenuItem value="slack">Slack</MenuItem>
              <MenuItem value="pagerduty">PagerDuty</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Save Integration Settings
          </Button>
        </Paper>
      </Box>

      {/* Notification Settings */}
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Notification Method</InputLabel>
            <Select
              value={notificationSetting}
              onChange={handleNotificationChange}
              label="Notification Method"
            >
              <MenuItem value="instant">Instant Alerts</MenuItem>
              <MenuItem value="daily">Daily Digests</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Box>

      {/* Data Retention Policies */}
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Data Retention Policies
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Retention Period</InputLabel>
            <Select
              value={dataRetention}
              onChange={handleDataRetentionChange}
              label="Retention Period"
            >
              <MenuItem value="7">7 Days</MenuItem>
              <MenuItem value="30">30 Days</MenuItem>
              <MenuItem value="90">90 Days</MenuItem>
              <MenuItem value="180">180 Days</MenuItem>
              <MenuItem value="365">1 Year</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Box>

      {/* Save Settings Button */}
      <Box mt={4}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
          Save All Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
