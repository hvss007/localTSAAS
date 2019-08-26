import React from "react";
import { withRouter } from "react-router-dom";
import NumberControl from "./../../NumberControl/NumberControl";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
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
  divStyle: {
    margin: "0 10px 0 10px"
  }
}));

function PersonalInformation(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const classes = useStyles();
  const [age, setAge] = React.useState();
  const [gender, setGender] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [qualification, setQualification] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [cars, setCars] = React.useState(0);
  const [two_wheeler, setTwoWheeler] = React.useState(0);
  const [bicycle, setBicycle] = React.useState(0);
  const [income, setIncome] = React.useState("");

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

  function handleSubmit() {
    const data = {
      age: age,
      gender: gender,
      educationalQualification: qualification,
      profession: profession,
      monthlyIncome: income,
      noOfCars: cars,
      noOfTwoWheelers: two_wheeler,
      noOfCycles: bicycle
    };

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.post(HostName + "ptSurvey/", data).then(Response => {
      console.log(Response);
      props.history.push({
        pathname: "person" + Response.data.personID + "/travel-info"
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
