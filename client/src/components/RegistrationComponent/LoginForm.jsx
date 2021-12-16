import React, { useEffect } from 'react';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLoginUserMutation } from '../../api/whrrlUserAPI';
import { setUser, setToken } from '../../redux/userSlice';

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
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { currentUser } = useSelector(state => state.userState);

  useEffect(() => {
    if (currentUser) {
      history.push('/user');
    }
  }, [currentUser]);

  return (
    <Box>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await loginUser(values).unwrap();
            // Store the returned token
            dispatch(setToken(res.token));
            // Store use Date to the redux store
            dispatch(setUser(res.data));

            enqueueSnackbar('Login successful', { variant: 'success' });
          } catch (error) {
            if (error.status === 401) {
              enqueueSnackbar('Incorrect email or password', { variant: 'error' });
            } else {
              enqueueSnackbar(error?.data?.message || 'Login failed. Kindly Try Later', { variant: 'error' });
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
              disabled={isSubmitting || isLoading}
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
