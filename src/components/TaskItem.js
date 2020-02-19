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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { useAuthContext } from '../context/auth';

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
    minWidth: 80,
  },
  iconButton: {
    padding: 4,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const STATUSES = ['To Do', 'Doing', 'Completed'];

const iconColor = teal['700'];
const TaskModal = ({ modalProps, task, deleteTask }) => {
  const { user } = useAuthContext();
  const classes = useStyles();

  return (
    <Modal {...modalProps}>
      <div className={classes.paper}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            style={{
              color: teal['700'],
              fontWeight: 'bold',
            }}
          >
            Task related information
          </Typography>
          {user.nickname === 'admin' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: -4,
                marginRight: -4,
              }}
            >
              <IconButton
                color="inherit"
                onClick={() => {}}
                className={classes.iconButton}
              >
                <Edit fontSize="medium" style={{ color: iconColor }} />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={deleteTask}
                className={classes.iconButton}
              >
                <Delete fontSize="medium" style={{ color: iconColor }} />
              </IconButton>
            </div>
          ) : null}
        </div>
        <p>{task.description}</p>
        <br />
        <br />
        <Divider />
        <p>
          <b>TODO for this pane:</b> edit/remove tasks, implement tagging
          system.
        </p>
      </div>
    </Modal>
  );
};

const TaskItem = ({ task, taskStatusChange, deleteTask }) => {
  const classes = useStyles();
  const { description, nickname, status } = task;
  const [modalOpen, setModalOpen] = React.useState(false);

  const Primary = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-betweem',
      }}
    >
      <div style={{ flex: 1, marginRight: 10 }}>{description}</div>
      <FormControl
        disabled={status === STATUSES[2]}
        style={{ padding: 0 }}
        size="small"
        className={classes.formControl}
        variant="outlined"
      >
        <Select
          style={{ fontSize: 12, padding: 0, margin: 0 }}
          value={status}
          onChange={taskStatusChange}
          onClose={e => {
            e.stopPropagation();
          }}
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
    <React.Fragment>
      <TaskModal
        modalProps={{
          open: modalOpen,
          onClose: handleModalClose,
        }}
        task={task}
        deleteTask={() => {
          deleteTask();
          setModalOpen(false);
        }}
      />
      <ListItem
        alignItems="flex-start"
        className={classes.listItem}
        onClick={e => {
          e.stopPropagation();
          handleModalOpen();
        }}
        id="listItem"
      >
        <ListItemText
          primary={<Primary />}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {nickname}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </React.Fragment>
  );
};

export default TaskItem;
