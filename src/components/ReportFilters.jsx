import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const ReportFilters = () => {
  const [dateRange, setDateRange] = useState('');
  const [logSource, setLogSource] = useState('');
  const [logType, setLogType] = useState('');

  const handleGenerateReport = () => {
    // Handle report generation logic
  };

  return (
    <div>
      <TextField
        label="Date Range"
        type="date"
        fullWidth
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Log Source</InputLabel>
        <Select
          value={logSource}
          onChange={(e) => setLogSource(e.target.value)}
        >
          <MenuItem value="source1">Source 1</MenuItem>
          <MenuItem value="source2">Source 2</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Log Type</InputLabel>
        <Select
          value={logType}
          onChange={(e) => setLogType(e.target.value)}
        >
          <MenuItem value="error">Error</MenuItem>
          <MenuItem value="warning">Warning</MenuItem>
          <MenuItem value="info">Info</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleGenerateReport}>
        Generate Report
      </Button>
    </div>
  );
};

export default ReportFilters;
