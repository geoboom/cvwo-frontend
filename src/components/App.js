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

import LoginSignup from './LoginSignup';
import { AuthContext } from '../context/auth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'fixed',
    height: '100%',
    width: '100%',
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
      <LeftDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MainContent />
    </div>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (
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
  const [user, setUser] = React.useState({});

  return (
    <AuthContext.Provider value={{ username: 'testing' }}>
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
            <LoginSignup />
          </PrivateRoute>
          <Route>
            <App />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default AppRoot;
