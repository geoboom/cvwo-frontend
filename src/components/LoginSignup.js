import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import LeftDrawer from './LeftDrawer';
import HeaderBar from './HeaderBar';
import MainContent from './MainContent';
import { makeStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { useAuthContext } from '../context/auth';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 300,
    flex: 1,
    display: 'flex',
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
  },
}));

const LoginSignup = () => {
  const classes = useStyles();
  const [input, setInput] = React.useState('');
  const [error, setError] = React.useState('');
  const { user, authenticate } = useAuthContext();
  let inputRef = React.createRef();

  const handleSubmit = () => {
    const nickname = input.trim();
    setInput(nickname);
    setError('');
    if (nickname.length < 4 || nickname.length > 12) {
      setError('Nickname must be between 4 and 12 characters.');
      return;
    }

    if (!RegExp('^[A-Za-z0-9_]+$').test(nickname)) {
      setError('Only letters, numbers, and underscores allowed.');
      return;
    }

    const user = {
      nickname,
      authToken: '123123123',
    };

    authenticate(user);
  };

  const onTextChange = e => {
    setInput(e.target.value);
  };

  return user && user.authToken ? (
    <Redirect to="/home" />
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography
            style={{
              textAlign: 'center',
              // borderStyle: 'solid',
            }}
            variant="h4"
            gutterBottom
          >
            Welcome to{' '}
            <Box
              style={{
                color: teal['500'],
                // borderStyle: 'solid',
                paddingLeft: 10,
              }}
              // fontSize="h3.fontSize"
              fontWeight="fontWeightBold"
              letterSpacing={6}
            >
              DITGT
            </Box>
          </Typography>
          {/* <Divider /> */}
          {/* <br /> */}
          {/* <div style={{ height: 5 }} /> */}
          <Typography
            style={{
              color: 'red',
            }}
          >
            Site will be functional at 1030, 19/02/2020.
          </Typography>
          <TextField
            size="small"
            label="Enter nickname"
            value={input}
            onChange={onTextChange}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                handleSubmit();
                e.preventDefault();
              }
            }}
            error={error.length > 0}
            helperText={error}
          />
          <div style={{ height: 20 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Join!
          </Button>
          <div style={{ height: 10 }} />
          <Typography variant="caption" gutterBottom>
            <b>Users online:</b> 0
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginSignup;
