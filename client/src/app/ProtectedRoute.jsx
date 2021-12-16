/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const ProtectedRoute = ({ component: Component, userRole, ...rest }) => {
  const { currentUser } = useSelector(state => state.userState);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Route
      {...rest}
      render={props => {
        if (!currentUser) {
          enqueueSnackbar('Please Login', { variant: 'warning' });
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
