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
  TablePagination,
  TextField
} from '@mui/material';

const initialAlertsData = [
  { id: 1, time: '2024-09-17 12:30:00', rule: 'Failed Logins', severity: 'High', status: 'Open' },
  { id: 2, time: '2024-09-17 12:35:00', rule: 'Port Scanning', severity: 'Medium', status: 'Acknowledged' },
  { id: 3, time: '2024-09-17 13:00:00', rule: 'Suspicious Activity', severity: 'Low', status: 'Closed' },
  { id: 4, time: '2024-09-17 13:30:00', rule: 'Memory Usage Spike', severity: 'High', status: 'Open' }
];

const Alerts = () => {
  const [alertsData, setAlertsData] = useState(initialAlertsData);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [alertStatus, setAlertStatus] = useState('');

  // Alert rules and settings state
  const [newRule, setNewRule] = useState('');
  const [severityLevel, setSeverityLevel] = useState('');
  const [alertSettings, setAlertSettings] = useState({
    email: '',
    sms: '',
    notification: ''
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenModal = (alert) => {
    setSelectedAlert(alert);
    setAlertStatus(alert.status);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStatusChange = (event) => {
    setAlertStatus(event.target.value);
  };

  const handleSaveChanges = () => {
    const updatedAlerts = alertsData.map(alert =>
      alert.id === selectedAlert.id ? { ...alert, status: alertStatus } : alert
    );
    setAlertsData(updatedAlerts);
    handleCloseModal();
  };

  // Handle alert rule change
  const handleRuleChange = (e) => {
    setNewRule(e.target.value);
  };

  const handleSeverityChange = (e) => {
    setSeverityLevel(e.target.value);
  };

  // Handle alert settings change
  const handleAlertSettingChange = (e) => {
    const { name, value } = e.target;
    setAlertSettings({ ...alertSettings, [name]: value });
  };

  // Save alert rule
  const handleSaveRule = () => {
    // Logic for saving the new rule can be added here
    console.log(`New Rule: ${newRule}, Severity: ${severityLevel}`);
  };

  // Save alert settings
  const handleSaveSettings = () => {
    // Logic for saving the alert settings can be added here
    console.log('Alert Settings:', alertSettings);
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
        Alerts
      </Typography>

      {/* Alerts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Rule</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alertsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(alert => (
              <TableRow key={alert.id}>
                <TableCell>{alert.time}</TableCell>
                <TableCell>{alert.rule}</TableCell>
                <TableCell>{alert.severity}</TableCell>
                <TableCell>{alert.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(alert)}>
                    Update Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={alertsData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Alert Status Update Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-status-update-title"
        aria-describedby="alert-status-update-description"
      >
        <Box
          p={4}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            backgroundColor: 'white',
            boxShadow: 24,
            borderRadius: 8
          }}
        >
          {selectedAlert && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" id="alert-status-update-title">
                  Update Alert Status
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Rule:</strong> {selectedAlert.rule}
                </Typography>
                <Typography variant="body1">
                  <strong>Severity:</strong> {selectedAlert.severity}
                </Typography>
                <Typography variant="body1">
                  <strong>Time:</strong> {selectedAlert.time}
                </Typography>

                {/* Dropdown for alert status */}
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={alertStatus} onChange={handleStatusChange} label="Status">
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Acknowledged">Acknowledged</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>

      {/* Alert Rules Section */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Alert Rules
        </Typography>
        <Typography variant="body1" gutterBottom>
          Define rules that will trigger alerts (e.g., trigger an alert if there are more than 5 failed login attempts in 10 minutes).
        </Typography>

        {/* Form to set alert rules */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="New Rule"
              fullWidth
              value={newRule}
              onChange={handleRuleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Severity</InputLabel>
              <Select value={severityLevel} onChange={handleSeverityChange}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleSaveRule}>
              Save Rule
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Alert Settings Section */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Alert Settings
        </Typography>
        <Typography variant="body1">
          Configure how and where alerts are sent (e.g., email, SMS, in-app notification).
        </Typography>

        {/* Form to set alert settings */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={alertSettings.email}
              onChange={handleAlertSettingChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="SMS"
              fullWidth
              name="sms"
              value={alertSettings.sms}
              onChange={handleAlertSettingChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Notification"
              fullWidth
              name="notification"
              value={alertSettings.notification}
              onChange={handleAlertSettingChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Alerts;
