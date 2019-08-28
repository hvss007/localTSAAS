import React from "react";
import { withRouter } from "react-router-dom";
import NumberControl from "./../../NumberControl/NumberControl";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HostName from "./../../../assets/globalvaribles/GlobalVariables";

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
  },
  heading: {
    fontSize: "1.3rem",
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: "1.3rem",
    color: theme.palette.text.secondary
  },
  locationBox: {
    justifyContent: "center",
    borderRadius: 8
  },
  locationExpand: {
    margin: "2vh 10vh 2vh 10vh",
    backgroundColor: "#bbdefb",
    borderRadius: 8
  }
}));

function PersonalInformation(props) {
  const surveyStartTime = new Date().toLocaleTimeString();
  // console.log(surveyStartTime);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const classes = useStyles();

  //Personal Info
  const [age, setAge] = React.useState();
  const [gender, setGender] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [qualification, setQualification] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [cars, setCars] = React.useState(0);
  const [two_wheeler, setTwoWheeler] = React.useState(0);
  const [bicycle, setBicycle] = React.useState(0);
  const [income, setIncome] = React.useState("");

  //Travel Info
  const [metro, setMetro] = React.useState("");
  const [tripPurpose, setTripPurpose] = React.useState("");
  const [comingFromMode, setComingFromMode] = React.useState("");
  const [comingToMode, setComingToMode] = React.useState("");
  const [travelFrequency, setTravelFrequency] = React.useState("");
  const [avg_travel_cost, setTravelCost] = React.useState("");
  const [avg_travel_time, setTravelTime] = React.useState("");
  // const [travelFrequency, setTravelFrequency] = React.useState({});
  function handleAge(event) {
    setAge(event.target.value);
  }

  function handleGender(event) {
    setGender(event.target.value);
  }

  function handleLicense(event) {
    setLicense(event.target.value);
  }

  function handleQualification(event) {
    setQualification(event.target.value);
  }

  function handleProfession(event) {
    setProfession(event.target.value);
  }

  function handleIncome(event) {
    setIncome(event.target.value);
  }

  function handleMetro(event) {
    setMetro(event.target.value);
  }

  const handleComingFromMode = name => event => {
    setComingFromMode(name);
  };
  const handleComingToMode = name => event => {
    setComingToMode(name);
  };
  const handleTravelFrequency = name => event => {
    setTravelFrequency(name);
  };

  function handleTravelTime(event) {
    setTravelTime(event.target.value);
  }

  function handleTravelCost(event) {
    setTravelCost(event.target.value);
  }

  function handleTripPurpose(event) {
    setTripPurpose(event.target.value);
  }

  function handleSubmit() {
    const data = {
      age: age,
      gender: gender,
      educationalQualification: qualification,
      profession: profession,
      monthlyIncome: income,
      noOfCars: cars,
      noOfTwoWheelers: two_wheeler,
      noOfCycles: bicycle,

      metro: metro,
      travelPurpose: tripPurpose,
      fromLandmark: null,
      toLandmark: null,
      travelTime: avg_travel_time,
      travelCost: avg_travel_time,
      accesMode: comingFromMode,
      egressMode: comingToMode,
      travelFreq: travelFrequency
    };

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    // console.log(surveyStartTime)
    axios.post(HostName + "ptSurvey/", data).then(Response => {
      const url = props.match.url;
      const surveyID = url.split('/')[3]
      axios.patch(HostName+'responseTime/'+surveyID,{
        surveyStartTime:surveyStartTime,
    })
      props.history.push({
        pathname: url + "/" + Response.data.personID + "/rating-form"
      });
    });
  }

  return (
    <Card className={classes.root}>
      <FormGroup>
        <FormLabel component="legend" className={classes.formHeader}>
          PERSONAL INFORMATION:
          <hr />
        </FormLabel>

        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              Enter Age
            </FormLabel>
            <TextField
              required
              id="outlined-required"
              label="Age"
              margin="normal"
              variant="outlined"
              value={age}
              onChange={handleAge}
            />
          </FormControl>

          <hr />
        </div>

        <div className={classes.divStyle}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              Gender
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              className={classes.group}
              value={gender}
              onChange={handleGender}
            >
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <hr />
        </div>
        <div className={classes.divStyle}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              Light motor vehicle driving license
            </FormLabel>
            <RadioGroup
              aria-label="license"
              name="licence"
              className={classes.group}
              value={license}
              onChange={handleLicense}
            >
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          <hr />
        </div>
        <div className={classes.divStyle}>
          <Typography className={classes.labelStyle}>
            Educational Qualification
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-image-native-simple">
              Educational qualification
            </InputLabel>
            <Select
              native
              value={qualification}
              onChange={handleQualification}
              input={
                <OutlinedInput
                  name="qualification"
                  labelWidth={labelWidth}
                  id="outlined-qualification-native-simple"
                />
              }
            >
              <option value="" />
              <option value="upto_10">Upto 10th</option>
              <option value="10+2">10+2</option>
              <option value="graduation">Graduation</option>
              <option value="post_graduation">Post Graduation</option>
            </Select>
          </FormControl>
          <hr />
        </div>
        <div className={classes.divStyle}>
          <Typography className={classes.labelStyle}>Profession</Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-image-native-simple">
              Profession
            </InputLabel>
            <Select
              native
              value={profession}
              onChange={handleProfession}
              input={
                <OutlinedInput
                  name="income"
                  labelWidth={labelWidth}
                  id="outlined-income-native-simple"
                />
              }
            >
              <option value="" />
              <option value="student">Student</option>
              <option value="office">Office</option>
              <option value="business">Business</option>
              <option value="retired">Retired</option>
              <option value="house_wife">House Wife</option>
            </Select>
          </FormControl>
          <hr />
        </div>
        <div className={classes.divStyle}>
          <Typography className={classes.labelStyle}>
            Average Monthly Income
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-image-native-simple">
              Average Monthly Income
            </InputLabel>
            <Select
              native
              value={income}
              onChange={handleIncome}
              input={
                <OutlinedInput
                  name="income"
                  labelWidth={labelWidth}
                  id="outlined-income-native-simple"
                />
              }
            >
              <option value="" />
              <option value="<15000">less than 15000</option>
              <option value="15000-30000">15000-30000</option>
              <option value="30000-60000">30000-60000</option>
              <option value=">60000">more than 60000</option>
            </Select>
          </FormControl>
          <hr />
        </div>
        <div className={classes.divStyle}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              No. of Vehicles in Household
            </FormLabel>
            <NumberControl
              label="Cars"
              value={cars}
              handleDecrease={() => setCars(cars - 1)}
              handleIncrease={() => setCars(cars + 1)}
            />
            <NumberControl
              label="Two Wheeler"
              value={two_wheeler}
              handleDecrease={() => setTwoWheeler(two_wheeler - 1)}
              handleIncrease={() => setTwoWheeler(two_wheeler + 1)}
            />
            <NumberControl
              label="Bicycle"
              value={bicycle}
              handleDecrease={() => setBicycle(bicycle - 1)}
              handleIncrease={() => setBicycle(bicycle + 1)}
            />
          </FormControl>
          <hr />
        </div>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <TextField
              id="outlined-required"
              label="Metro station"
              margin="normal"
              variant="outlined"
              value={metro}
              onChange={handleMetro}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel component="legend" className={classes.formHeader}>
              TRAVEL INFORMATION:
            </FormLabel>
          </Grid>
          <Grid item xs={3}></Grid>
          <hr />
        </Grid>

        <div className={classes.divStyle}>
          <Typography className={classes.labelStyle}>Trip Purpose</Typography>
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
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="social/gathering">Social/Gathering</option>
              <option value="recreational/tourism">Recreational/Tourism</option>
            </Select>
          </FormControl>
          <hr />
        </div>

        <div>
          <FormLabel component="legend" className={classes.labelStyle}>
            You are Going:
          </FormLabel>
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            className={classes.locationExpand}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>From</Typography>
              <Typography className={classes.secondaryHeading}>
                Please select your origin location
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <iframe
                className={classes.locationBox}
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13839.414621384869!2d77.88753742905271!3d29.8684940614533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1566766554708!5m2!1sen!2sin"
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
              ></iframe>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            className={classes.locationExpand}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>To</Typography>
              <Typography className={classes.secondaryHeading}>
                Please select your destination location
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <iframe
                className={classes.locationBox}
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13839.414621384869!2d77.88753742905271!3d29.8684940614533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1566766554708!5m2!1sen!2sin"
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
              ></iframe>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography className={classes.labelStyle}>
                Avg. Travel Time (min)
              </Typography>
              <TextField
                id="outlined-required"
                label="Avg. Travel Time (min)"
                margin="normal"
                variant="outlined"
                value={avg_travel_time}
                onChange={handleTravelTime}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.labelStyle}>
                Avg. Travel cost (Rs.)
              </Typography>
              <TextField
                id="outlined-required"
                label="Avg. Travel Cost"
                margin="normal"
                variant="outlined"
                value={avg_travel_cost}
                onChange={handleTravelCost}
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
        {/* <a href="http://localhost:3000/pts/travel-info"> */}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
          size="large"
        >
          Submit
        </Button>
        {/* </a> */}
      </FormGroup>
    </Card>
  );
}

export default withRouter(PersonalInformation);
