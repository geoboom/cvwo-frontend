import React from 'react';
import grey from '@material-ui/core/colors/grey';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/Textfield';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: grey['200'],
  },
  card: {
    flex: 1,
    marginBottom: 10,
  },
  inline: {
    display: 'inline',
  },
  cardContent: {
    flex: 1,
  },
  utilsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  selectWrapper: {
    flex: 0.4,
    [theme.breakpoints.up('md')]: {
      flex: 0.3,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  searchWrapper: {
    minWidth: 120,
    flex: 0.8,
    [theme.breakpoints.up('md')]: {
      flex: 0.3,
    },
  },
  listItem: {
    userSelect: 'none',
    cursor: 'pointer',
    '&:hover': {
      background: grey['100'],
    },
  },
  paper: {
    position: 'absolute',
    top: `calc(50% - ${theme.mixins.toolbar.minHeight}px - 50px)`,
    left: `calc(50% - 240px + 50px)`,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TaskModal = ({ modalProps, task }) => {
  const classes = useStyles();

  return (
    <Modal {...modalProps}>
      <div className={classes.paper}>
        <h2>Text in a modal</h2>
        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        <p>{task.description}</p>
      </div>
    </Modal>
  );
};

const TaskItem = ({ task }) => {
  const classes = useStyles();
  const { description, user, status } = task;
  const [modalOpen, setModalOpen] = React.useState(false);

  const primary = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-betweem',
      }}
    >
      <div style={{ flex: 1, marginRight: 10 }}>{description}</div>
      <Chip label={status} />
    </div>
  );

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <ListItem alignItems="flex-start" className={classes.listItem}>
      <TaskModal
        modalProps={{
          open: modalOpen,
          onClose: handleModalClose,
        }}
        task={task}
      />
      <ListItemText
        onTouchStart={handleModalOpen}
        onDoubleClick={handleModalOpen}
        primary={primary}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {user}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default TaskItem;
