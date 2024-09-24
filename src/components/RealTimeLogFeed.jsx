import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const RealTimeLogFeed = () => {
  // Real-Time Log Feed Columns
  const logFeedColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'source', headerName: 'Source', width: 150 },
    { field: 'severity', headerName: 'Severity', width: 150 },
    { field: 'message', headerName: 'Message', width: 300 },
    { field: 'timestamp', headerName: 'Timestamp', width: 180 }
  ];

  // Sample real-time log feed data
  const logFeedRows = [
    { id: 1, source: 'Firewall', severity: 'Error', message: 'Unauthorized access attempt', timestamp: '2024-09-17T10:00:00' },
    { id: 2, source: 'Web Server', severity: 'Warning', message: 'High CPU usage detected', timestamp: '2024-09-17T10:05:00' },
    { id: 3, source: 'Database', severity: 'Critical', message: 'Database connection timeout', timestamp: '2024-09-17T10:10:00' },
    { id: 4, source: 'Application Server', severity: 'Info', message: 'Scheduled maintenance started', timestamp: '2024-09-17T10:15:00' },
    { id: 5, source: 'Authentication Service', severity: 'Error', message: 'Failed login attempt for user admin', timestamp: '2024-09-17T10:20:00' },
    { id: 6, source: 'Load Balancer', severity: 'Warning', message: 'Traffic spike detected on node 2', timestamp: '2024-09-17T10:25:00' },
    { id: 7, source: 'Firewall', severity: 'Critical', message: 'Potential DDoS attack detected', timestamp: '2024-09-17T10:30:00' },
    { id: 8, source: 'Web Server', severity: 'Error', message: 'SSL certificate expired', timestamp: '2024-09-17T10:35:00' },
    { id: 9, source: 'Database', severity: 'Warning', message: 'Slow query detected', timestamp: '2024-09-17T10:40:00' },
    { id: 10, source: 'Firewall', severity: 'Info', message: 'Firewall rules updated successfully', timestamp: '2024-09-17T10:45:00' },
    { id: 11, source: 'Application Server', severity: 'Error', message: 'Application crashed unexpectedly', timestamp: '2024-09-17T10:50:00' },
    { id: 12, source: 'Load Balancer', severity: 'Critical', message: 'Node 1 is down', timestamp: '2024-09-17T10:55:00' },
    { id: 13, source: 'Authentication Service', severity: 'Warning', message: 'User password change required', timestamp: '2024-09-17T11:00:00' },
    { id: 14, source: 'Web Server', severity: 'Info', message: 'New user session created', timestamp: '2024-09-17T11:05:00' },
    { id: 15, source: 'Database', severity: 'Critical', message: 'Disk space running low on DB server', timestamp: '2024-09-17T11:10:00' },
    { id: 16, source: 'Firewall', severity: 'Error', message: 'Brute force attack detected from IP 192.168.1.10', timestamp: '2024-09-17T11:15:00' },
    { id: 17, source: 'Application Server', severity: 'Warning', message: 'Memory usage exceeded 80%', timestamp: '2024-09-17T11:20:00' },
    { id: 18, source: 'Load Balancer', severity: 'Info', message: 'New server node added to cluster', timestamp: '2024-09-17T11:25:00' },
    { id: 19, source: 'Database', severity: 'Error', message: 'Failed to execute backup operation', timestamp: '2024-09-17T11:30:00' },
    { id: 20, source: 'Authentication Service', severity: 'Critical', message: 'Multiple failed login attempts for user root', timestamp: '2024-09-17T11:35:00' }
  ];

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Real-Time Log Feed
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={logFeedRows}
          columns={logFeedColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]} 
          pagination
          disableSelectionOnClick
        />
      </div>
    </Box>
  );
};

export default RealTimeLogFeed;
