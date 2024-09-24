import { Box, Typography } from '@mui/material';
import ApexCharts from 'react-apexcharts';

const GraphicalSummary = () => {
  const chartOptions = {
    chart: {
      id: 'reports-summary'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Log Counts'
      }
    },
    title: {
      text: 'Log Activities Summary'
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#f44336', '#4caf50'], 
    markers: {
      size: 4,
      colors: ['#f44336', '#4caf50'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7
      }
    }
  };

  const chartSeries = [
    {
      name: 'Errors',
      data: [30, 50, 35, 50, 30, 60, 70, 65, 40, 60, 46, 80]
    },
    {
      name: 'Warnings',
      data: [20, 40, 25, 40, 69, 50, 60, 80, 46, 60, 30, 70]
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Summary of Log Activities
      </Typography>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </Box>
  );
};

export default GraphicalSummary;
