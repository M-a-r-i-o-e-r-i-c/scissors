import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <List>
      <ListItemButton component={Link} to="/account/dashboard" sx={{ pl: 0 }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/account/qr-code" sx={{ pl: 0 }}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="QR code" />
      </ListItemButton>
      <ListItemButton component={Link} to="/account/editor" sx={{ pl: 0 }}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Editor" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;
