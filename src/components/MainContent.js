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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/Textfield';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TaskItem from './TaskItem';

const STATUSES = ['To Do', 'Doing', 'Completed'];
const STATUSES_SELECTABLE = ['Backlog', 'Completed'];

const TASKS = [
  {
    _id: 1,
    description: 'the quick brown fox jumps over the lazy dog',
    user: 'geoboom',
    status: STATUSES[0],
  },
  {
    _id: 2,
    description:
      'a checkbox can either be a primayr action ot a secondary action rawr xd',
    user: 'geoboom',
    status: STATUSES[0],
  },
  {
    _id: 3,
    description: 'this is task three',
    user: 'chef',
    status: STATUSES[0],
  },
  {
    _id: 4,
    description: 'this is task four',
    user: 'chef',
    status: STATUSES[1],
  },
  {
    _id: 5,
    description: 'this is task A',
    user: 'lyssa',
    status: STATUSES[1],
  },
  {
    _id: 6,
    description: 'this is task B',
    user: 'lyssa',
    status: STATUSES[2],
  },
  {
    _id: 7,
    description: 'this is task D',
    user: 'lyssa',
    status: STATUSES[2],
  },
  {
    _id: 8,
    description: 'this is task E',
    user: 'lyssa',
    status: STATUSES[2],
  },
  {
    _id: 9,
    description: 'this is task F',
    user: 'lyssa',
    status: STATUSES[1],
  },
];

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(3),
    },
    backgroundColor: grey['200'],
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    flexGrow: 1,
  },
  card: {
    display: 'flex',
    flex: 1,
  },
  cardContent: {
    flexDirection: 'column',
    display: 'flex',
    flexGrow: 1,
  },
  utilsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
    alignItems: 'flex-start',
  },
  selectWrapper: {
    flex: 0.4,
    [theme.breakpoints.up('md')]: {
      flex: 0.3,
    },
  },
  formControl: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    minWidth: 140,
  },
  searchWrapper: {
    flex: 0.5,
    maxWidth: 240,
    minWidth: 120,
    [theme.breakpoints.up('md')]: {
      flex: 0.4,
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
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

const TaskList = ({ tasks, taskStatusChange }) => {
  const classes = useStyles();

  return (
    <List className={classes.listRoot}>
      {tasks.map(task => (
        <div style={{ width: '98%', margin: '0 auto' }}>
          <TaskItem
            key={task._id}
            task={task}
            taskStatusChange={e => {
              e.stopPropagation();
              taskStatusChange(task._id, e.target.value);
            }}
          />
          <Divider />
        </div>
      ))}
    </List>
  );
};

const AddTaskModal = ({ modalProps, addTask }) => {
  const classes = useStyles();
  let inputRef = React.createRef();

  return (
    <Modal {...modalProps}>
      <div className={classes.paper}>
        <h2>Add New Task</h2>
        <TextField
          autoFocus
          inputRef={input => {
            inputRef = input;
          }}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              addTask(e.target.value);
              e.preventDefault();
            }
          }}
          label="Description"
          fullWidth
        />
        <br />
        <br />
        <div style={{ float: 'right' }}>
          <Button
            onClick={() => {
              if (inputRef.value !== '') addTask(inputRef.value);
            }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const Row1 = ({ handleTextChange, status, handleSelectChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.utilsBar}>
      <div className={classes.searchWrapper}>
        <TextField
          onChange={handleTextChange}
          size="small"
          label="Search"
          fullWidth
          variant="outlined"
          onBlur={e => e.stopPropagation()}
        />
      </div>
      <div style={{ width: 5 }} />
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <FormControl
          size="small"
          className={classes.formControl}
          variant="outlined"
        >
          <Select value={status} onChange={handleSelectChange}>
            {STATUSES_SELECTABLE.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Hidden smDown implementation="css">
          <FormControlLabel
            style={{ margin: 0 }}
            value="start"
            control={<Checkbox color="primary" />}
            label="Show only my tasks"
            labelPlacement="start"
          />
        </Hidden>
      </div>
    </div>
  );
};

const MainContent = () => {
  const classes = useStyles();
  const [status, setStatus] = React.useState(STATUSES_SELECTABLE[0]);
  const [modalOpen, setModalOpen] = React.useState(false);

  const filterTasks = (tasks, status) => {
    if (status === STATUSES_SELECTABLE[1])
      return tasks.filter(task => task.status === STATUSES_SELECTABLE[1]);
    else return tasks.filter(task => task.status !== STATUSES_SELECTABLE[1]);
  };

  const [tasks, setTasks] = React.useState(filterTasks(TASKS, status));

  const handleSelectChange = event => {
    setStatus(event.target.value);
    setTasks(filterTasks(TASKS, event.target.value));
  };

  const taskStatusChange = (_id, status) => {
    setTasks(
      tasks.map(task => {
        if (task._id === _id) return { ...task, status };
        return task;
      }),
    );
  };

  const addTask = description => {
    setTasks([
      ...tasks,
      {
        _id: tasks[tasks.length - 1]._id + 1,
        description: description,
        user: 'geoboom',
        status: STATUSES[0],
      },
    ]);
    setModalOpen(false);
  };

  const handleTextChange = event => {};

  return (
    <main className={classes.root}>
      <div className={classes.toolbar} />
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Row1
            status={status}
            handleTextChange={handleTextChange}
            handleSelectChange={handleSelectChange}
          />
          <Hidden mdUp implementation="css">
            <div className={classes.utilsBar}>
              <FormControlLabel
                style={{ margin: 0, marginRight: 'auto' }}
                value="start"
                control={<Checkbox color="primary" />}
                label="Show only my tasks"
                labelPlacement="start"
              />
            </div>
          </Hidden>
          <hr style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />
          <TaskList tasks={tasks} taskStatusChange={taskStatusChange} />
        </CardContent>
      </Card>
      <AddTaskModal
        modalProps={{
          open: modalOpen,
          onClose: () => setModalOpen(false),
        }}
        addTask={addTask}
      />
      <Fab
        onClick={() => setModalOpen(true)}
        color="primary"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </main>
  );
};

export default MainContent;
