import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        p: 2,
        textAlign: 'center',
        width: '100%',
        position: 'fixed',   // Fixed position
        bottom: 0,           // Stick it to the bottom
        left: 240,             // Ensure it aligns to the left side
        zIndex: 1201,        // Ensure it stays above other content
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2024 SIEM Tool. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
