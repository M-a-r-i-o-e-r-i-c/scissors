import { useState } from 'react';
import { AuthModal } from '../components/AuthModal/AuthModal';
import './Body.css';
import { Stats } from '../components/Stats/Stats';
import { Pricing } from '../components/Pricing/Pricing';
import { Typography, Button, Box } from '@mui/material';

export const Body = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <Box
      height="100%"
      min-height="90vh"
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
        <Typography
          variant="h2"
          style={{ fontSize: '3rem', marginBottom: '10px' }}
        >
          Optimize Your Online Experience with Our Advanced{' '}
          <span style={{ color: 'navy' }}>URL Shortening </span>
          Solution.
        </Typography>
        <Typography textAlign="justify" variant="h6">
          Personalize your shortened URLs to align with your brand identity.
          Utilize custom slugs, branded links, and domain customization options
          to reinforce your brand presence and enhance user engagement
        </Typography>
        <Box style={{ marginBottom: '10px' }}>
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
          <Button style={{ border: '2px solid blue' }}>
            {' '}
            <a href="#plan" style={{ textDecoration: 'none', color: 'black' }}>
              Learn More
            </a>
          </Button>
        </Box>
      </Box>
      <Stats />
      <Pricing />
    </Box>
  );
};
