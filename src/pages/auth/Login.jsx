import { useState } from 'react';
import { TextField, Button, Typography, Box, Link, Grid, Paper } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false); 

  const handleLogin = () => {
    // Handle login logic (API call to authenticate user)
    console.log({ username, password, twoFactorCode });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login to SIEM TOOL
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {is2FAEnabled && (
          <TextField
            label="2FA Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={twoFactorCode}
            onChange={(e) => setTwoFactorCode(e.target.value)}
          />
        )}

          <Grid item xs sx={{ mt: 2, ml: 0, textDecoration: 'none'}}>
            <Link href="/forgotpassword" variant="body2">
              Forgot password?
            </Link>
          </Grid>

        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2, width: '100%' }}>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
