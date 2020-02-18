import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import LeftDrawer from './LeftDrawer';
import HeaderBar from './HeaderBar';
import grey from '@material-ui/core/colors/grey';
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

import LoginSignup from './LoginSignup';
import { AuthContext, useAuthContext } from '../context/auth';
import { TaskContext, useTaskContext } from '../context/task';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    height: '100%',
    width: '100%',
    backgroundColor: grey['200'],
  },
}));

const App = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar handleDrawerToggle={handleDrawerToggle} />
      {/* <LeftDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      /> */}
      <MainContent />
    </div>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user.authToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: 'auth',
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
};

// const user_rawr = {
//   nickname: 'geoboom',
//   authToken: '123123123',
// };

const AppRoot = () => {
  const [user, setUser] = React.useState(user_rawr);
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);

  const authenticate = user => {
    setUser(user);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <AuthContext.Provider value={{ user, authenticate }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect
                to={{
                  pathname: 'home',
                }}
              />
            </Route>
            <Route path="/auth">
              <LoginSignup />
            </Route>
            <PrivateRoute path="/home">
              <App />
            </PrivateRoute>
            <Route>
              <App />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </TaskContext.Provider>
  );
};

const STATUSES = ['To Do', 'Doing', 'Completed'];
const INITIAL_TASKS = [
  {
    _id: 1,
    description: 'the quick brown fox jumps over the lazy dog',
    nickname: 'geoboom',
    status: STATUSES[0],
  },
  {
    _id: 2,
    description:
      'a checkbox can either be a primayr action ot a secondary action rawr xd',
    nickname: 'geoboom',
    status: STATUSES[0],
  },
  {
    _id: 3,
    description: 'this is task three',
    nickname: 'rawrxd',
    status: STATUSES[0],
  },
  {
    _id: 4,
    description: 'this is task four',
    nickname: 'rawrxd',
    status: STATUSES[1],
  },
  {
    _id: 5,
    description: 'this is task A',
    nickname: 'monkaS',
    status: STATUSES[1],
  },
  {
    _id: 6,
    description: 'this is task B',
    nickname: 'monkaS',
    status: STATUSES[2],
  },
  {
    _id: 7,
    description: 'this is task D',
    nickname: 'monkaS',
    status: STATUSES[2],
  },
  {
    _id: 8,
    description: 'this is task E',
    nickname: 'monkaS',
    status: STATUSES[2],
  },
  {
    _id: 9,
    description: 'this is task F',
    nickname: 'monkaS',
    status: STATUSES[1],
  },
];

export default AppRoot;
