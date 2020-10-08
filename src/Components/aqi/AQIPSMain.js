
import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Global from '../../assets/globalvaribles/GlobalVariables'
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
// import Grid from "@material-ui/core/Grid";
// import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Image from 'material-ui-image'
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import aqImpact from "../../assets/icons/aqi/aq_impact.jpg"

var HostName=Global.hostName
// var globalOptional=Global.optional

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
    imgroot: {
        maxWidth: 450,
        textAlign: 'left',
    },
    imgmedia: {
        height: 260,
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
    //   textTransform: "uppercase"
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
    paraText: {
        color: "darkblue",
        fontSize: "18px"
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

  function AQIPSMain(props) {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
  
    const url = props.match.url;
    const colURL = url.split("/")[2];
    const surveyID = url.split("/")[3];
  
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
  
      const surveyStartTime = parseDate();
      axios.patch(HostName + "responseTime/" + surveyID, {
        surveyStartTime: surveyStartTime
      });
    }, []);
  
    const classes = useStyles();
  
    // (1) define here..
    // Part A
    const [airPollutionMajorProb, setAirPollutionMajorProblem] = React.useState("");
    const [airPollutionAdverseHealthEffect, setAirPollutionAdverseHealthEffect] = React.useState("");
    const [airQualityLevel, setAirQualityLevel] = React.useState("");
    const [UnderstandAbove, setUnderstandAbove] = React.useState("");
    const [airQualityLevelBad, setAirQualityLevelBad] = React.useState("");
    const [checkingAirQualityLevel, setCheckingAirQualityLevel] = React.useState("");
    const [fequentlyAirQualityLevel, setFequentlyAirQualityLevel] = React.useState("");

    // Part F
    const [age, setAge] = React.useState();
    const [gender, setGender] = React.useState("");
    const [qualification, setQualification] = React.useState("");
    const [income, setIncome] = React.useState("");
    const [marStatus, setMaritalStatus] = React.useState("");
    const [profess, setProfession] = React.useState("");
    const [comment, setComment] = React.useState("");
  

    // (2) create functions
    function handleAirPollutionMajorProblem(event){
      setAirPollutionMajorProblem(event.target.value);
    }

    function handleAirPollutionAdverseHealthEffect(event){
      setAirPollutionAdverseHealthEffect(event.target.value);
    }

    function handleAirQualityLevel(event){
      setAirQualityLevel(event.target.value);
    }

    function handleUnderstandAbove(event){
      setUnderstandAbove(event.target.value);
    }

    function handleairQualityLevelBad(event){
      setAirQualityLevelBad(event.target.value);
    }

    function hanndlecheckingAirQualityLevel(event){
      setCheckingAirQualityLevel(event.target.value);
    }

    function handlefequentlyAirQualityLevel(event){
      setFequentlyAirQualityLevel(event.target.value);
    }

    function handleAge(event) {
      setAge(event.target.value);
    }
  
    function handleGender(event) {
      setGender(event.target.value);
    }

    function handleQualification(event) {
      setQualification(event.target.value);
    }
  
    function handleIncome(event) {
      setIncome(event.target.value);
    }
  
    function handleMaritalStatus(event) {
      setMaritalStatus(event.target.value);
    }

    function handleProfession(event) {
        setProfession(event.target.value);
    }

    function handleComment(event){
        setComment(event.target.value);
    }

    function parseDate() {
        let date = new Date();
        // In case its IOS, parse the fulldate parts and re-create the date object.
        if(Number.isNaN(date.getMonth())) {
        let arr = date.split(/[- :]/);
        date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
        }
        return date;
    }
  
    function handleSubmit() {
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.xsrfHeaderName = "X-CSRFToken";
  
      axios.get(HostName + "college/").then(Response => {
        const collArray = Response.data.filter(item => {
          return colURL === item.collegeURL;
        });
        const collegeID = collArray[0].collegeID;
  
        axios.post(HostName + "aqips/", {
            surveyID: surveyID,
            collegeID: collegeID,

            // (4) post to server
            // Part A
            airPollutionMajorProb: airPollutionMajorProb,
            airPollutionAdverseHealthEffect: airPollutionAdverseHealthEffect,
            airQualityLevel: airQualityLevel,
            UnderstandAbove: UnderstandAbove,
            airQualityLevelBad: airQualityLevelBad,
            checkingAirQualityLevel: checkingAirQualityLevel,
            fequentlyAirQualityLevel: fequentlyAirQualityLevel,

            age: age,
            gender: gender,
            educationalQualification: qualification,
            monthlyIncome: income,
            maritialStatus: marStatus,
            profession: profess,
            comment: comment
            
          })
          .then(Response => {
            console.log(Response);
            props.history.push({pathname:"/finishsurvey"});

              var time = parseDate();
              const url = props.match.url;
              const survId = url.split("/")[3];

              axios.patch(HostName + "responseTime/" + survId, {
                  surveyEndTime: time
              });
          });
          
      });
    }
  
      return (
          <Card className={classes.root}>
              <FormGroup>
                  <Typography  component="legend" className={classes.formHeader}>
                      Air Quality Perception Survey
            <hr />
                  </Typography >
                  <Typography  className={classes.paraText}><span>
                  </span><p>You may have noticed that Air Pollution in Delhi is getting worse
                  day by day. We are conducting this survey to determine
                  how air pollution impacts changing the commuter's
                  behavior in terms of air quality, travel cost and travel time.
                This survey will assist the commuters in reducing their air pollution exposure.</p>

                      <br></br>

                      <p>Please answer all questions in Sections A to F.</p>
                  </Typography >
                  {/* (3) create front-end question*/}
                  <Typography  component="legend" className={classes.formHeader}>
                      A:  Information Seeking and Engagement
            <hr />
                  </Typography >

                  <div className={classes.divStyle}>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel component="legend" className={classes.labelStyle}>
                          Do  you  see  air  pollution  as  a major problem  in  your  area  of  residence  or office/ school/ college?
              </FormLabel>
                          <RadioGroup
                              aria-label="airPollutionMajorProb"
                              name="airPollutionMajorProb"
                              className={classes.group}
                              value={airPollutionMajorProb}
                              onChange={handleAirPollutionMajorProblem}
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
                      <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel component="legend" className={classes.labelStyle}>
                          Do you know that air pollution can cause adverse health effects?
              </FormLabel>
                          <RadioGroup
                              aria-label="airPollutionAdverseHealthEffect"
                              name="airPollutionAdverseHealthEffect"
                              className={classes.group}
                              value={airPollutionAdverseHealthEffect}
                              onChange={handleAirPollutionAdverseHealthEffect}
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
                      <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel component="legend" className={classes.labelStyle}>
                          Do you already know about Air Quality Index (AQI)/ levels?
              </FormLabel>
                          <RadioGroup
                              aria-label="airQualityLevel"
                              name="airQualityLevel"
                              className={classes.group}
                              value={airQualityLevel}
                              onChange={handleAirQualityLevel}
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

                  {/*  TODO add AQI related images here. */}

                  <div className={classes.divStyle}>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel component="legend" className={classes.labelStyle}>
                          Can you understand the above?
              </FormLabel>
                          <RadioGroup
                              aria-label="UnderstandAbove"
                              name="UnderstandAbove"
                              className={classes.group}
                              value={UnderstandAbove}
                              onChange={handleUnderstandAbove}
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
                      <FormControl component="fieldset" className={classes.formControl}>
                          <FormLabel component="legend" className={classes.labelStyle}>
                          According to you from which air quality level you feel considered bad?
              </FormLabel>
                          <RadioGroup
                              aria-label="airQualityLevelBad"
                              name="airQualityLevelBad"
                              className={classes.group}
                              value={airQualityLevelBad}
                              onChange={handleairQualityLevelBad}
                          >
                              <FormControlLabel
                                  value="Good(0-50)"
                                  control={<Radio color="primary" />}
                                  label="Good(0-50)"
                              />
                              <FormControlLabel
                                  value="Satisfactory(51-100)"
                                  control={<Radio color="primary" />}
                                  label="Satisfactory(51-100)"
                              />
                                <FormControlLabel
                                  value="Moderate(101-200)"
                                  control={<Radio color="primary" />}
                                  label="Moderate(101-200)"
                              />
                                <FormControlLabel
                                  value="Poor(201-300)"
                                  control={<Radio color="primary" />}
                                  label="Poor(201-300)"
                              />
                                <FormControlLabel
                                  value="Very Poor(301-400)"
                                  control={<Radio color="primary" />}
                                  label="Very Poor(301-400)"
                              />
                              <FormControlLabel
                                  value="Severe(401-500)"
                                  control={<Radio color="primary" />}
                                  label="Severe(401-500)"
                              />
                              <FormControlLabel
                                  value="I don't look at Air Quality level"
                                  control={<Radio color="primary" />}
                                  label="I don't look at Air Quality level"
                              />
                          </RadioGroup>
                      </FormControl>
                      <hr />
                  </div>

                  <Typography  component="legend" className={classes.formHeader}>
                      B:  Trip Information
            <hr />
                  </Typography >



                  <Typography  component="legend" className={classes.formHeader}>
                      C:  Willingness to Change/ Adapt
            <hr />
                  </Typography >
            <hr/>
                  <div style={{ display:'flex', justifyContent:'center' }}>
                  <Card className={classes.imgroot}>
                  <CardActionArea>
                      <CardMedia
                          className={classes.imgmedia}
                          image={aqImpact}
                          title="Health Effects of Air Pollution"
                      />
                  <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Image Source: https://www.gov.uk/government/publications/health-matters-air-pollution/health-matters-air-pollution
                      </Typography>
                  </CardContent>
                  </CardActionArea>
                  </Card>
                  </div>
                  
            <hr/>
                  <Typography  component="legend" className={classes.formHeader}>
                      D:  Impact of Air Pollution Exposure
            <hr />
                  </Typography >


                  <Typography  component="legend" className={classes.formHeader}>
                      E:  Prevention/ Self-protective action 
            <hr />
                  </Typography >



                  <Typography  component="legend" className={classes.formHeader}>
                      F: Socioeconomic Characteristics
            <hr />
                  </Typography >
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
                      <Typography className={classes.labelStyle}>
                          Age
            </Typography>
                      <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-image-native-simple">
                              Age category
              </InputLabel>
                          <Select
                              native
                              value={age}
                              onChange={handleAge}
                              input={
                                  <OutlinedInput
                                      name="age"
                                      labelWidth={labelWidth}
                                      id="outlined-qualification-native-simple"
                                  />
                              }
                          >
                               <option value="" />
                              <option value="below4">Below 4 years</option>
                              <option value="4_18">4 - 18 years</option>
                              <option value="18_25">18 - 25 years</option>
                              <option value="25_40">25 - 40 years</option>
                              <option value="40_60">40 - 60 years</option>
                              <option value="above60">Above 60 years</option>
                          </Select>
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
                              <option value="primary">Up to primary school</option>
                              <option value="secondary">Up to secondary school</option>
                              <option value="senior_secondary">Up to senior secondary school</option>
                              <option value="graduation">Graduation</option>
                              <option value="post_graduation">Post graduation and higher</option>
                              <option value="professionalCourses">Professional courses and other</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>
                  <div className={classes.divStyle}>
                      <Typography className={classes.labelStyle}>Marital Status</Typography>
                      <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-image-native-simple">
                              Marital status
              </InputLabel>
                          <Select
                              native
                              value={marStatus}
                              onChange={handleMaritalStatus}
                              input={
                                  <OutlinedInput
                                      name="marStatus"
                                      labelWidth={labelWidth}
                                      id="outlined-income-native-simple"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="single">Single</option>
                              <option value="married">Married</option>
                              <option value="Divorced">Divorced/ Widowed</option>
                              <option value="noMention">Prefer not to mention</option>
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
                              value={profess}
                              onChange={handleProfession}
                              input={
                                  <OutlinedInput
                                      name="profess"
                                      labelWidth={labelWidth}
                                      id="outlined-income-native-simple"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="student">Student</option>
                              <option value="business">Business/ self-employed/ consultant</option>
                              <option value="govtEmployee">Govt. employee</option>
                              <option value="privEmployee">Private employee/ Salaried worker</option>
                              <option value="ngo">NGO/ Volunteer</option>
                              <option value="retired">Retired</option>
                              <option value="jobseeker">Jobseeker</option>
                              <option value="driver">Driver (taxi/ auto-rickshaw/ goods vehicle, etc.)</option>
                              <option value="housewife">House Wife</option>
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
                              Average monthly income (INR)
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
                              <option value="<10000">less than 10,000</option>
                              <option value="10000-30000">10,000 - 30,000</option>
                              <option value="30000-50000">30,000 - 50,000</option>
                              <option value="50000-80000">50,000 - 80,000</option>
                              <option value="80000-100000">80,000 - 1,00,000</option>
                              <option value=">100000">more than 1,00,000</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>
                  <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              Any other crisp comment/ feedback?
            </FormLabel>
            <TextField
              required
              id="outlined-required"
              label="comment"
              margin="normal"
              variant="outlined"
              value={comment}
              onChange={handleComment}
            />
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
                  {/* </a> */}
              </FormGroup>
          </Card>
      );
  }
export default withRouter(AQIPSMain);