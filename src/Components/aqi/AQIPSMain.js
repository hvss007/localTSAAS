
// import React,{Component} from 'react';
import React from 'react';
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
// import FormLabel from "@material-ui/core/FormLabel";
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
// import CardActions from '@material-ui/core/CardActions';

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
    // const [expanded, setExpanded] = React.useState(false);
  
    // const handleChange = panel => (event, isExpanded) => {
    //   setExpanded(isExpanded ? panel : false);
    // };
  
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
    const [aqiUnderstanding, setAqiUnderstanding] = React.useState("");
    const [UnderstandAbove, setUnderstandAbove] = React.useState("");
    const [airQualityLevelBad, setAirQualityLevelBad] = React.useState("");
    const [checkingAirQualityLevel, setCheckingAirQualityLevel] = React.useState("");
    const [fequentlyAirQualityLevel, setFequentlyAirQualityLevel] = React.useState("");

    // Part B
    const[tripsPerDay, setTripsPerDay] = React.useState("");
    const [purposeTrip, setPurposeTrip] = React.useState("");
    const [primaryTrip, setPrimaryTrip] = React.useState("");
    const [secondaryTrip, setSecondaryTrip] = React.useState("");
    const [avoidTrip, setAvoidTrip] = React.useState("");
    const [changeInChoice, setChangeInChoice] = React.useState("");
    const [choiceInWinter, setChoiceInWinter] = React.useState("");
    const [changeInActivity, setChangeInActivity] = React.useState("");

    // Part C
    const [informationRequired, setInformationRequired] = React.useState("");
    const [avoidWalk, setAvoidWalk] = React.useState("");
    const [preferWFH, setPreferWFH] = React.useState("");

    // Part D
    const [perceiveAQIHome, setPerceiveAQIHome] = React.useState("");
    const [perceiveAQIWork, setPerceiveAQIWork] = React.useState("");
    const [healthEffect, setHealthEffect] = React.useState("");
    const [familyHealthEffect, setFamilyHealthEffect] = React.useState("");
    const [travelHealthEffect, setTravelHealthEffect] = React.useState("");
    const [psychologyEffect, setPsychologyEffect] = React.useState("");

    // Part E
    const [maskAirPollution, setMaskAirPollution] = React.useState("");
    const [airFilter, setAirFilter] = React.useState("");
    const [missSchool, setMissSchool] = React.useState("");
    const [closeWindow, setCloseWindow] = React.useState("");
    const [outdoorActivity, setOutdoorActivity] = React.useState("");


    // Part F
    const [age, setAge] = React.useState();
    const [gender, setGender] = React.useState("");
    const [qualification, setQualification] = React.useState("");
    const [income, setIncome] = React.useState("");
    const [marStatus, setMaritalStatus] = React.useState("");
    const [profess, setProfession] = React.useState("");
    const [comment, setComment] = React.useState("");
  

    // (2) create functions
    //Part A
    function handleAirPollutionMajorProblem(event){
      setAirPollutionMajorProblem(event.target.value);
    }

    function handleAirPollutionAdverseHealthEffect(event){
      setAirPollutionAdverseHealthEffect(event.target.value);
    }

    function handleAqiUnderstanding(event){
      setAqiUnderstanding(event.target.value);
    }

    function handleUnderstandAbove(event){
      setUnderstandAbove(event.target.value);
    }

    function handleairQualityLevelBad(event){
      setAirQualityLevelBad(event.target.value);
    }

    function handleCheckingAirQualityLevel(event){
      setCheckingAirQualityLevel(event.target.value);
    }

    function handleFequentlyAirQualityLevel(event){
      setFequentlyAirQualityLevel(event.target.value);
    }

    // Part B
    function handleTripsPerDay(event){
        setTripsPerDay(event.target.value);
    }

    function handlePurposeTrip(event) {
        setPurposeTrip(event.target.value);
    }

    function handlePrimaryTrip(event) {
        setPrimaryTrip(event.target.value);
    }

    function handleSecondaryTrip(event) {
        setSecondaryTrip(event.target.value);
    }

    function handleAvoidTrip(event) {
        setAvoidTrip(event.target.value);
    }

    function handleChangeInChoice(event) {
        setChangeInChoice(event.target.value);
    }

    function handleChoiceInWinter(event) {
        setChoiceInWinter(event.target.value);
    }

    function handleChangeInActivity(event) {
        setChangeInActivity(event.target.value);
    }

    // Part C

    function handleInformationRequired(event) {
        setInformationRequired(event.target.value);
    }

    function handleAvoidWalk(event) {
        setAvoidWalk(event.target.value);
    }

    function handlePreferWFH(event) {
        setPreferWFH(event.target.value);
    }

    // Part D

    function handlePerceiveAQIHome(event) {
        setPerceiveAQIHome(event.target.value);
    }

    function handlePerceiveAQIWork(event) {
        setPerceiveAQIWork(event.target.value);
    }

    function handleHealthEffect(event) {
        setHealthEffect(event.target.value);
    }

    function handleFamilyHealthEffect(event) {
        setFamilyHealthEffect(event.target.value);
    }

    function handleTravelHealthEffect(event) {
        setTravelHealthEffect(event.target.value)
    }

    function handlePsychologyEffect(event) {
        setPsychologyEffect(event.target.value)
    }

    // Part E

    function handleMaskAirPollution(event) {
        setMaskAirPollution(event.target.value)
    }

    function handleAirFilter(event) {
        setAirFilter(event.target.value)
    }

    function handleMissSchool(event) {
        setMissSchool(event.target.value)
    }

    function handleCloseWindow(event) {
        setCloseWindow(event.target.value)
    }

    function handleOutdoorActivity(event) {
        setOutdoorActivity(event.target.value)
    }  

    // Part F
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
            aqiUnderstanding: aqiUnderstanding,
            UnderstandAbove: UnderstandAbove,
            airQualityLevelBad: airQualityLevelBad,
            checkingAirQualityLevel: checkingAirQualityLevel,
            fequentlyAirQualityLevel: fequentlyAirQualityLevel,
            // Part B
            purposeTrip: purposeTrip,
            primaryTrip: primaryTrip,
            secondaryTrip: secondaryTrip,
            avoidTrip: avoidTrip,
            changeInChoice: changeInChoice,
            choiceInWinter: choiceInWinter,
            changeInActivity: changeInActivity,
            // Part C
            informationRequired: informationRequired,
            avoidWalk: avoidWalk,
            preferWFH: preferWFH,
            // Part D
            perceiveAQIHome: perceiveAQIHome,
            perceiveAQIWork: perceiveAQIWork,
            healthEffect: healthEffect,
            familyHealthEffect: familyHealthEffect,
            travelHealthEffect: travelHealthEffect,
            psychologyEffect: psychologyEffect,
            // Part E
            maskAirPollution: maskAirPollution,
            airFilter: airFilter,
            missSchool: missSchool,
            closeWindow: closeWindow,
            outdoorActivity: outdoorActivity,
            // Part F
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
                  <Typography  className={classes.formHeader}>
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
                  <Typography className={classes.formHeader}>
                      A:  Information Seeking and Engagement
            <hr />
                  </Typography >

                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Do  you  see  air  pollution  as  a major problem  in  your  area  of  residence  or office/ school/ college?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
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
                  <Typography className={classes.labelStyle}>
                          Do you know that air pollution can cause adverse health effects?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
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
                  <Typography className={classes.labelStyle}>
                          Are you aware of the Air Quality Index (AQI) or level and understand it?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="aqiUnderstanding"
                              name="aqiUnderstanding"
                              className={classes.group}
                              value={aqiUnderstanding}
                              onChange={handleAqiUnderstanding}
                          >
                              <FormControlLabel
                                  value="awareUnderstand"
                                  control={<Radio color="primary" />}
                                  label="Aware and understand it"
                              />
                              <FormControlLabel
                                  value="AwareNoUnderstand"
                                  control={<Radio color="primary" />}
                                  label="Aware but do not understand"
                              />
                              <FormControlLabel
                                  value="notAware"
                                  control={<Radio color="primary" />}
                                  label="Not aware"
                              />
                          </RadioGroup>
                      </FormControl>
                      <hr />
                  </div>

                  {/*  TODO add AQI related images here. */}

                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Can you understand the Air Quality Index (AQI) or level with the above example?
                </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
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
                   <Typography className={classes.labelStyle}>
                          According to you from which Air Quality Index (AQI) or level you feel considered bad?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-airQualityLevelBad">
                               AQI perception
                         </InputLabel>    
                         <Select
                              native
                              value={airQualityLevelBad}
                              onChange={handleairQualityLevelBad}
                              input={
                                  <OutlinedInput
                                      name="airQualityLevelBad"
                                      labelWidth={labelWidth}
                                      id="outlined-airQualityLevelBad"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="good">Good (0 - 50)</option>
                              <option value="Satisfactory">Satisfactory (51 - 100)</option>
                              <option value="Moderate">Moderate (101 - 200)</option>
                              <option value="Poor">Poor (201 - 300)</option>
                              <option value="VeryPoor">Very poor (301 - 400)</option>
                              <option value="Severe">Severe (401 - 500)</option>
                              <option value="IDontLookAQI">I don't look at Air Quality Index (AQI) or level</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>

                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Which information source do you use for checking the Air Quality Index / level?
                    </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-checkingAirQualityLevel">
                              Source of AQI
                         </InputLabel>    
                         <Select
                              native
                              value={checkingAirQualityLevel}
                              onChange={handleCheckingAirQualityLevel}
                              input={
                                  <OutlinedInput
                                      name="checkingAirQualityLevel"
                                      labelWidth={labelWidth}
                                      id="outlined-checkingAirQualityLevel"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="websiet">Website</option>
                              <option value="mobileApp">Mobile App</option>
                              <option value="newspaper">Newspaper</option>
                              <option value="radio">Radio (FM)</option>
                              <option value="other">other</option>
                              <option value="IDontCheckAQI">I don't check at Air Quality Index (AQI) or level</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>

                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          How frequently do you look on Air Quality Index / level?
              </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-fequentlyAirQualityLevel">
                              Frequency
                         </InputLabel>
                         <Select
                              native
                              value={fequentlyAirQualityLevel}
                              onChange={handleFequentlyAirQualityLevel}
                              input={
                                  <OutlinedInput
                                      name="fequentlyAirQualityLevel"
                                      labelWidth={labelWidth}
                                      id="outlined-fequentlyAirQualityLevel"
                                  />
                              }
                          >
                                <option value="" />
                              <option value="daily">Daily</option>
                              <option value="2_4PerWeek">2 - 4 times per week</option>
                              <option value="OnceAWeek">Once a week</option>
                              <option value="OnceAMonth">Once a month</option>
                              <option value="IDontLookAQI">I don't look at Air Quality Index / level</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>

                  <Typography  component="legend" className={classes.formHeader}>
                      B:  Trip Information
                  </Typography >
                  <hr />

                  
                  <div className={classes.divStyle}>
                      <Typography className={classes.labelStyle}>How many trips do you make in a Day?</Typography>
                      <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-tripsPerDaySimple">
                              Trips per day
                          </InputLabel>
                          <Select
                              native
                              value={tripsPerDay}
                              onChange={handleTripsPerDay}
                              input={
                                  <OutlinedInput
                                      name="tripsPerDay"
                                      labelWidth={labelWidth}
                                      id="outlined-tripsPerDaySimple"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="<2">up to 2</option>
                              <option value="3_4">3 - 4</option>
                              <option value="5orMorethan">5 or more</option>
                              <option value="IdontTravel">I do not travel</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>
                    

                  <div className={classes.divStyle}>
                      <Typography className={classes.labelStyle}>What is the purpose of the trip?</Typography>
                      <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-purposeTrip">
                              Purpose of trip
              </InputLabel>
                          <Select
                              native
                              value={purposeTrip}
                              onChange={handlePurposeTrip}
                              input={
                                  <OutlinedInput
                                      name="purposeTrip"
                                      labelWidth={labelWidth}
                                      id="outlined-purposeTrip"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="school_primary">School - (Primary Trip)</option>
                              <option value="College_University">College/University - (Primary Trip)</option>
                              <option value="office">Office – (Primary trip)</option>
                              <option value="front_line">Front Line Worker (health, Police) – (Primary trip)</option>
                              <option value="retailer">Retailer - (Secondary trip)</option>
                              <option value="shopping">Shopping - (Secondary trip)</option>
                              <option value="super_market">Super Markert - (Secondary trip)</option>
                              <option value="gym">Gym - (Secondary trip)</option>
                              <option value="sports">Sports - (Secondary trip)</option>
                              <option value="leisure">Leisure - (Secondary trip)</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>



                  <div className={classes.divStyle}>
                      <Typography className={classes.labelStyle}>Which main mode of transport do you use for commuting the Primary trip (work or education)?</Typography>
                      <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-primaryTrip">
                          Mode for primary trip
                        </InputLabel>
                          <Select
                              native
                              value={primaryTrip}
                              onChange={handlePrimaryTrip}
                              input={
                                  <OutlinedInput
                                      name="primaryTrip"
                                      labelWidth={labelWidth}
                                      id="outlined-primaryTrip"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="Car">Car</option>
                              <option value="CarSharing">Car Sharing(OLA, Uber, Other Taxi)</option>
                              <option value="Bus">Bus</option>
                              <option value="Metro">Metro</option>
                              <option value="TwoWheeler">Two Wheeler(2-W)</option>
                              <option value="MotorBikeSharing">Motor Bike Sharing</option>
                              <option value="AutoRickshaw">Auto-Rickshaws(3-W)</option>
                              <option value="Bicycle">Bicycle</option>
                              <option value="Walk">Walk</option>

                          </Select>
                      </FormControl>
                      <hr />
                  </div>


                  <div className={classes.divStyle}>
                      <Typography className={classes.labelStyle}>Which mode of transport do you use for commuting the Secondary Trip (Shopping or Gym)?</Typography>
                      <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-secondaryTrip">
                          Mode for secondary trip
                        </InputLabel>
                          <Select
                              native
                              value={secondaryTrip}
                              onChange={handleSecondaryTrip}
                              input={
                                  <OutlinedInput
                                      name="secondaryTrip"
                                      labelWidth={labelWidth}
                                      id="outlined-secondaryTrip"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="Car">Car</option>
                              <option value="CarSharing">Car Sharing(OLA, Uber, Other Taxi)</option>
                              <option value="Bus">Bus</option>
                              <option value="Metro">Metro</option>
                              <option value="TwoWheeler">Two Wheeler(2-W)</option>
                              <option value="MotorBikeSharing">Motor Bike Sharing</option>
                              <option value="AutoRickshaw">Auto-Rickshaws(3-W)</option>
                              <option value="Bicycle">Bicycle</option>
                              <option value="Walk">Walk</option>

                          </Select>
                      </FormControl>
                      <hr />
                  </div>



                   <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          At which air quality level would you avoid traveling?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-avoidTrip">
                              Avoid traveling
                         </InputLabel>    
                         <Select
                              native
                              value={avoidTrip}
                              onChange={handleAvoidTrip}
                              input={
                                  <OutlinedInput
                                      name="avoidTrip"
                                      labelWidth={labelWidth}
                                      id="outlined-avoidTrip"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="good">Good (0 - 50)</option>
                              <option value="Satisfactory">Satisfactory (51 - 100)</option>
                              <option value="Moderate">Moderate (101 - 200)</option>
                              <option value="Poor">Poor (201 - 300)</option>
                              <option value="VeryPoor">Very poor (301 - 400)</option>
                              <option value="Severe">Severe (401 - 500)</option>
                              <option value="NotTravelingAtAll">Not traveling at all</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>



                  <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                         How is air quality affecting your choice?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-changeInChoice">
                              Change in choice 
                         </InputLabel>    
                         <Select
                              native
                              value={changeInChoice}
                              onChange={handleChangeInChoice}
                              input={
                                  <OutlinedInput
                                      name="changeInChoice"
                                      labelWidth={labelWidth}
                                      id="outlined-changeInChoice"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="ChangeOfTravelTime">Change of travel time</option>
                              <option value="ChangeOfTravelMode">Change of travel mode</option>
                              <option value="ChangeOfTravelRoute">Change of travel route</option>
                              <option value="NotTravelingAtAll">Not traveling at all</option>
                              <option value="NoEffect">No effect</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>



                   <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Would you change the travel choice in winter, when air pollution is high?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="choiceInWinter"
                              name="choiceInWinter"
                              className={classes.group}
                              value={choiceInWinter}
                              onChange={handleChoiceInWinter}
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
                          Due to air pollution, have you ever changed your leisure/ Social/ Sports activities?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="changeInActivity"
                              name="changeInActivity"
                              className={classes.group}
                              value={changeInActivity}
                              onChange={handleChangeInActivity}
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


                  <Typography  className={classes.formHeader}>
                      C:  Willingness to Change/ Adapt
            <hr />
                  </Typography >
            
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
            

                  <div className={classes.divStyle}>
                  <hr />
                  <Typography className={classes.labelStyle}>
                          What type of information would you like?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="informationRequired"
                              name="informationRequired"
                              className={classes.group}
                              value={informationRequired}
                              onChange={handleInformationRequired}
                          >
                              <FormControlLabel
                                  value="RelatedToTheAirPollutionLevel"
                                  control={<Radio color="primary" />}
                                  label="Related to the air pollution level"
                              />
                              <FormControlLabel
                                  value="RelatedToTravelModeInformation"
                                  control={<Radio color="primary" />}
                                  label="Related to travel mode information"
                              />
                              <FormControlLabel
                                  value="RelatedToTravelTimeInformation"
                                  control={<Radio color="primary" />}
                                  label="Related to travel time information"
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
                          Do you avoid walking and cycling in bad Air Quality?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="avoidWalk"
                              name="avoidWalk"
                              className={classes.group}
                              value={avoidWalk}
                              onChange={handleAvoidWalk}
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
                          Do you prefer to work from home when Air Quality is bad?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="preferWFH"
                              name="preferWFH"
                              className={classes.group}
                              value={preferWFH}
                              onChange={handlePreferWFH}
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



                  <Typography  className={classes.formHeader}>
                  
                      D:  Impact of Air Pollution Exposure
            <hr />
                  </Typography >



                  <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          To what extent do you perceive the air quality in your neighborhood (where you reside) as?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-perceiveAQIHome">
                              Perceive Air Quality at reside
                         </InputLabel>    
                         <Select
                              native
                              value={perceiveAQIHome}
                              onChange={handlePerceiveAQIHome}
                              input={
                                  <OutlinedInput
                                      name="perceiveAQIHome"
                                      labelWidth={labelWidth}
                                      id="outlined-perceiveAQIHome"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="good">Good (0 - 50)</option>
                              <option value="Satisfactory">Satisfactory (51 - 100)</option>
                              <option value="Moderate">Moderate (101 - 200)</option>
                              <option value="Poor">Poor (201 - 300)</option>
                              <option value="VeryPoor">Very poor (301 - 400)</option>
                              <option value="Severe">Severe (401 - 500)</option>
                        </Select>
                      </FormControl>
                      <hr />
                  </div>



                  <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          To what extent do you perceive the neighborhood's air quality where you frequently travel for work or study?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-perceiveAQIWork">
                              Perceive Air Quality at work
                         </InputLabel>    
                         <Select
                              native
                              value={perceiveAQIWork}
                              onChange={handlePerceiveAQIWork}
                              input={
                                  <OutlinedInput
                                      name="perceiveAQIWork"
                                      labelWidth={labelWidth}
                                      id="outlined-perceiveAQIWork"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="good">Good (0 - 50)</option>
                              <option value="Satisfactory">Satisfactory (51 - 100)</option>
                              <option value="Moderate">Moderate (101 - 200)</option>
                              <option value="Poor">Poor (201 - 300)</option>
                              <option value="VeryPoor">Very poor (301 - 400)</option>
                              <option value="Severe">Severe (401 - 500)</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>



                  <div className={classes.divStyle}>
                      <Typography className={classes.labelStyle}>
                      In which of the following ways are you affected by air pollution? Please select all applicable.
                      </Typography>
                      <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-healthEffect">
                          Health effect
                        </InputLabel>
                          <Select
                              native
                              value={healthEffect}
                              onChange={handleHealthEffect}
                              input={
                                  <OutlinedInput
                                      name="healthEffect"
                                      labelWidth={labelWidth}
                                      id="outlined-healthEffect"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="Breathlessness/HavingMoreDifficultyInBreathing">Breathlessness/having more difficulty in breathing</option>
                              <option value="DoingLessOutdoorActivities">Doing less outdoor activities</option>
                              <option value="DoingMoreToLookAfterMySkin">Doing more to look after my skin</option>
                              <option value="DoingMoreToStayHealthy">Doing more to stay healthy</option>
                              <option value="FeelingDepressed">Feeling depressed</option>
                              <option value="MotorBikeSharing">Irritation to eyes/nose/throat</option>
                              <option value="SkinProblems">Skin problems</option>
                              <option value="BodyAllergies">Body Allergies</option>
                              <option value="WantingToMoveToOtherLessPollutedPlaces">Wanting to move to other less polluted places</option>
                              <option value="AsthmaIncidences">Asthma incidences</option>
                              <option value="PoorVisibility">Poor visibility</option>
                              <option value="WorryingAboutTheLivingEnvironmentForChildren">Worrying about the living environment for children</option>
                              <option value="NotAffectedAtAll">Not affected at all</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>


                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          In your view, has air pollution ever affected you or your family member or your friend's health?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="familyHealthEffect"
                              name="aqiUnderstanding"
                              className={classes.group}
                              value={familyHealthEffect}
                              onChange={handleFamilyHealthEffect}
                          >
                              <FormControlLabel
                                  value="always"
                                  control={<Radio color="primary" />}
                                  label="Always"
                              />
                              <FormControlLabel
                                  value="often"
                                  control={<Radio color="primary" />}
                                  label="Often"
                              />
                              <FormControlLabel
                                  value="sometimes"
                                  control={<Radio color="primary" />}
                                  label="Sometimes"
                              />
                              <FormControlLabel
                                  value="rarely"
                                  control={<Radio color="primary" />}
                                  label="Rarely"
                              />
                              <FormControlLabel
                                  value="never"
                                  control={<Radio color="primary" />}
                                  label="Never"
                              />
                          </RadioGroup>
                      </FormControl>
                      <hr />
                  </div>



                   <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          After or during your travel, do you feel any of these?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-travelHealthEffect">
                              Travel health effect
                         </InputLabel>    
                         <Select
                              native
                              value={travelHealthEffect}
                              onChange={handleTravelHealthEffect}
                              input={
                                  <OutlinedInput
                                      name="travelHealthEffect"
                                      labelWidth={labelWidth}
                                      id="outlined-travelHealthEffect"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="Sneezing">Sneezing</option>
                              <option value="RunnyNose">Runny Nose</option>
                              <option value="EyeIrritation">Eye Irritation</option>
                              <option value="ShortnessOfBreath">Shortness Of Breath (201 - 300)</option>
                              <option value="ReducedLungFunctioning">Reduced Lung Functioning</option>
                              <option value="Other">Other</option>
                              <option value="None">None</option>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>



                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Do you feel any of the following psychology impact due to air pollution?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="psychologyEffect"
                              name="psychologyEffect"
                              className={classes.group}
                              value={psychologyEffect}
                              onChange={handlePsychologyEffect}
                          >
                              <FormControlLabel
                                  value="aggressiveness"
                                  control={<Radio color="primary" />}
                                  label="Aggressiveness"
                              />
                              <FormControlLabel
                                  value="anxiety"
                                  control={<Radio color="primary" />}
                                  label="Anxiety"
                              />
                              <FormControlLabel
                                  value="stress"
                                  control={<Radio color="primary" />}
                                  label="Stress"
                              />
                              <FormControlLabel
                                  value="frustation"
                                  control={<Radio color="primary" />}
                                  label="Frustation"
                              />
                              <FormControlLabel
                                  value="none"
                                  control={<Radio color="primary" />}
                                  label="None"
                              />
                          </RadioGroup>
                      </FormControl>
                      <hr />
                  </div>

                  
                  <Typography className={classes.formHeader}>
                      E:  Prevention/ Self-protective action 
            <hr />
                  </Typography >

                  <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          Do you use Mask to protect from air pollution?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-maskAirPollution">
                              Use Mask
                         </InputLabel>    
                         <Select
                              native
                              value={maskAirPollution}
                              onChange={handleMaskAirPollution}
                              input={
                                  <OutlinedInput
                                      name="maskAirPollution"
                                      labelWidth={labelWidth}
                                      id="outlined-maskAirPollution"
                                  />
                              }
                          >
                              <option value="" />
                              <option value="IUsedMaskBeforeCOVID-19">I used Mask before COVID-19 (0 - 50)</option>
                              <option value="IUsedMaskafterCOVID-19">I used Mask after COVID-19</option>
                              <option value="IUseMaskBecauseOfAirPollution">I use Mask because of air pollution</option>
                              <option value="IUseMaskBecauseOfSkin_OtherHealthIssues">I use Mask because of Skin/other health issues</option>
                              <option value="IDontUsedMask">I don't used Mask (301 - 400)</option>
                            
                          </Select>
                      </FormControl>
                      <hr />
                  </div>


                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Do you use Air Filter/Air Conditioner with a purifier at home?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="airFilter"
                              name="airFilter"
                              className={classes.group}
                              value={airFilter}
                              onChange={handleAirFilter}
                          >
                              <FormControlLabel
                                  value="yes"
                                  control={<Radio color="primary" />}
                                  label="Yes"
                              />
                              <FormControlLabel
                                  value="no,butPlanToBuy"
                                  control={<Radio color="primary" />}
                                  label="No, but plan to buy"
                              />
                              <FormControlLabel
                                  value="no,DoNotPlanToBuy"
                                  control={<Radio color="primary" />}
                                  label="No, do not plan to buy"
                              />
                          </RadioGroup>
                      </FormControl>
                      <hr />
                  </div>



                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Do you miss school or work during high pollution?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="missSchool"
                              name="missSchool"
                              className={classes.group}
                              value={missSchool}
                              onChange={handleMissSchool}
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
                          Do you Close the windows of the car during bad air pollution?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="closeWindow"
                              name="closeWindow"
                              className={classes.group}
                              value={closeWindow}
                              onChange={handleCloseWindow}
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
                         Due to high air pollution, do you avoid physical outdoor exercise?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <RadioGroup
                              aria-label="outdoorActivity"
                              name="outdoorActivity"
                              className={classes.group}
                              value={outdoorActivity}
                              onChange={handleOutdoorActivity}
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


                  <Typography   className={classes.formHeader}>
                      F: Socioeconomic Characteristics
            <hr />
                  </Typography >
                  <div className={classes.divStyle}>
                      <FormControl component="fieldset" className={classes.formControl}>
                          <Typography  className={classes.labelStyle}>
                              Gender
              </Typography>
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
                          <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
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
                                      id="outlined-age-native-simple"
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
                          <InputLabel ref={inputLabel} htmlFor="outlined-qualification-native-simple">
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
                          <InputLabel ref={inputLabel} htmlFor="outlined-marital-native-simple">
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
                                      id="outlined-marital-native-simple"
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
                          <InputLabel ref={inputLabel} htmlFor="outlined-profession-native-simple">
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
                                      id="outlined-profession-native-simple"
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
                          <InputLabel ref={inputLabel} htmlFor="outlined-income-native-simple">
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
            <Typography className={classes.labelStyle}>
              Any other crisp comment/ feedback?
            </Typography>
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