import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go Back
      </Button>
    </Box>
  );
};

export default NotFound;
