import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
  }
}));

export default function SimpleRating(props) {
  const [rating, setRating] = React.useState(0);
  const classes = useStyles();

  function handleValue(event) {
    setRating(event.target.value);
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Box
          component="fieldset"
          mb={3}
          borderColor="transparent"
          className={classes.boxStyle}
        >
          <Typography
            variant="h5"
            component="legend"
            align="left"
            className={classes.typoStyle}
          >
            {props.ratingQuestion}
          </Typography>
          <Rating
            className={classes.ratingStyle}
            align="right"
            name="simple-controlled"
            value={rating}
            size="large"
            onChange={handleValue}
          />
        </Box>
      </Paper>
    </div>
  );
}
