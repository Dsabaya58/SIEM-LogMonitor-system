import { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Divider, Paper } from '@mui/material';
import Chart from 'react-apexcharts';
import RealTimeLogFeed from '../components/RealTimeLogFeed';
import { InsertChart, BugReport, NotificationsActive, EventNote } from '@mui/icons-material';

const Dashboard = () => {
  // Data for summary cards
  const summaryData = {
    totalLogsProcessed: '250K',
    anomaliesDetected: '145',
    activeAlerts: '23',
    recentCriticalEvents: '5',
  };

  // System health data (up/down log sources)
  const [logSources, setLogSources] = useState([
    { id: 1, name: 'Source A', status: 'up', lastActivity: '5 minutes ago' },
    { id: 2, name: 'Source B', status: 'down', lastActivity: '15 minutes ago' },
    { id: 3, name: 'Source C', status: 'up', lastActivity: '10 minutes ago' },
    { id: 4, name: 'Source D', status: 'down', lastActivity: '20 minutes ago' },
  ]);

  // Simulate real-time changes in log sources' status
  useEffect(() => {
    const interval = setInterval(() => {
      setLogSources(prevSources =>
        prevSources.map(source => ({
          ...source,
          status: Math.random() > 0.5 ? 'up' : 'down', // Randomly toggles status
          lastActivity: new Date().toLocaleTimeString(),
        }))
      );
    }, 5000); // Updates every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Pie Chart for System Health (Up/Down Sources)
  const systemHealthData = {
    series: [
      logSources.filter(source => source.status === 'up').length,
      logSources.filter(source => source.status === 'down').length,
    ],
    options: {
      labels: ['Up', 'Down'],
      colors: ['#4caf50', '#f44336'],
      chart: {
        type: 'pie',
      },
      title: {
        text: 'System Health',
      },
    },
  };

  // Line Chart for Log Health (Logs Processed Over Time)
  const [logsProcessed, setLogsProcessed] = useState([30, 45, 40, 55, 60, 70, 65]);

  // Simulate real-time updates to logs processed data
  useEffect(() => {
    const interval = setInterval(() => {
      setLogsProcessed(prevData => [
        ...prevData.slice(1), // Shift the data to create the effect of time passing
        Math.floor(Math.random() * 100), // Randomly generated new log count
      ]);
    }, 4000); // Updates every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const logHealthData = {
    options: {
      chart: {
        id: 'log-health-chart',
      },
      xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      },
      title: {
        text: 'Logs Processed Over Time',
      },
      stroke: {
        curve: 'smooth',
      },
      colors: ['#2196f3'],
    },
    series: [
      {
        name: 'Logs Processed',
        data: logsProcessed,
      },
    ],
  };

  // Bar Chart for Anomaly Distribution
  const anomalyDistributionData = {
    options: {
      chart: {
        id: 'anomaly-distribution-chart',
      },
      xaxis: {
        categories: ['Critical', 'Warning', 'Normal'],
      },
      title: {
        text: 'Anomaly Distribution',
      },
      colors: ['#f44336', '#ff9800', '#4caf50'],
    },
    series: [
      {
        name: 'Anomalies',
        data: [10, 20, 30], // Representing anomaly levels
      },
    ],
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <InsertChart sx={{ fontSize: 40, marginRight: 2, color: '#33cdec' }} />
            <CardContent>
              <Typography variant="h6">Total Logs Processed</Typography>
              <Typography variant="h4">{summaryData.totalLogsProcessed}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <BugReport sx={{ fontSize: 40, marginRight: 2, color: '#f44336' }} />
            <CardContent>
              <Typography variant="h6">Anomalies Detected</Typography>
              <Typography variant="h4">{summaryData.anomaliesDetected}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <NotificationsActive sx={{ fontSize: 40, marginRight: 2, color: '#b5c9cf' }} />
            <CardContent>
              <Typography variant="h6">Active Alerts</Typography>
              <Typography variant="h4">{summaryData.activeAlerts}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <EventNote sx={{ fontSize: 40, marginRight: 2, color: '#4caf50' }} />
            <CardContent>
              <Typography variant="h6">Recent Critical Events</Typography>
              <Typography variant="h4">{summaryData.recentCriticalEvents}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* System Health Pie Chart */}
      <Box my={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                System Health
              </Typography>
              <Chart options={systemHealthData.options} series={systemHealthData.series} type="pie" width="100%" height={310} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Logs Processed Over Time
              </Typography>
              <Chart options={logHealthData.options} series={logHealthData.series} type="line" width="100%" height={300} />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Real-Time Log Feed Component */}
      <RealTimeLogFeed />

      {/* Anomaly Distribution Bar Chart */}
      <Box my={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Anomaly Distribution
              </Typography>
              <Chart options={anomalyDistributionData.options} series={anomalyDistributionData.series} type="bar" width="100%" height={300} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
