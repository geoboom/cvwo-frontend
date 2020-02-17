import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import LeftDrawer from './LeftDrawer';
import HeaderBar from './HeaderBar';
import MainContent from './MainContent';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { useAuth } from '../context/auth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'fixed',
    height: '100%',
    width: '100%',
  },
}));

const LoginSignup = () => {
  const classes = useStyles();
  const { username } = useAuth();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <h1>Welcome to Do It Together</h1>
        <h2>Login/Signup route</h2>
        <h3>{username}</h3>
      </div>
    </div>
  );
};

export default LoginSignup;
