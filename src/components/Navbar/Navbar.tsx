import { auth } from '../../firebase';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'blue' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
        >
          <ContentCutIcon />
          Scissors
        </Typography>
        <IconButton color="inherit"></IconButton>
        <Button onClick={() => auth.signOut()} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
