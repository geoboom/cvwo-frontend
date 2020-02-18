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
import { createConsumer } from '@rails/actioncable';

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
        return user && user.authToken ? (
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

const wsUrl = 'ws://localhost:3001/cable?nickname=geoboom';

const AppRoot = () => {
  const [user, setUser] = React.useState();
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);

  const authenticate = user => {
    setUser(user);
  };

  React.useEffect(() => {
    const client = new createConsumer(wsUrl);
    const presenceChannel = client.subscriptions.create(
      {
        channel: 'PresenceChannel',
      },
      {
        received(data) {
          console.log(data);
        },
      },
    );

    setTimeout(() => {
      presenceChannel.send({
        body: 'testing',
      });
    }, 1500);
  });

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
];

export default AppRoot;
