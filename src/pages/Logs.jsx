import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Modal,
  Button,
  InputLabel,
  Grid,
  TablePagination
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { Search, FileDownload } from '@mui/icons-material';

const logsData = [
  { id: 1, timestamp: '2024-09-17 12:30:00', source: 'Web Server', level: 'Error', message: 'Failed login attempt', ip: '192.168.1.1', userActivity: 'Failed Login' },
  { id: 2, timestamp: '2024-09-17 12:35:00', source: 'Firewall', level: 'Warning', message: 'Port scanning detected', ip: '192.168.1.2', userActivity: 'N/A' },
  { id: 3, timestamp: '2024-09-17 12:40:00', source: 'Database', level: 'Error', message: 'Database connection timeout', ip: '192.168.1.3', userActivity: 'N/A' },
  { id: 4, timestamp: '2024-09-17 12:45:00', source: 'Web Server', level: 'Info', message: 'User successfully logged in', ip: '192.168.1.4', userActivity: 'User Login' },
  { id: 5, timestamp: '2024-09-17 12:50:00', source: 'Application', level: 'Warning', message: 'High memory usage detected', ip: '192.168.1.5', userActivity: 'N/A' },
  { id: 6, timestamp: '2024-09-17 12:55:00', source: 'Database', level: 'Error', message: 'Query execution failed', ip: '192.168.1.6', userActivity: 'N/A' },
  { id: 7, timestamp: '2024-09-17 13:00:00', source: 'Web Server', level: 'Error', message: 'Unauthorized access attempt', ip: '192.168.1.7', userActivity: 'Access Attempt' },
  { id: 8, timestamp: '2024-09-17 13:05:00', source: 'Firewall', level: 'Info', message: 'Inbound traffic allowed', ip: '192.168.1.8', userActivity: 'N/A' },
  { id: 9, timestamp: '2024-09-17 13:10:00', source: 'Application', level: 'Error', message: 'Unhandled exception occurred', ip: '192.168.1.9', userActivity: 'N/A' },
  { id: 10, timestamp: '2024-09-17 13:15:00', source: 'Web Server', level: 'Info', message: 'Session expired for user', ip: '192.168.1.10', userActivity: 'Session Expired' }
];

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [logDetails, setLogDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleOpenModal = (log) => {
    setLogDetails(log);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredLogs = logsData.filter(log => {
    return (
      (selectedSource ? log.source === selectedSource : true) &&
      (selectedLevel ? log.level === selectedLevel : true) &&
      (searchTerm ? log.message.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  });

  const paginatedLogs = filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Logs
      </Typography>

      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            placeholder="Search logs..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton edge="end">
                  <Search />
                </IconButton>
              ),
            }}
          />
          <FormControl fullWidth variant="outlined" size="small" style={{ marginLeft: '16px' }}>
            <InputLabel>Source</InputLabel>
            <Select
              value={selectedSource}
              onChange={handleSourceChange}
              label="Source"
            >
              <MenuItem value="">All Sources</MenuItem>
              <MenuItem value="Web Server">Web Server</MenuItem>
              <MenuItem value="Firewall">Firewall</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" size="small" style={{ marginLeft: '16px' }}>
            <InputLabel>Level</InputLabel>
            <Select
              value={selectedLevel}
              onChange={handleLevelChange}
              label="Level"
            >
              <MenuItem value="">All Levels</MenuItem>
              <MenuItem value="Info">Info</MenuItem>
              <MenuItem value="Warning">Warning</MenuItem>
              <MenuItem value="Error">Error</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="white"
            style={{ marginLeft: '16px' }}
            startIcon={<FileDownload />}
          >
            <CSVLink
              data={filteredLogs}
              headers={[
                { label: "Timestamp", key: "timestamp" },
                { label: "Source", key: "source" },
                { label: "Log Level", key: "level" },
                { label: "Message", key: "message" }
              ]}
              filename={"logs.csv"}
            >
              Export 
            </CSVLink>
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Log Level</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map(log => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.source}</TableCell>
                <TableCell>{log.level}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(log)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Log Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="log-details-title"
        aria-describedby="log-details-description"
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
          {logDetails && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" id="log-details-title">
                  Log Details
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Timestamp:</strong> {logDetails.timestamp}
                </Typography>
                <Typography variant="body1">
                  <strong>Source:</strong> {logDetails.source}
                </Typography>
                <Typography variant="body1">
                  <strong>Log Level:</strong> {logDetails.level}
                </Typography>
                <Typography variant="body1">
                  <strong>Message:</strong> {logDetails.message}
                </Typography>
                <Typography variant="body1">
                  <strong>IP Address:</strong> {logDetails.ip}
                </Typography>
                <Typography variant="body1">
                  <strong>User Activity:</strong> {logDetails.userActivity}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Logs;
