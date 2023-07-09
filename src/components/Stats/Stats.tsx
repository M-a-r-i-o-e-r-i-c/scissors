import { Typography, Box } from '@mui/material';
import './Stats.css';

export const Stats = () => {
  return (
    <Box className="statsContainer">
      <Box className="statsHeader">
        <Typography variant="h2">
          One Stop. <br />
          <span style={{ color: 'navy' }}>Four Possibilites.</span>
        </Typography>
      </Box>
      <Box className="statsBody">
        <Box className="statsItem">
          <Typography variant="h2">3M</Typography>
          <p>Active users</p>
        </Box>
        <Box className="statsItem">
          <Typography variant="h2">60M</Typography>
          <p>Links and QR code created</p>
        </Box>
        <Box className="statsItem">
          <Typography variant="h2">1B</Typography>
          <p>Clicks & Scanned connections</p>
        </Box>
        <Box className="statsItem">
          <Typography variant="h2">300K</Typography>
          <p>App Integrations</p>
        </Box>
      </Box>
    </Box>
  );
};
