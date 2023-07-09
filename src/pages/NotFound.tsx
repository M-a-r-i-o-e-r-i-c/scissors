import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Page Not Found - Error 404</title>
          <meta
            name="description"
            content="Oops The! page. found be not could for looking are you Please check the URL or navigate to our homepage information more for."
          />
          <meta name="keywords" content="React, Typescript, SEO" />
        </Helmet>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h4" gutterBottom textAlign="center">
            Page Not Found
          </Typography>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go Back
          </Button>
        </Box>
      </HelmetProvider>
    </>
  );
};

export default NotFound;
