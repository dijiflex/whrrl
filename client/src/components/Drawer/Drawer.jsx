import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { setUser, setToken } from '../../redux/userSlice';
import { toggleMobileDrawer } from '../../redux/navigationSlice';

const drawerWidth = 240;

const ResponsiveDrawer = () => {
  const { mobileDrawerOpen } = useSelector(state => state.navigationState);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const handleDrawerToggle = () => {
    dispatch(toggleMobileDrawer());
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    enqueueSnackbar('Logged out successfully', { variant: 'success' });
    history.push('/user');
  };

  const drawer = (
    <>
      <Toolbar sx={{ }}>
        <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: 'block', md: 'none' } }} color="secondary">
          <MenuIcon />
        </IconButton>
      </Toolbar>
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
          <ListItem button sx={{ pl: 0 }} onClick={handleLogout}>
            <ListItemIcon>
              <SettingsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="LogOut" sx={{ color: 'secondary.main' }} />
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
        open={mobileDrawerOpen}
        onClose={() => dispatch(toggleMobileDrawer())}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgba(0, 82, 204,0.9)', }
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
