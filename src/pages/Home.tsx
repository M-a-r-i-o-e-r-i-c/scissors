import { Header } from '../components/Header';
import { Body } from '../components/Body';
import { Footer } from '../components/Footer';
import { Box } from '@mui/material';

export const Home = () => {
  return (
    <Box
      sx={{
        p: 2,
        boxSizing: 'border-box',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Body />
      <Footer />
    </Box>
  );
};
