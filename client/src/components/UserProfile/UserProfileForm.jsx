import React from 'react';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import { TextField, Select } from 'formik-mui';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { useUpdateMeMutation, useGetMeQuery } from '../../api/whrrlUserAPI';

const useStyles = makeStyles(theme =>
  ({
    form: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
        width: '100%',
      },
      '& .MuiFormControl-root': {
        width: '100%',
      }
    }
  }));

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is Required'),
  fullName: yup.string().required('Full Name is Required'),
  phoneNumber: yup.string(),
  nationality: yup.string()
});

const UserProfileForm = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const { data: userData, isLoading: isLoadingUserData,
    error: userDataError, refetch } = useGetMeQuery();

  if (isLoadingUserData) return <Skeleton variant="rectangular" height={300} />;
  if (userDataError) return <div>Error Occurred While rendering this components</div>;
  return (
    <div>
      <Formik
        initialValues={{
          email: userData.data.email,
          fullName: userData.data.fullName,
          nationality: userData?.data?.nationality,
          phoneNumber: userData?.data?.phoneNumber
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const newValues = {
            fullName: values.fullName,
            nationality: values.nationality,
            phoneNumber: values.phoneNumber
          };

          if (values.email !== userData.data.email) {
            newValues.email = values.email;
          }
          try {
            await updateMe(newValues).unwrap();
            enqueueSnackbar('Profile Updated Successfully', { variant: 'success' });
            refetch();
          } catch (error) {
            if (error.status === 409) {
              enqueueSnackbar('Email already exists', { variant: 'error' });
            } else {
              enqueueSnackbar(error?.data?.message || 'Update Failed. Try again Later', { variant: 'error' });
            }
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors, values }) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  name="fullName"
                  label="Full Name"
                  helperText={errors.fullName}
                  error={touched.fullName && !!errors.fullName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  helperText={errors.email}
                  error={touched.email && !!errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  name="phoneNumber"
                  label="Mobile Number"
                  helperText={errors.phoneNumber}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={Select}
                  id="age"
                  name="nationality"
                  labelId="age-simple"
                  label="Nationality"
                  value={values.nationality || ''}
                >
                  <MenuItem disabled value="">Nationality</MenuItem>
                  <MenuItem value="Kenyan">Kenyan</MenuItem>
                  <MenuItem value="Indian">Indian</MenuItem>
                </Field>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, position: 'relative' }}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                disabled={isSubmitting || isLoading}
                color="primary"
                sx={{ p: 2, width: '200px' }}
              >
                Submit
              </Button>
              {isSubmitting && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
              )}
            </Box>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfileForm;
