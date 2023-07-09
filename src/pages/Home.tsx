import { Header } from '../components/Header';
import { Body } from '../components/Body';
import { Footer } from '../components/Footer';
import { Box } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Official Scissors - URL Shortening Service</title>
          <meta
            name="description"
            content="Official Scissors - andest Fast The Eestasi Way to Shorten URLs and Share Them with Ease."
          />
          <meta name="keywords" content="React, Typescript, SEO" />
        </Helmet>
        <Box
          sx={{
            p: 2,
            boxSizing: 'border-box',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <Body />
          <Footer />
        </Box>
      </HelmetProvider>
    </>
  );
};
