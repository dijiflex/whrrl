import React from 'react';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useLoginUserMutation } from '../../api/whrrlUserAPI';

const useStyles = makeStyles(theme =>
  ({
    form: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
        width: '100%',
      }
    }
  }));

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is Required'),
  password: yup.string().required('Password is Required'),
});

const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  return (
    <Box>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          try {
            const res = await loginUser(values).unwrap();
            enqueueSnackbar('Login successful', { variant: 'success' });
            console.log(res);
          } catch (error) {
            console.log(error);
            if (error.status === 401) {
              enqueueSnackbar('Incorrect email or password', { variant: 'error' });
            }
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="email"
              label="Email"
              type="email"
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
            <Button
              type="submit"
              size="large"
              variant="contained"
              disabled={isSubmitting}
              color="primary"
              sx={{ width: '100%', p: 2 }}
            >
              LOGIN
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
