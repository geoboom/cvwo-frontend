import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import indigo from '@material-ui/core/colors/indigo';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    backgroundColor: indigo['900'],
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const LeftDrawer = () => {
  const classes = useStyles();

  return (
    <nav className={classes.drawer}>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        <div className={classes.toolbar} />
        <Divider />
        <p>hello</p>
      </Drawer>
    </nav>
  );
};

export default LeftDrawer;
