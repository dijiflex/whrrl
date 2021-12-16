import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RegistrationForm from '../components/RegistrationComponent/RegistrationForm';
import RegistrationComponent from '../components/RegistrationComponent/RegistrationComponent';

const HomePage = () => (

  <Container maxWidth="lg">
    <Grid container spacing={0} direction="column">
      <Grid item xs={12}>
        <Typography variant="h1" sx={{ mt: 5 }} color="initial" align="center">
          Welcome to Whrrl
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <RegistrationComponent />
      </Grid>

    </Grid>
  </Container>
);

export default HomePage;
