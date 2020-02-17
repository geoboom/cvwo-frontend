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

import './TaskItem.css';

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
    // [theme.breakpoints.up('md')]: {
    //   marginLeft: theme.spacing(1),
    //   marginRight: theme.spacing(1),
    // },
    minWidth: 80,
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
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    WebkitTransform: 'translate(-50%, -50%)',
    width: 360,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const STATUSES = ['To Do', 'Doing', 'Completed'];
const STATUSES_SELECTABLE = ['Backlog', 'Completed'];

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

const TaskItem = ({ task, taskStatusChange }) => {
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
      <FormControl
        style={{ padding: 0 }}
        size="small"
        className={classes.formControl}
        variant="outlined"
      >
        <Select
          style={{ fontSize: 12, padding: 0, margin: 0 }}
          value={status}
          onChange={taskStatusChange}
        >
          {STATUSES.map(status => (
            <MenuItem style={{ fontSize: 12 }} key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <ListItem
      alignItems="flex-start"
      className={classes.listItem}
      id="listItem"
    >
      <TaskModal
        modalProps={{
          open: modalOpen,
          onClose: handleModalClose,
        }}
        task={task}
      />
      <ListItemText
        onClick={e => {
          e.stopPropagation();
          handleModalOpen();
        }}
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
