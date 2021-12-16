import React from 'react';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme =>
  ({
    form: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
        width: '80%',
        [theme.breakpoints.only('xs')]: {
          width: '100%'
        }
      }
    }
  }));

const validationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid Email').required('Email is Required'),
  password: yup.string().required('Password is Required').min(4),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const RegistrationForm = () => {
  const classes = useStyles();

  return (
    <Box>
      <Formik
        initialValues={{
          email: '',
          password: '',
          fullName: '',
          passwordConfirm: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="fullName"
              label="Full Name"
              helperText={errors.fullName}
              error={touched.fullName && !!errors.fullName}
            />
            <Field
              component={TextField}
              name="email"
              label="Email"
              helperText={errors.email}
              error={touched.email && !!errors.email}
            />
            <Field
              component={TextField}
              placeholder="password"
              name="password"
              label="Password"
              type="password"
              error={touched.password && !!errors.password}
            />
            <Field
              component={TextField}
              placeholder="Confirm Password"
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              error={touched.passwordConfirm && !!errors.passwordConfirm}
            />
            <Button
              type="submit"
              size="large"
              variant="contained"
              disabled={isSubmitting}
              color="primary"
              sx={{ width: { xs: '100%', sm: '80%' }, p: 2 }}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegistrationForm;
