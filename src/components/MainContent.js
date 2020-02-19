import React from 'react';
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
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import teal from '@material-ui/core/colors/teal';
import TaskItem from './TaskItem';
import { useAuthContext } from '../context/auth';
import { useTaskContext } from '../context/task';

const STATUSES = ['To Do', 'Doing', 'Completed'];
const STATUSES_FILTER = {
  Backlog: [STATUSES[0], STATUSES[1]],
  Doing: [STATUSES[1]],
  Completed: [STATUSES[2]],
};

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(3),
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '98%',
      padding: theme.spacing(1),
      paddingTop: theme.spacing(3),
    },
  },
  listRoot: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
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
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TaskList = ({ tasks, taskStatusChange, deleteTask }) => {
  const classes = useStyles();

  return (
    <List className={classes.listRoot}>
      {tasks.map(task => (
        <div key={task._id} style={{ width: '98%', margin: '0 auto' }}>
          <TaskItem
            task={task}
            taskStatusChange={e => {
              e.stopPropagation();
              taskStatusChange(task._id, e.target.value);
            }}
            deleteTask={() => deleteTask(task._id)}
          />
          <Divider />
        </div>
      ))}
    </List>
  );
};

const AddTaskModal = ({ modalProps, addTask, error }) => {
  const classes = useStyles();
  let inputRef = React.createRef();

  return (
    <Modal {...modalProps}>
      <div className={classes.paper}>
        <Typography
          style={{
            color: teal['700'],
            fontWeight: 'bold',
          }}
        >
          Add new task
        </Typography>
        <br />
        <TextField
          size="small"
          helperText={error}
          error={error.length > 0}
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
              addTask(inputRef.value);
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

const multiFilter = filterMap => item => {
  for (const key in filterMap) {
    if (
      filterMap[key] !== undefined &&
      filterMap[key] !== null &&
      filterMap[key].length > 0 &&
      (item[key] === undefined || !filterMap[key].includes(item[key]))
    ) {
      return false;
    }
  }

  return true;
};

const MainContent = ({ taskChannel, tasksLoading }) => {
  const { user } = useAuthContext();
  const { tasks, setTasks } = useTaskContext();

  const classes = useStyles();

  const [statusFilter, setStatusFilter] = React.useState(
    Object.keys(STATUSES_FILTER)[0],
  );
  const [userFilter, setUserFilter] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [filterMap, setFilterMap] = React.useState({
    status: STATUSES_FILTER[statusFilter],
    nickname: userFilter ? [user.nickname] : [],
  });
  const [addTaskInputError, setAddTaskInputError] = React.useState('');

  const handleSelectFilterChange = event => {
    setStatusFilter(event.target.value);
    setFilterMap(prevFilterMap => ({
      ...prevFilterMap,
      status: STATUSES_FILTER[event.target.value],
    }));
  };

  const handleUserFilterChange = event => {
    event.persist();
    setUserFilter(event.target.checked);
    setFilterMap(prevFilterMap => ({
      ...prevFilterMap,
      nickname: event.target.checked ? [user.nickname] : [],
    }));
  };

  const taskStatusChange = (_id, status) => {
    taskChannel.saveTask({
      _id,
      status,
    });
  };

  const deleteTask = _id => {
    taskChannel.deleteTask({
      _id,
    });
  };

  const addTask = description => {
    const cdt = description.trim();
    setAddTaskInputError('');
    if (cdt.length === 0) {
      setAddTaskInputError('Task description cannot be blank.');
      return;
    }

    if (!RegExp('^[A-Za-z0-9_\\- ]+$').test(cdt)) {
      setAddTaskInputError('Only A-Z, a-z, 0-9, _, -, and spaces allowed.');
      return;
    }

    taskChannel.addTask({
      description,
    });

    setModalOpen(false);

    return {};
  };

  const handleTextChange = event => {};

  const UserFilterCheckBox = () => (
    <FormControlLabel
      style={{ margin: 0 }}
      control={
        <Checkbox
          checked={userFilter}
          onChange={handleUserFilterChange}
          color="primary"
        />
      }
      label="Show only my tasks"
      labelPlacement="start"
    />
  );

  return (
    <main className={classes.root}>
      <div className={classes.toolbar} />
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Row1
            statusFilter={statusFilter}
            handleTextChange={handleTextChange}
            handleSelectFilterChange={handleSelectFilterChange}
            UserFilterCheckBox={UserFilterCheckBox}
          />
          <Hidden mdUp implementation="css">
            <UserFilterCheckBox />
          </Hidden>
          <hr style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />
          {tasksLoading ? (
            <CircularProgress style={{ margin: '0 auto', marginTop: 60 }} />
          ) : (
            <TaskList
              tasks={tasks.filter(multiFilter(filterMap)).sort((t1, t2) => {
                if (t1.status === STATUSES[0] && t2.status === STATUSES[1])
                  return 1;
                if (t1.status === STATUSES[1] && t2.status === STATUSES[0])
                  return -1;
                if (t1.created_at < t2.created_at) return 1;
                if (t1.created_at > t2.created_at) return -1;
                return 0;
              })}
              taskStatusChange={taskStatusChange}
              deleteTask={deleteTask}
            />
          )}
        </CardContent>
      </Card>
      <AddTaskModal
        modalProps={{
          open: modalOpen,
          onClose: () => setModalOpen(false),
        }}
        addTask={addTask}
        error={addTaskInputError}
      />
      <Fab
        onClick={() => {
          setAddTaskInputError('');
          setModalOpen(true);
        }}
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>
    </main>
  );
};

const Row1 = ({
  handleTextChange,
  statusFilter,
  handleSelectFilterChange,
  UserFilterCheckBox,
}) => {
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
          <Select value={statusFilter} onChange={handleSelectFilterChange}>
            {Object.keys(STATUSES_FILTER).map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Hidden smDown implementation="css">
          <UserFilterCheckBox />
        </Hidden>
      </div>
    </div>
  );
};

export default MainContent;
