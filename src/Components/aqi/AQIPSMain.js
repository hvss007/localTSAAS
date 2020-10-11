import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Global from '../../assets/globalvaribles/GlobalVariables'
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import aqImpact from "../../assets/icons/aqi/aq_impact.jpg";
import MenuItem from "@material-ui/core/MenuItem";
import delhiZones from "../../assets/jsonfile/DelhiDistrictSubDistrict.json"
import Gallery from 'react-grid-gallery';
import img1 from "../../assets/icons/aqi/form_images/good.jpg";
import img2 from "../../assets/icons/aqi/form_images/satisfactory.jpg";
import img3 from "../../assets/icons/aqi/form_images/moderate.jpg";
import img4 from "../../assets/icons/aqi/form_images/Poor.jpg";
import img5 from "../../assets/icons/aqi/form_images/Very Poor.jpg";
import img6 from "../../assets/icons/aqi/form_images/severe.jpg";
import img7 from "../../assets/icons/aqi/form_images/table_left.png";
import img8 from "../../assets/icons/aqi/form_images/table_right.png";

const IMAGES1 =
[{
        thumbnail: img1,
        thumbnailWidth: 300,
        thumbnailHeight: 212,
        tags: [{value: "Good (0-50)", title: "Good (0-50)"}]
},
{
        thumbnail: img2,
        thumbnailWidth: 300,
        thumbnailHeight: 212,
        tags: [{value: "Satisfactory (51-100)", title: "Satisfactory (51-100)"}]
},
{
        thumbnail: img3,
        thumbnailWidth: 300,
        thumbnailHeight: 212,
        tags: [{value: "Moderate (101-200)", title: "Moderate (101-200)"}]
},
{
        thumbnail: img4,
        thumbnailWidth: 300,
        thumbnailHeight: 212,
        tags: [{value: "Poor (201-300)", title: "Poor (201-300)"}]
},
{
        thumbnail: img5,
        thumbnailWidth: 300,
        thumbnailHeight: 212,
        tags: [{value: "Very Poor (301-400)", title: "Very Poor (301-400)"}]
},

{
        thumbnail: img6,
        thumbnailWidth: 300,
        thumbnailHeight: 212,
        tags: [{value: "Severe (401-500)", title: "Severe (401-500)"}]
}
]
const IMAGES3 =
[{
        thumbnail: img7,
        thumbnailWidth: 160,
        thumbnailHeight: 212,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        thumbnail: img8,
        thumbnailWidth: 100,
        thumbnailHeight: 212,
        caption: "After Rain (Jeshu John - designerspics.com)"
}
]

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
        height: 260
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
        fontSize: "22px"
      },
      "@media (max-width:1024px)": {
        fontSize: "24px"
      },
      fontWeight: "bold"
    },
    paraText: {
        color: "darkblue",
        fontSize: "18px",
        margin: "1vw",
        "@media (max-width:480px)": {
            fontSize: "16px"
          },
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
    
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);


    const url = props.match.url;
    const colURL = url.split("/")[2];
    const surveyID = url.split("/")[3];

    const delhiJson = delhiZones;
    const districts = Object.keys(delhiJson).sort();
    
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
    const [homeTehsil, setHomeTehsil] = React.useState([]);
    const [airPollutionMajorProb, setAirPollutionMajorProblem] = React.useState("");
    const [airPollutionAdverseHealthEffect, setAirPollutionAdverseHealthEffect] = React.useState("");
    const [aqiUnderstanding, setAqiUnderstanding] = React.useState("");
    // const [UnderstandAbove, setUnderstandAbove] = React.useState("");
    const [airQualityLevelBad, setAirQualityLevelBad] = React.useState("");
    const [checkingAirQualityLevel, setCheckingAirQualityLevel] = React.useState("");
    const [fequentlyAirQualityLevel, setFequentlyAirQualityLevel] = React.useState("");
    // Part B
    const [destinationTehsil, setDestinationTehsil] = React.useState([]);
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
    const [sensitiveGroupEffect, setSensitiveGroupEffect] = React.useState("");
    const [psychologyEffect, setPsychologyEffect] = React.useState("");
    // Part E
    const [maskAirPollution, setMaskAirPollution] = React.useState("");
    const [airFilter, setAirFilter] = React.useState("");
    const [missSchool, setMissSchool] = React.useState("");
    // const [closeWindow, setCloseWindow] = React.useState("");
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
    
    function handleHomeTehsil(event){
        setHomeTehsil(event.target.value);
    }

    function handleAirPollutionMajorProblem(event){
      setAirPollutionMajorProblem(event.target.value);
    }
    function handleAirPollutionAdverseHealthEffect(event){
      setAirPollutionAdverseHealthEffect(event.target.value);
    }
    function handleAqiUnderstanding(event){
      setAqiUnderstanding(event.target.value);
    }
    // function handleUnderstandAbove(event){
    //   setUnderstandAbove(event.target.value);
    // }
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
    function handleDestinationTehsil(event){
        setDestinationTehsil(event.target.value);
    }

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
    const handleHealthEffect = name => event => {
        if (healthEffect === "") {
            setHealthEffect(name);
        } else {
            setHealthEffect(healthEffect.concat("&").concat(name));
        }
    }
    function handleFamilyHealthEffect(event) {
        setFamilyHealthEffect(event.target.value);
    }
    const handleTravelHealthEffect = name => event => {
        if(travelHealthEffect === ""){
            setTravelHealthEffect(name);
        } else {
            setTravelHealthEffect(travelHealthEffect.concat("&").concat(name));
        }
    }
    const handleSensitiveGroupEffect = name => event => {
        if(sensitiveGroupEffect === ""){
            setSensitiveGroupEffect(name);
        } else {
            setSensitiveGroupEffect(sensitiveGroupEffect.concat("&").concat(name));
        }
    }
    const handlePsychologyEffect = name => event => {
        if (psychologyEffect === "") {
            setPsychologyEffect(name);
        } else  {
            setPsychologyEffect(psychologyEffect.concat("&").concat(name));
        }
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
    // function handleCloseWindow(event) {
    //     setCloseWindow(event.target.value)
    // }
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
            homeTehsil: homeTehsil,
            airPollutionMajorProb: airPollutionMajorProb,
            airPollutionAdverseHealthEffect: airPollutionAdverseHealthEffect,
            aqiUnderstanding: aqiUnderstanding,
            // UnderstandAbove: UnderstandAbove,
            airQualityLevelBad: airQualityLevelBad,
            checkingAirQualityLevel: checkingAirQualityLevel,
            fequentlyAirQualityLevel: fequentlyAirQualityLevel,
            // Part B
            destinationTehsil: destinationTehsil,
            tripsPerDay: tripsPerDay,
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
            sensitiveGroupEffect: sensitiveGroupEffect,
            psychologyEffect: psychologyEffect,
            // Part E
            maskAirPollution: maskAirPollution,
            airFilter: airFilter,
            missSchool: missSchool,
            // closeWindow: closeWindow,
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
                          Please select the District and Tehsil of your residence.
                    </Typography>
                      {/* <FormControl component="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-homeDistrict">
                              District
                         </InputLabel>
                          <Select
                            //   native
                              value={homeDistrict}
                                onChange={handleHomeDistrict}
                              input={
                                  <OutlinedInput
                                      name="homeDistrict"
                                      labelWidth={labelWidth}
                                      id="outlined-homeDistrict"
                                  />
                              }
                          >
                              {districts.map((item, i) => (
                                  <MenuItem key={i} value={item}>
                                      {item}
                                  </MenuItem>
                              ))}
                        </Select>
                      </FormControl>
                  </div>
                  <div className={classes.divStyle}> */}
                      <FormControl component="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-homeTehsil">
                              Tehsil (Sub-division)
                         </InputLabel>
                          <Select
                              native
                              value={homeTehsil}
                                onChange={handleHomeTehsil}
                              input={
                                  <OutlinedInput
                                      name="homeTehsil"
                                      labelWidth={labelWidth}
                                      id="outlined-homeTehsil"
                                  />
                              }
                          >
                              <option value="" />
                              {districts.map((item, i) => (
                                  <optgroup label={item}>
                                      {Object.values(delhiZones[item]).map((item2, i) => (
                                       <option value={item2}> {item2} </option>   
                                      ) )}
                                  </optgroup>
                              ))}
                        </Select>
                      </FormControl>
                      <hr />
                  </div>


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

                  <Typography  className={classes.paraText}><span>
                  </span><p> Here is an example to distinguish the Air Quality Index (AQI). The AQI value is specified by the Central Pollution Control Board, Delhi.</p>
                  </Typography >
                  <div style={{marginLeft: "auto", marginRight: "auto", width: "80%", justifyContent: "center"}}>
                  <Gallery enableImageSelection={false} margin={0} enableLightbox={false} images={IMAGES1}/>
                  </div>
                  <div style={{marginLeft: "auto", marginRight: "auto", width: "39%", justifyContent: "center", "@media (max-width:480px)": {marginLeft: "auto", marginRight: "auto", width: "130%", justifyContent: "center"}}}>
                  <Gallery enableImageSelection={false} margin={0} enableLightbox={false} images={IMAGES3}/>
                  </div>


                  {/*  TODO add AQI related images here. */}

                   <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          According to you from which Air Quality Index (AQI) or level you feel considered bad?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-airQualityLevelBad">
                               AQI perception
                               </InputLabel>
                         <Select
                            //   native
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
                              {/* <MenuItem value="" /> */}
                              <MenuItem value="good">Good (0 - 50)</MenuItem>
                              <MenuItem value="Satisfactory">Satisfactory (51 - 100)</MenuItem>
                              <MenuItem value="Moderate">Moderate (101 - 200)</MenuItem>
                              <MenuItem value="Poor">Poor (201 - 300)</MenuItem>
                              <MenuItem value="VeryPoor">Very poor (301 - 400)</MenuItem>
                              <MenuItem value="Severe">Severe (401 - 500)</MenuItem>
                              <MenuItem value="IDontLookAQI">I don't look at Air Quality Index (AQI) or level</MenuItem>
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
                            //   native
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
                              {/* <MenuItem value="" /> */}
                              <MenuItem value="websiet">Website</MenuItem>
                              <MenuItem value="mobileApp">Mobile App</MenuItem>
                              <MenuItem value="newspaper">Newspaper</MenuItem>
                              <MenuItem value="radio">Radio (FM)</MenuItem>
                              <MenuItem value="other">Other</MenuItem>
                              <MenuItem value="IDontCheckAQI">I don't check at Air Quality Index (AQI) or level</MenuItem>
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
                              // native
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
                                {/* <MenuItem value="" /> */}
                              <MenuItem value="daily">Daily</MenuItem>
                              <MenuItem value="2_4PerWeek">2 - 4 times per week</MenuItem>
                              <MenuItem value="OnceAWeek">Once a week</MenuItem>
                              <MenuItem value="OnceAMonth">Once a month</MenuItem>
                              <MenuItem value="IDontLookAQI">I don't look at Air Quality Index / level</MenuItem>
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="below2">up to 2</MenuItem>
                              <MenuItem value="3_4">3 - 4</MenuItem>
                              <MenuItem value="5orMorethan">5 or more</MenuItem>
                              <MenuItem value="IdontTravel">I do not travel</MenuItem>
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="school_primary">School - (Primary trip)</MenuItem>
                              <MenuItem value="College_University">College/ University - (Primary trip)</MenuItem>
                              <MenuItem value="office">Office/ work – (Primary trip)</MenuItem>
                              <MenuItem value="front_line">Frontline worker (health, Police) – (Primary trip)</MenuItem>
                              <MenuItem value="retailer">Retailer - (Secondary trip)</MenuItem>
                              <MenuItem value="shopping">Shopping - (Secondary trip)</MenuItem>
                              <MenuItem value="super_market">Super-markert - (Secondary trip)</MenuItem>
                              <MenuItem value="gym">Gym / sports - (Secondary trip)</MenuItem>
                              <MenuItem value="leisure">Leisure - (Secondary trip)</MenuItem>
                              <MenuItem value="other">other</MenuItem>
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="Car">Car</MenuItem>
                              <MenuItem value="CarSharing">Car Sharing (OLA, Uber, taxi, other)</MenuItem>
                              <MenuItem value="Bus">Bus</MenuItem>
                              <MenuItem value="Metro">Metro</MenuItem>
                              <MenuItem value="TwoWheeler">Two Wheeler (2-W)</MenuItem>
                              <MenuItem value="MotorBikeSharing">Motorbike/ scooter Sharing</MenuItem>
                              <MenuItem value="AutoRickshaw">Auto-Rickshaws (3-W)</MenuItem>
                              <MenuItem value="Bicycle">Bicycle</MenuItem>
                              <MenuItem value="Walk">Walk</MenuItem>

                          </Select>
                      </FormControl>
                      <hr />
                  </div>

                  <div className={classes.divStyle}>
                      <Typography className={classes.labelStyle}>
                          Please select the District and Tehsil of your primary trip (most usual destination)
                    </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                          <InputLabel ref={inputLabel} htmlFor="outlined-destinationTehsil">
                              Tehsil (Sub-division)
                         </InputLabel>
                          <Select
                              native
                              value={destinationTehsil}
                                onChange={handleDestinationTehsil}
                              input={
                                  <OutlinedInput
                                      name="destinationTehsil"
                                      labelWidth={labelWidth}
                                      id="outlined-destinationTehsil"
                                  />
                              }
                          >
                              <option value="" />
                              {districts.map((item, i) => (
                                  <optgroup label={item}>
                                      {Object.values(delhiZones[item]).map((item2, i) => (
                                       <option value={item2}> {item2} </option>   
                                      ) )}
                                  </optgroup>
                              ))}
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="Car">Car</MenuItem>
                              <MenuItem value="CarSharing">Car Sharing (OLA, Uber, taxi, Zoom, other rental)</MenuItem>
                              <MenuItem value="Bus">Bus</MenuItem>
                              <MenuItem value="Metro">Metro</MenuItem>
                              <MenuItem value="TwoWheeler">Two Wheeler (2-W)</MenuItem>
                              <MenuItem value="MotorBikeSharing">Motorbike/ scooter Sharing (or rental)</MenuItem>
                              <MenuItem value="AutoRickshaw">Auto-Rickshaws (3-W)</MenuItem>
                              <MenuItem value="Bicycle">Bicycle</MenuItem>
                              <MenuItem value="Walk">Walk</MenuItem>

                          </Select>
                      </FormControl>
                      <hr />
                  </div>
                   <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          At which Air Quality Index (AQI) or level, would you avoid traveling?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-avoidTrip">
                              Avoid traveling
                         </InputLabel>
                         <Select
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="good">Good (0 - 50)</MenuItem>
                              <MenuItem value="Satisfactory">Satisfactory (51 - 100)</MenuItem>
                              <MenuItem value="Moderate">Moderate (101 - 200)</MenuItem>
                              <MenuItem value="Poor">Poor (201 - 300)</MenuItem>
                              <MenuItem value="VeryPoor">Very poor (301 - 400)</MenuItem>
                              <MenuItem value="Severe">Severe (401 - 500)</MenuItem>
                              <MenuItem value="NotTravelingAtAll">Not traveling at all</MenuItem>
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="ChangeOfTravelTime">Change of travel time</MenuItem>
                              <MenuItem value="ChangeOfTravelMode">Change of travel mode</MenuItem>
                              <MenuItem value="ChangeOfTravelRoute">Change of travel route</MenuItem>
                              <MenuItem value="NotTravelingAtAll">Not traveling at all</MenuItem>
                              <MenuItem value="NoEffect">No effect</MenuItem>
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
                          Due to air pollution, have you ever changed your leisure/ social/ sports activities?
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
                          label="Air Quality Index (AQI) or level only"
                      />
                      <FormControlLabel
                          value="RelatedToTravelModeInformation"
                          control={<Radio color="primary" />}
                          label="Air pollution exposure for each travel mode"
                      />
                      <FormControlLabel
                          value="RelatedToTravelTimeInformation"
                          control={<Radio color="primary" />}
                          label="Travel time and air pollution exposure on various routes and travel modes"
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
                          Do you prefer to work from home when Air Quality is poor?
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
                          How would you rate air quality close to your residence/ home?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-perceiveAQIHome">
                              AQI at residence
                         </InputLabel>
                         <Select
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="good">Good (0 - 50)</MenuItem>
                              <MenuItem value="Satisfactory">Satisfactory (51 - 100)</MenuItem>
                              <MenuItem value="Moderate">Moderate (101 - 200)</MenuItem>
                              <MenuItem value="Poor">Poor (201 - 300)</MenuItem>
                              <MenuItem value="VeryPoor">Very poor (301 - 400)</MenuItem>
                              <MenuItem value="Severe">Severe (401 - 500)</MenuItem>
                        </Select>
                      </FormControl>
                      <hr />
                  </div>
                  <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                   How would you rate air quality close to your office/ workplace/ school/ college?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-perceiveAQIWork">
                              AQI at workplace or school
                         </InputLabel>
                         <Select
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="good">Good (0 - 50)</MenuItem>
                              <MenuItem value="Satisfactory">Satisfactory (51 - 100)</MenuItem>
                              <MenuItem value="Moderate">Moderate (101 - 200)</MenuItem>
                              <MenuItem value="Poor">Poor (201 - 300)</MenuItem>
                              <MenuItem value="VeryPoor">Very poor (301 - 400)</MenuItem>
                              <MenuItem value="Severe">Severe (401 - 500)</MenuItem>
                          </Select>
                      </FormControl>
                      <hr />
                  </div>
                  <div className={classes.divStyle}>
                      <Typography className={classes.labelStyle}>
                      How air pollution is affecting you? Please select all applicable.
                      </Typography>


                      <FormControl component="fieldset" className={classes.formControl}>


                      <div className={classes.checkboxes}>
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.BreathlessnessHavingMoreDifficultyInBreathing}
                                      onChange={handleHealthEffect("BreathlessnessHavingMoreDifficultyInBreathing")}
                                      value="BreathlessnessHavingMoreDifficultyInBreathing"
                                      color="primary"
                                  />
                              }
                              label="Breathlessness/ difficulty in breathing"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.DoingLessOutdoorActivities}
                                      onChange={handleHealthEffect("DoingLessOutdoorActivities")}
                                      value="DoingLessOutdoorActivities"
                                      color="primary"
                                  />
                              }
                              label="Doing less outdoor activities"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.DoingMoreToLookAfterMySkin}
                                      onChange={handleHealthEffect("DoingMoreToLookAfterMySkin")}
                                      value="DoingMoreToLookAfterMySkin"
                                      color="primary"
                                  />
                              }
                              label="Doing more to look after my skin"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.DoingMoreToStayHealthy}
                                      onChange={handleHealthEffect("DoingMoreToStayHealthy")}
                                      value="DoingMoreToStayHealthy"
                                      color="primary"
                                  />
                              }
                              label="Doing more to stay healthy"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.irritationToEyes}
                                      onChange={handleHealthEffect("irritationToEyes")}
                                      value="irritationToEyes"
                                      color="primary"
                                  />
                              }
                              label="Irritation to eyes/ nose/ throat"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.SkinProblems}
                                      onChange={handleHealthEffect("SkinProblems")}
                                      value="SkinProblems"
                                      color="primary"
                                  />
                              }
                              label="Skin problems"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.BodyAllergies}
                                      onChange={handleHealthEffect("BodyAllergies")}
                                      value="BodyAllergies"
                                      color="primary"
                                  />
                              }
                              label="Body allergies"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.WantingToMoveToOtherLessPollutedPlaces}
                                      onChange={handleHealthEffect("WantingToMoveToOtherLessPollutedPlaces")}
                                      value="WantingToMoveToOtherLessPollutedPlaces"
                                      color="primary"
                                  />
                              }
                              label="Wanting to move to other less polluted places"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.AsthmaIncidences}
                                      onChange={handleHealthEffect("AsthmaIncidences")}
                                      value="AsthmaIncidences"
                                      color="primary"
                                  />
                              }
                              label="Asthma incidences"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.PoorVisibility}
                                      onChange={handleHealthEffect("PoorVisibility")}
                                      value="PoorVisibility"
                                      color="primary"
                                  />
                              }
                              label="Poor visibility"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.WorryingAboutTheLivingEnvironmentForChildren}
                                      onChange={handleHealthEffect("WorryingAboutTheLivingEnvironmentForChildren")}
                                      value="WorryingAboutTheLivingEnvironmentForChildren"
                                      color="primary"
                                  />
                              }
                              label="Worrying about the living environment for children"
                          />
                           <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={healthEffect.NotAffectedAtAll}
                                      onChange={handleHealthEffect("NotAffectedAtAll")}
                                      value="NotAffectedAtAll"
                                      color="primary"
                                  />
                              }
                              label="Not affected at all"
                          />
                        </div>
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
                          After or during your travel, do you feel any of these? Please select all applicable.
                        </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>


                      <div className={classes.checkboxes}>
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={travelHealthEffect.Sneezing}
                                      onChange={handleTravelHealthEffect("Sneezing")}
                                      value="Sneezing"
                                      color="primary"
                                  />
                              }
                          //     label="Sneezing"
                          // />
                          //  <FormControlLabel
                          //     control={
                          //         <Checkbox
                          //             checked={travelHealthEffect.Sneezing}
                          //             onChange={handleTravelHealthEffect("Sneezing")}
                          //             value="Sneezing"
                          //             color="primary"
                          //         />
                          //     }
                              label="Sneezing"
                          />
                           <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={travelHealthEffect.RunnyNose}
                                      onChange={handleTravelHealthEffect("RunnyNose")}
                                      value="RunnyNose"
                                      color="primary"
                                  />
                              }
                              label="Runny nose"
                          />
                           <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={travelHealthEffect.EyeIrritation}
                                      onChange={handleTravelHealthEffect("EyeIrritation")}
                                      value="EyeIrritation"
                                      color="primary"
                                  />
                              }
                              label="Eye irritation"
                          />
                           <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={travelHealthEffect.ReducedLungFunctioning}
                                      onChange={handleTravelHealthEffect("ReducedLungFunctioning")}
                                      value="ReducedLungFunctioning"
                                      color="primary"
                                  />
                              }
                              label="Reduced lung functioning"
                          />
                           <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={travelHealthEffect.Other}
                                      onChange={handleTravelHealthEffect("Other")}
                                      value="Other"
                                      color="primary"
                                  />
                              }
                              label="Other"
                          />
                             <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={travelHealthEffect.None}
                                      onChange={handleTravelHealthEffect("None")}
                                      value="None"
                                      color="primary"
                                  />
                              }
                              label="None"
                          />
                        </div>
                      </FormControl>
                      <hr />
                  </div>
                  <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          Is any infant/ children/ older persons in your family is getting affected due to air pollution?
                        </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>


                      <div className={classes.checkboxes}>
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={sensitiveGroupEffect.yesInfant}
                                      onChange={handleSensitiveGroupEffect("YesInfact")}
                                      value="YesInfant"
                                      color="primary"
                                  />
                              }
                              label="Yes, infant"
                          />


                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={sensitiveGroupEffect.YesSeniorCitizen}
                                      onChange={handleSensitiveGroupEffect("YesSeniorCitizen")}
                                      value="YesSeniorCitizen"
                                      color="primary"
                                  />
                              }
                              label="Yes, older people"
                          />


                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={sensitiveGroupEffect.None}
                                      onChange={handleSensitiveGroupEffect("None")}
                                      value="None"
                                      color="primary"
                                  />
                              }
                              label="None"
                          />


                        </div>
                      </FormControl>
                      <hr />
                  </div>
                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Do you feel any of the following psychological impact due to air pollution?
              </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>


                      <div className={classes.checkboxes}>
                              <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={psychologyEffect.aggressiveness}
                                      onChange={handlePsychologyEffect("aggressiveness")}
                                      value="aggressiveness"
                                      color="primary"
                                  />
                              }
                              label="Aggressiveness"
                          />
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={psychologyEffect.anxiety}
                                      onChange={handlePsychologyEffect("anxiety")}
                                      value="anxiety"
                                      color="primary"
                                  />
                              }
                              label="Anxiety"
                          />
                            <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={psychologyEffect.stress}
                                      onChange={handlePsychologyEffect("stress")}
                                      value="stress"
                                      color="primary"
                                  />
                              }
                              label="Stress"
                          />
                             <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={psychologyEffect.frustation}
                                      onChange={handlePsychologyEffect("frustation")}
                                      value="frustation"
                                      color="primary"
                                  />
                              }
                              label="Frustation"
                          />
                             <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={psychologyEffect.angry}
                                      onChange={handlePsychologyEffect("angry")}
                                      value="angry"
                                      color="primary"
                                  />
                              }
                              label="Angry"
                          />
                             <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={psychologyEffect.depression}
                                      onChange={handlePsychologyEffect("depression")}
                                      value="depression"
                                      color="primary"
                                  />
                              }
                              label="Depression"
                          />
                             <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={psychologyEffect.None}
                                      onChange={handlePsychologyEffect("None")}
                                      value="None"
                                      color="primary"
                                  />
                              }
                              label="None"
                          />
                          </div>
                      </FormControl>
                      <hr />
                  </div>



                  <Typography className={classes.formHeader}>
                      E:  Prevention/ Self-protective action
            <hr />
                  </Typography >
                  <div className={classes.divStyle}>
                   <Typography className={classes.labelStyle}>
                          Do you use mask to protect yourself from air pollution?
                        </Typography>
                      <FormControl component="outlined" className={classes.formControl}>
                      <InputLabel ref={inputLabel} htmlFor="outlined-maskAirPollution">
                              Use of mask
                         </InputLabel>
                         <Select
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="IUsedMaskBeforeCOVID-19">I used mask before COVID-19</MenuItem>
                              <MenuItem value="IUsedMaskafterCOVID-19">I started using mask since inception of COVID-19</MenuItem>
                              <MenuItem value="IUseMaskBecauseOfAirPollution">I use mask because of air pollution</MenuItem>
                              <MenuItem value="IUseMaskBecauseOfSkin_OtherHealthIssues">I use mask because of skin/other health issues</MenuItem>
                              <MenuItem value="IDontUsedMask">I don't use mask</MenuItem>

                          </Select>
                      </FormControl>
                      <hr />
                  </div>
                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Do you use air-filter/ air-conditioner at home?
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
                                  label="No, no plan to buy"
                              />
                          </RadioGroup>
                      </FormControl>
                      <hr />
                  </div>
                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Do you or your child miss work or school during high pollution days?
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
                  {/* <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                          Do you close the windows of the car during bad air pollution?
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
                              <FormControlLabel
                                  value="noCar"
                                  control={<Radio color="primary" />}
                                  label="I don't have/ use car"
                              />
                          </RadioGroup>
                      </FormControl>
                      <hr />
                  </div> */}
                  <div className={classes.divStyle}>
                  <Typography className={classes.labelStyle}>
                         Due to high air pollution, do you avoid/ skip physical outdoor exercise?
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
                              <FormControlLabel
                                  value="IDontExercise"
                                  control={<Radio color="primary" />}
                                  label="I don't do outdoor exercise"
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
                              // native
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
                                {/* <MenuItem value="" /> */}
                              <MenuItem value="below4">Below 4 years</MenuItem>
                              <MenuItem value="4_18">4 - 18 years</MenuItem>
                              <MenuItem value="18_25">18 - 25 years</MenuItem>
                              <MenuItem value="25_40">25 - 40 years</MenuItem>
                              <MenuItem value="40_60">40 - 60 years</MenuItem>
                              <MenuItem value="above60">Above 60 years</MenuItem>
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="primary">Up to primary school</MenuItem>
                              <MenuItem value="secondary">Up to secondary school</MenuItem>
                              <MenuItem value="senior_secondary">Up to senior secondary school</MenuItem>
                              <MenuItem value="graduation">Graduation</MenuItem>
                              <MenuItem value="post_graduation">Post graduation and higher</MenuItem>
                              <MenuItem value="professionalCourses">Professional courses and other</MenuItem>
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="single">Single</MenuItem>
                              <MenuItem value="married">Married</MenuItem>
                              <MenuItem value="Divorced">Divorced/ Widowed</MenuItem>
                              <MenuItem value="noMention">Prefer not to mention</MenuItem>
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="student">Student</MenuItem>
                              <MenuItem value="business">Business/ self-employed/ consultant</MenuItem>
                              <MenuItem value="govtEmployee">Govt. employee</MenuItem>
                              <MenuItem value="privEmployee">Private employee/ Salaried worker</MenuItem>
                              <MenuItem value="ngo">NGO/ Volunteer</MenuItem>
                              <MenuItem value="retired">Retired</MenuItem>
                              <MenuItem value="jobseeker">Jobseeker</MenuItem>
                              <MenuItem value="driver">Driver (taxi/ auto-rickshaw/ goods vehicle, etc.)</MenuItem>
                              <MenuItem value="housewife">House Wife</MenuItem>
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
                              // native
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
                               {/* <MenuItem value="" /> */}
                              <MenuItem value="<10000">less than 10,000</MenuItem>
                              <MenuItem value="10000-30000">10,000 - 30,000</MenuItem>
                              <MenuItem value="30000-50000">30,000 - 50,000</MenuItem>
                              <MenuItem value="50000-80000">50,000 - 80,000</MenuItem>
                              <MenuItem value="80000-100000">80,000 - 1,00,000</MenuItem>
                              <MenuItem value=">100000">more than 1,00,000</MenuItem>
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
