import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import WithWidth, { isWidthUp } from '@material-ui/core/withWidth';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Modal from '@material-ui/core/Modal';
import Info from '@material-ui/icons/Info';
import Box from '@material-ui/core/Box';

import { useAuthContext } from '../context/auth';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    // [theme.breakpoints.up('md')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
    backgroundColor: grey['50'],
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconRow: {
    marginRight: -10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 8,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    position: 'absolute',
    top: theme.mixins.toolbar.minHeight - 5,
    right: 10,
    minWidth: 200,
    width: '20%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
}));

const HeaderBar = ({ handleDrawerToggle, width }) => {
  const { user, authenticate } = useAuthContext();
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const iconColor = teal['700'];

  const logout = () => {
    authenticate({});
  };

  const InfoModal = () => (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <div className={classes.paper}>
        <Typography>
          <b>You are:</b> {user.nickname}
        </Typography>
        <Typography>
          <b>Users online:</b> 0
        </Typography>
        <Typography>
          <b>How to play:</b> Get your friends/open new tabs and join with
          different nicknames. Add new tasks or edit tasks' statuses and they
          will be reflected in real time! Login as <em>admin</em> to delete
          tasks! (click on a task and then the trash icon)
        </Typography>
      </div>
    </Modal>
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Typography
          style={{
            color: teal['700'],
            fontWeight: 'bold',
          }}
          variant={isWidthUp('md', width) ? 'h4' : 'h5'}
        >
          Do it Together
        </Typography>
        <div className={classes.iconRow}>
          <IconButton
            color="inherit"
            onClick={() => {
              setModalOpen(true);
            }}
            className={classes.iconButton}
          >
            <Info fontSize="large" style={{ color: iconColor }} />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={logout}
            className={classes.iconButton}
          >
            <ExitToApp fontSize="large" style={{ color: iconColor }} />
          </IconButton>
        </div>
      </Toolbar>
      <InfoModal />
    </AppBar>
  );
};

export default WithWidth()(HeaderBar);
