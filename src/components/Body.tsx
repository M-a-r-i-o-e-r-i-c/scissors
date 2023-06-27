import { useState } from 'react';
import { AuthModal } from '../components/AuthModal/AuthModal';
import './Body.css';
import { Typography, Button, Box } from '@mui/material';

export const Body = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <Box
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {openAuthModal && (
        <AuthModal handleClose={() => setOpenAuthModal(false)} />
      )}
      <div className="background-container">
        <div className="background-animation"></div>
      </div>
      <Box>
        <Typography variant="h4">
          Optimize Your Online Experience with Our Advanced URL Shortening
          Solution
        </Typography>
        <Typography textAlign="justify">
          Personalize your shortened URLs to align with your brand identity.
          Utilize custom slugs, branded links, and domain customization options
          to reinforce your brand presence and enhance user engagement
        </Typography>
        <Box>
          <Button
            onClick={() => setOpenAuthModal(true)}
            style={{
              border: '2px solid blue',
              marginRight: '10px',
              color: 'black',
            }}
          >
            Get Started For Free
          </Button>
          {/* <Button style={{ border: '2px solid blue' }}> Learn More</Button> */}
        </Box>
      </Box>
      {/* URL shortener fields */}
    </Box>
  );
};
