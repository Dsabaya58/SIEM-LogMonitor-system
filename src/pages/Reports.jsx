import { Typography, Grid, Paper, Box } from '@mui/material';
import ReportFilters from '../components/ReportFilters';
import ReportScheduler from '../components/ReportScheduler';
import ExportOptions from '../components/ExportOptions';
import GraphicalSummary from '../components/GraphicalSummary';

const ReportsPage = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Reports Page
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Customizable Reports</Typography>
            <ReportFilters />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Scheduled Reports</Typography>
            <ReportScheduler />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Report Formats</Typography>
            <ExportOptions />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Graphical Summary</Typography>
            <GraphicalSummary />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage;
