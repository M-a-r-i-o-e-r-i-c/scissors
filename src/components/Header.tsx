import { useState } from 'react';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Typography, Box, Button } from '@mui/material';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'black',
        }}
        component={Link}
        to="/"
      >
        <ContentCutIcon />
        Scissors
      </Typography>
      {openAuthModal && (
        <AuthModal handleClose={() => setOpenAuthModal(false)} />
      )}
      <Button
        onClick={() => setOpenAuthModal(true)}
        style={{ border: '2px solid blue', color: 'black' }}
      >
        Login/Signup
      </Button>
    </Box>
  );
};
