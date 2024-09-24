import React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ExportOptions = () => {
  const [format, setFormat] = React.useState('');

  const handleExport = () => {
    // Handle export logic
  };

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>Export Format</InputLabel>
        <Select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <MenuItem value="pdf">PDF</MenuItem>
          <MenuItem value="csv">CSV</MenuItem>
          <MenuItem value="json">JSON</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleExport}>
        Export Report
      </Button>
    </div>
  );
};

export default ExportOptions;
