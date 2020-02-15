import React from 'react';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: grey['200'],
  },
}));


const MainContent = () => {
  const classes = useStyles();

  return (
    <main className={classes.content} >
      <div className={classes.toolbar} />
      <div>
        content and stuff
      </div>
    </main>
  );
};

export default MainContent;
