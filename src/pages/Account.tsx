import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { Box, Container, Grid } from '@mui/material';

interface AccountProps {
  children: React.ReactNode;
}

export const Account = ({children}:AccountProps) => {
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar/>
      <Container sx={{ ml: 0 }}>
        <Grid container spacing={0} direction="row">
          <Grid item xs={12} sm={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'center',
                minHeight: '100vh',
                pt: '25px', // To account for the Navbar height
              }}
            >
          {children}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
