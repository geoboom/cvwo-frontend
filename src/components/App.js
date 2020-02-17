import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import LeftDrawer from './LeftDrawer';
import HeaderBar from './HeaderBar';
import MainContent from './MainContent';
import { makeStyles } from '@material-ui/core/styles';

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
  // const [height, setHeight] = React.useState(window.innerHeight);

  // React.useEffect(() => {
  //   function handleResize() {
  //     setHeight(window.innerHeight);
  //   }

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    // <div className={{ ...classes.root, height }}>
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

export default App;
