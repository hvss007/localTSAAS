import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    margin: "2vh 20vw 2vh 20vw",
    "@media (max-width:1024px)": {
      margin: "2vh 5vw 2vh 5vw"
    },
    borderRadius: 8,
    padding: "1vw",
    backgroundColor: "#e1f5fe"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240
  },
  group: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  labelStyle: {
    fontFamily: "Julius Sans One",
    fontSize: "24px",
    "@media (max-width:480px)": {
      fontSize: "20px"
    },
    color: "#410373",
    textTransform: "uppercase"
  },
  formHeader: {
    color: "#000",
    margin: "1vw",
    fontSize: "2vw",
    "@media (max-width:360px)": {
      fontSize: "24px"
    },
    "@media (max-width:1024px)": {
      fontSize: "24px"
    },
    fontWeight: "bold"
  },
  button: {
    justifyContent: "center",
    margin: "0 15vw 2vh 15vw",
    textAlign: "center"
  },
  checkboxes: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  divStyle: {
    margin: "0 10px 0 10px"
  }
}));

function PersonalInformation() {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const classes = useStyles();

  const [tripPurpose, setTripPurpose] = React.useState("");
  const [comingFromMode, setComingFromMode] = React.useState({});
  const [comingToMode, setComingToMode] = React.useState({});
  const [travelFrequency, setTravelFrequency] = React.useState({});

  const handleComingFromMode = name => event => {
    setComingFromMode({
      commingFromMode: { [name]: event.target.checked }
    });
  };
  const handleComingToMode = name => event => {
    setComingToMode({
      commingToMode: { [name]: event.target.checked }
    });
  };
  const handleTravelFrequency = name => event => {
    setTravelFrequency({
      travelFrequency: { [name]: event.target.checked }
    });
  };

  function handleTripPurpose(event) {
    setTripPurpose(event.target.value);
  }

  function handleSubmit() {
    console.log(travelFrequency, comingToMode, comingFromMode);
  }

  return (
    <Card className={classes.root}>
      <FormGroup className={classes.formGroup}>
        <FormLabel component="legend" className={classes.formHeader}>
          TRAVEL INFORMATION:
          <hr />
        </FormLabel>
        <div className={classes.divStyle}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-image-native-simple">
              Trip Purpose
            </InputLabel>
            <Select
              native
              value={tripPurpose}
              onChange={handleTripPurpose}
              input={
                <OutlinedInput
                  name="trip_purpose"
                  labelWidth={labelWidth}
                  id="outlined-qualification-native-simple"
                />
              }
            >
              <option value="" />
              <option value="work">Upto 10th</option>
              <option value="education">10+2</option>
              <option value="social/gathering">Graduation</option>
              <option value="recreational/tourism">Post Graduation</option>
            </Select>
          </FormControl>
          <hr />
        </div>

        <div>
          <FormLabel component="legend" className={classes.labelStyle}>
            You are Going:
          </FormLabel>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="outlined-required"
                label="From"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-required"
                label="To"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id="outlined-required"
                label="Avg. Travel Time"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-required"
                label="Avg. Travel Cost"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <hr />
        </div>

        <div className={classes.divStyle}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              Mode used while coming to Anand Vihar:
            </FormLabel>
            <div className={classes.checkboxes}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingToMode.walking}
                    onChange={handleComingToMode("walking")}
                    value="walking"
                    color="primary"
                  />
                }
                label="Walking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingToMode.bicycle}
                    onChange={handleComingToMode("bicycle")}
                    value="bicycle"
                    color="primary"
                  />
                }
                label="Bicycle"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingToMode.two_wheeler}
                    onChange={handleComingToMode("two_wheeler")}
                    value="two_wheeler"
                    color="primary"
                  />
                }
                label="2Wheeler"
              />
            </div>
            <div className={classes.checkboxes}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingToMode.two_wheeler}
                    onChange={handleComingToMode("two_wheeler")}
                    value="two_wheeler"
                    color="primary"
                  />
                }
                label="2Wheeler"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingToMode.personal_car}
                    onChange={handleComingToMode("personal_car")}
                    value="personal_car"
                    color="primary"
                  />
                }
                label="Personal Car"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingToMode.bus}
                    onChange={handleComingToMode("bus")}
                    value="bus"
                    color="primary"
                  />
                }
                label="Bus"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingToMode.train}
                    onChange={handleComingToMode("train")}
                    value="train"
                    color="primary"
                  />
                }
                label="Train"
              />
            </div>
          </FormControl>
          <hr />
        </div>

        <div className={classes.divStyle}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              Mode used while coming from Anand Vihar:
            </FormLabel>
            <div className={classes.checkboxes}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingFromMode.walking}
                    onChange={handleComingFromMode("walking")}
                    value="walking"
                    color="primary"
                  />
                }
                label="Walking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingFromMode.bicycle}
                    onChange={handleComingFromMode("bicycle")}
                    value="bicycle"
                    color="primary"
                  />
                }
                label="Bicycle"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingFromMode.two_wheeler}
                    onChange={handleComingFromMode("two_wheeler")}
                    value="two_wheeler"
                    color="primary"
                  />
                }
                label="2Wheeler"
              />
            </div>
            <div className={classes.checkboxes}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingFromMode.two_wheeler}
                    onChange={handleComingFromMode("two_wheeler")}
                    value="two_wheeler"
                    color="primary"
                  />
                }
                label="2Wheeler"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingFromMode.personal_car}
                    onChange={handleComingFromMode("personal_car")}
                    value="personal_car"
                    color="primary"
                  />
                }
                label="Personal Car"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingFromMode.bus}
                    onChange={handleComingFromMode("bus")}
                    value="bus"
                    color="primary"
                  />
                }
                label="Bus"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={comingFromMode.train}
                    onChange={handleComingFromMode("train")}
                    value="train"
                    color="primary"
                  />
                }
                label="Train"
              />
            </div>
          </FormControl>
          <hr />
        </div>

        <div className={classes.divStyle}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              Travel frequency from anand Vihar:
            </FormLabel>
            <div className={classes.checkboxes}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={travelFrequency.less_than_one_month}
                    onChange={handleTravelFrequency("less_than_one_month")}
                    value="less_than_one_month"
                    color="primary"
                  />
                }
                label="Less Than One Month"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={travelFrequency.one_three_time}
                    onChange={handleTravelFrequency("one_three_time")}
                    value="one_three_time"
                    color="primary"
                  />
                }
                label="1-3 times a month"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={travelFrequency.one_two_times_a_week}
                    onChange={handleTravelFrequency("one_two_times_a_week")}
                    value="one_two_times_a_week"
                    color="primary"
                  />
                }
                label="1-2 times a week"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={travelFrequency.three_five_times_a_week}
                    onChange={handleTravelFrequency("three_five_times_a_week")}
                    value="three_five_times_a_week"
                    color="primary"
                  />
                }
                label="3-5 times a week"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={travelFrequency.more_then_five_times_a_week}
                    onChange={handleTravelFrequency(
                      "more_then_five_times_a_week"
                    )}
                    value="more_then_five_times_a_week"
                    color="primary"
                  />
                }
                label="More than 5 times a week"
              />
            </div>
          </FormControl>
          <hr />
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
          size="large"
        >
          Submit
        </Button>
      </FormGroup>
    </Card>
  );
}

export default PersonalInformation;
