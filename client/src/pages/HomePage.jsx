import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RegistrationForm from '../components/RegistrationComponent/RegistrationForm';

const HomePage = () => (

  <Container maxWidth="lg">
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Typography variant="h1" sx={{ mt: 5 }} color="initial">
          Welcome to Whrrl
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RegistrationForm />
      </Grid>

    </Grid>
  </Container>
);

export default HomePage;
