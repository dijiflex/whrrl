import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import LanguageIcon from '@mui/icons-material/Language';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const ResponsiveDrawer = props => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar sx={{ p: '0!important', m: 0 }} />
      <Divider />
      <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80vh' }}>
        <Box>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: 'secondary.main' }} />
          </ListItem>
          <Box sx={{ mt: 2, ml: 2 }}>
            <Typography variant="subtitle1" color="secondary" sx={{ opacity: 0.4 }}>HELP</Typography>
            <ListItem button sx={{ pl: 0 }}>
              <ListItemIcon>
                <ForumIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Raise a Ticket" sx={{ color: 'secondary.main' }} />
            </ListItem>
            <ListItem button sx={{ pl: 0 }}>
              <ListItemIcon>
                <LanguageIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="FAQ" sx={{ color: 'secondary.main' }} />
            </ListItem>
          </Box>
        </Box>

        <Box sx={{ mt: 5, ml: 2 }}>
          <Typography variant="subtitle1" color="secondary" sx={{ opacity: 0.4 }}>SETTINGS</Typography>
          <ListItem button sx={{ pl: 0 }}>
            <ListItemIcon>
              <PermIdentityIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Raise a Ticket" sx={{ color: 'secondary.main' }} />
          </ListItem>
          <ListItem button sx={{ pl: 0 }}>
            <ListItemIcon>
              <SettingsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="FAQ" sx={{ color: 'secondary.main' }} />
          </ListItem>
        </Box>

      </List>
    </>
  );

  //   const container = window !== undefined ? () => window().document.body : undefined;

  if (isXs) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgba(0, 82, 204,0.5)', }
        }}
      >
        {drawer}
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, backgroundColor: '#0052CC', height: '100vh' }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'static',
            background: 'transparent'
          }
        }}
      >
        {drawer}
      </Drawer>

    </Box>
  );
};

export default ResponsiveDrawer;
