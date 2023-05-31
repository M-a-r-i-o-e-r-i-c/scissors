
import { AppBar, Toolbar, Typography, IconButton, Button} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <ContentCutIcon/>Scissors
        </Typography>
        <IconButton color="inherit">
          <AccountCircle/>
        </IconButton>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
