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
// const presenceChannel = client.subscriptions.create(
//   {
//     channel: 'PresenceChannel',
//   },
//   {
//     received(data) {
//       console.log(data);
//     },
//   },
// );

const App = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [taskChannel, setTaskChannel] = React.useState();
  const [tasks, setTasks] = React.useState([]);
  const { user } = useAuthContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const client = new createConsumer(
      `wss://cvwo-api.herokuapp.com/cable?nickname=${user.nickname}`,
      // `ws://localhost:3001/cable?nickname=${user.nickname}`,
    );
    const taskChannel = client.subscriptions.create(
      {
        channel: 'TaskChannel',
      },
      {
        received: data => {
          switch (data.type) {
            case 'tasks':
              setTasks(
                data.payload.map(({ id, ...rest }) => ({ _id: id, ...rest })),
              );
              break;
            case 'task': {
              switch (data.operation) {
                case 'add': {
                  const task = data.payload;
                  setTasks(prevTasks => [
                    ...prevTasks,
                    { _id: task.id, ...task },
                  ]);
                  break;
                }
                case 'update': {
                  const task = data.payload;
                  setTasks(prevTasks =>
                    prevTasks.map(({ _id, ...rest }) => {
                      return _id === task.id
                        ? { _id, ...task }
                        : { _id, ...rest };
                    }),
                  );
                  break;
                }
                case 'delete': {
                  const id = data.payload;
                  setTasks(prevTasks =>
                    prevTasks.filter(({ _id }) => id !== _id),
                  );
                  break;
                }
                default:
              }
              break;
            }
            default:
              console.log('default');
          }
        },
        addTask(data) {
          return this.perform('add_task', data);
        },
        saveTask(data) {
          return this.perform('save_task', data);
        },
        deleteTask(data) {
          return this.perform('delete_task', data);
        },
      },
    );

    setTaskChannel(taskChannel);

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <div className={classes.root}>
        <CssBaseline />
        <HeaderBar handleDrawerToggle={handleDrawerToggle} />
        {/* <LeftDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      /> */}
        <MainContent taskChannel={taskChannel} />
      </div>
    </TaskContext.Provider>
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

const AppRoot = () => {
  const [user, setUser] = React.useState({
    // nickname: 'geoboom',
    // authToken: '123123',
  });

  const authenticate = user => {
    setUser(user);
  };

  return (
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
