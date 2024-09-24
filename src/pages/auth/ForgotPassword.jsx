import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link
} from '@mui/material';

const ForgotPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle password reset logic
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
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </form>
        <Typography variant="body2" align="center" mt={2}>
          Remembered your password?{' '}
          <Link href="/login" variant="body2">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
