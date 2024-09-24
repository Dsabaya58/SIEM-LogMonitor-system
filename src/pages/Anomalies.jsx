import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableContainer,
  Button,
  Modal,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination
} from '@mui/material';
import Chart from 'react-apexcharts';

const initialAnomaliesData = [
  { id: 1, timestamp: '2024-09-17 12:30:00', source: 'Web Server', severity: 'High', description: 'Multiple failed logins', status: 'Under Investigation' },
  { id: 2, timestamp: '2024-09-17 12:35:00', source: 'Firewall', severity: 'Medium', description: 'Port scanning detected', status: 'Resolved' },
  // Add more dummy data here for pagination to work
  { id: 3, timestamp: '2024-09-17 13:00:00', source: 'Database', severity: 'Low', description: 'Slow query detected', status: 'False Positive' },
  { id: 4, timestamp: '2024-09-17 13:30:00', source: 'Application Server', severity: 'High', description: 'Memory usage spike', status: 'Under Investigation' },
  { id: 5, timestamp: '2024-09-17 14:00:00', source: 'Web Server', severity: 'Medium', description: 'Suspicious file upload detected', status: 'Under Investigation' }
];

// Time-series data for historical view (anomalies over time)
const historicalData = {
  series: [
    {
      name: 'Anomalies',
      data: [1, 3, 2, 4, 6, 5, 7, 8]  // Example data
    }
  ],
  options: {
    chart: {
      type: 'line'
    },
    xaxis: {
      categories: ['Sept 10', 'Sept 11', 'Sept 12', 'Sept 13', 'Sept 14', 'Sept 15', 'Sept 16', 'Sept 17']
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Anomalies Over Time'
    }
  }
};

const Anomalies = () => {
  const [anomaliesData, setAnomaliesData] = useState(initialAnomaliesData);  
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [anomalyStatus, setAnomalyStatus] = useState('');
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenModal = (anomaly) => {
    setSelectedAnomaly(anomaly);
    setAnomalyStatus(anomaly.status);  
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStatusChange = (event) => {
    setAnomalyStatus(event.target.value);
  };

  const handleSaveChanges = () => {
    const updatedAnomalies = anomaliesData.map(anomaly =>
      anomaly.id === selectedAnomaly.id ? { ...anomaly, status: anomalyStatus } : anomaly
    );
    setAnomaliesData(updatedAnomalies);  
    handleCloseModal(); 
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Anomalies
      </Typography>

      {/* Anomaly Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {anomaliesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(anomaly => (
              <TableRow key={anomaly.id}>
                <TableCell>{anomaly.timestamp}</TableCell>
                <TableCell>{anomaly.source}</TableCell>
                <TableCell>{anomaly.severity}</TableCell>
                <TableCell>{anomaly.description}</TableCell>
                <TableCell>{anomaly.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(anomaly)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={anomaliesData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Anomaly Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="anomaly-details-title"
        aria-describedby="anomaly-details-description"
      >
        <Box
          p={4}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            backgroundColor: 'white',
            boxShadow: 24,
            borderRadius: 8
          }}
        >
          {selectedAnomaly && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" id="anomaly-details-title">
                  Anomaly Details
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Timestamp:</strong> {selectedAnomaly.timestamp}
                </Typography>
                <Typography variant="body1">
                  <strong>Source:</strong> {selectedAnomaly.source}
                </Typography>
                <Typography variant="body1">
                  <strong>Severity:</strong> {selectedAnomaly.severity}
                </Typography>
                <Typography variant="body1">
                  <strong>Description:</strong> {selectedAnomaly.description}
                </Typography>
                {/* Placeholder for source log entry */}
                <Typography variant="body1">
                  <strong>Source Log Entry:</strong> [Log entry details...]
                </Typography>
                {/* Placeholder for events leading up to the anomaly */}
                <Typography variant="body1">
                  <strong>Associated Events:</strong> [Event details...]
                </Typography>
                {/* Dropdown for anomaly status */}
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={anomalyStatus} onChange={handleStatusChange} label="Status">
                    <MenuItem value="Under Investigation">Under Investigation</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="False Positive">False Positive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'right' }}>
                {/* Save Button */}
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>

      {/* Historical View */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Historical View
        </Typography>
        <Chart options={historicalData.options} series={historicalData.series} type="line" height={300} />
      </Box>
    </Box>
  );
};

export default Anomalies;
