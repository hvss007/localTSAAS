import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "2vh"
  },
  fields: {
    fontSize: "1.4rem",
    "@media (max-width:480px)": {
      fontSize: "1.2rem"
    }
  }
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={props.handleDecrease}
          >
            <RemoveIcon />
          </Fab>
        </Grid>
        <Grid item xs={6} container justify="center" direction="column">
          <span className={classes.fields}>
            {props.label}: {props.value}
          </span>
        </Grid>
        <Grid item xs>
          <Fab
            size="small"
            color="primary"
            aria-label="minus"
            className={classes.fab}
            onClick={props.handleIncrease}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}
