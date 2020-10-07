
import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Global from '../../assets/globalvaribles/GlobalVariables'
import { makeStyles } from "@material-ui/core/styles";
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
var HostName=Global.hostName
var globalOptional=Global.optional

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
  
    //Personal Info
    const [age, setAge] = React.useState();
    const [gender, setGender] = React.useState("");
    const [qualification, setQualification] = React.useState("");
    const [income, setIncome] = React.useState("");
    const [marStatus, setMaritalStatus] = React.useState("");
    const [profess, setProfession] = React.useState("");
    const [comment, setComment] = React.useState("");
  
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
                  <FormLabel component="legend" className={classes.formHeader}>
                      Air Quality Perception Survey
            <hr />
                  </FormLabel>
                  <div className={classes.paraText}><span>
                  </span><p>You may have noticed that Air Pollution in Delhi is getting worse
                  day by day. We are conducting this survey to determine
                  how air pollution impacts changing the commuter's
                  behavior in terms of air quality, travel cost and travel time.
                This survey will assist the commuters in reducing their air pollution exposure.</p>

                      <br></br>

                      <p>Please answer all questions in Sections A to F.</p>
                  </div>

                  <FormLabel component="legend" className={classes.formHeader}>
                      A:  Information Seeking and Engagement
            <hr />
                  </FormLabel>



                  <FormLabel component="legend" className={classes.formHeader}>
                      B:  Trip Information
            <hr />
                  </FormLabel>



                  <FormLabel component="legend" className={classes.formHeader}>
                      C:  Willingness to Change/ Adapt
            <hr />
                  </FormLabel>



                  <FormLabel component="legend" className={classes.formHeader}>
                      D:  Impact of Air Pollution Exposure
            <hr />
                  </FormLabel>


                  <FormLabel component="legend" className={classes.formHeader}>
                      E:  Prevention/ Self-protective action 
            <hr />
                  </FormLabel>



                  <FormLabel component="legend" className={classes.formHeader}>
                      F: Socioeconomic Characteristics
            <hr />
                  </FormLabel>
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