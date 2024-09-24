import { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ReportScheduler = () => {
  const [frequency, setFrequency] = useState('');

  const handleScheduleReport = () => {
    // Handle scheduling logic
  };

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>Frequency</InputLabel>
        <Select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleScheduleReport}>
        Schedule Report
      </Button>
    </div>
  );
};

export default ReportScheduler;
