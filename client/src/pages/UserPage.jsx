/* eslint-disable arrow-body-style */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '../components/Drawer/Drawer';
import UserProfileForm from '../components/UserProfile/UserProfileForm';
import { toggleMobileDrawer } from '../redux/navigationSlice';

const UserPage = () => {
  const { currentUser } = useSelector(state => state.userState);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    dispatch(toggleMobileDrawer());
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer />

      <Container maxWidth="lg">
        <Toolbar sx={{ p: '0!important', m: 0 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: 'block', md: 'none' } }} color="primary">
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Typography variant="h3" sx={{ color: '#4A4646' }} gutterBottom>Welcome,</Typography>
        <Typography variant="h3" sx={{ color: '#4A4646' }} gutterBottom>{currentUser.fullName}</Typography>

        <img src="/images/profile.png" height="300px" alt="User Profile Pic" />

        <Typography variant="h3" sx={{ color: '#4A4646', mt: 4, mb: 2 }} gutterBottom>Kindly help us with the following information</Typography>

        <UserProfileForm />
      </Container>
    </Box>

  );
};

export default UserPage;
