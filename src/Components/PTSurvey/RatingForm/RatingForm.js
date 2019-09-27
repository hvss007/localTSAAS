import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RatingStars from "./../../RatingStars/RatingStars";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import HostName from "./../../../assets/globalvaribles/GlobalVariables";
import Button from "@material-ui/core/Button";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 30),
    backgroundColor: "#f3e5f5",
    "@media (max-width:1024px)": {
      margin: theme.spacing(2, 2),
      justifyContent: "center"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240
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
  button: {
    justifyContent: "center",
    margin: "0 40% 2vh 45%",
    textAlign: "center"
  },
  inputField: {
    justifyContent: "center",
    textAlign: "center"
  }
}));

export default function RatingForm(props) {
  const classes = useStyles();

  const [metro, setMetro] = React.useState("");

  const [racc1, setRacc1] = React.useState(0);
  const [racc2, setRacc2] = React.useState(0);
  const [racc3, setRacc3] = React.useState(0);

  const [rtrav1, setRtrav1] = React.useState(0);
  const [rtrav2, setRtrav2] = React.useState(0);
  const [rtrav3, setRtrav3] = React.useState(0);
  const [rtrav4, setRtrav4] = React.useState(0);
  const [rtrav5, setRtrav5] = React.useState(0);
  const [rtrav6, setRtrav6] = React.useState(0);
  const [rtrav7, setRtrav7] = React.useState(0);
  const [rtrav8, setRtrav8] = React.useState(0);

  const [rmov1, setRmov1] = React.useState(0);
  const [rmov2, setRmov2] = React.useState(0);
  const [rmov3, setRmov3] = React.useState(0);
  const [rmov4, setRmov4] = React.useState(0);
  const [rmov5, setRmov5] = React.useState(0);
  const [rmov6, setRmov6] = React.useState(0);
  const [rmov7, setRmov7] = React.useState(0);
  const [rmov8, setRmov8] = React.useState(0);
  const [rmov9, setRmov9] = React.useState(0);
  const [rmov10, setRmov10] = React.useState(0);

  const [rcom1, setRcom1] = React.useState(0);
  const [rcom2, setRcom2] = React.useState(0);
  const [rcom3, setRcom3] = React.useState(0);
  const [rcom4, setRcom4] = React.useState(0);
  const [rcom5, setRcom5] = React.useState(0);
  const [rcom6, setRcom6] = React.useState(0);
  const [rcom7, setRcom7] = React.useState(0);
  const [rcom8, setRcom8] = React.useState(0);
  const [rcom9, setRcom9] = React.useState(0);
  const [rcom10, setRcom10] = React.useState(0);

  const [rsec1, setRsec1] = React.useState(0);
  const [rsec2, setRsec2] = React.useState(0);
  const [rsec3, setRsec3] = React.useState(0);
  const [rsec4, setRsec4] = React.useState(0);

  const [rover1, setRover1] = React.useState(0);
  const [rover2, setRover2] = React.useState(0);

  const pId = props.match.url.split("/")[5];

  function handleMetro(event) {
    setMetro(event.target.value);
  }

  function handleSubmit() {
    const data = {
      personID: pId,
      metro: metro,
      racc1: racc1,
      racc2: racc2,
      racc3: racc3,

      rtrav1: rtrav1,
      rtrav2: rtrav2,
      rtrav3: rtrav3,
      rtrav4: rtrav4,
      rtrav5: rtrav5,
      rtrav6: rtrav6,
      rtrav7: rtrav7,
      rtrav8: rtrav8,

      rmov1: rmov1,
      rmov2: rmov2,
      rmov3: rmov3,
      rmov4: rmov4,
      rmov5: rmov5,
      rmov6: rmov6,
      rmov7: rmov7,
      rmov8: rmov8,
      rmov9: rmov9,
      rmov10: rmov10,

      rcom1: rcom1,
      rcom2: rcom3,
      rcom3: rcom2,
      rcom4: rcom4,
      rcom5: rcom5,
      rcom6: rcom6,
      rcom7: rcom7,
      rcom8: rcom8,
      rcom9: rcom9,
      rcom10: rcom10,

      rsec1: rsec1,
      rsec2: rsec2,
      rsec3: rsec3,
      rsec4: rsec4,

      rover1: rover1,
      rover2: rover2
    };

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    axios.post(HostName + "ptSurveyRating/", data).then(Response => {
      props.history.push({
        pathname: "/finishsurvey"
      });
      var time = new Date().toLocaleTimeString();
      const url = props.match.url;
      const survId = url.split("/")[3];

      axios.patch(HostName + "responseTime/" + survId, {
        surveyEndTime: time
      });
    });
  }
  return (
    <div>
      <Card raised className={classes.root}>
        <div className={classes.inputField}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.labelStyle}>
              Metro station
            </FormLabel>
            <TextField
              required
              id="outlined-required"
              label="Metro"
              margin="normal"
              variant="outlined"
              value={metro}
              onChange={handleMetro}
            />
          </FormControl>

          <hr />
        </div>

        <Typography variant="h4" align="center">
          Accessibility Ratings:
        </Typography>
        <RatingStars
          name="control-racc1"
          ratingQuestion="Convenience and ease to acces the interchange?"
          value={racc1}
          onChange={event => {
            setRacc1(event.target.value);
          }}
        />
        <RatingStars
          name="control-racc2"
          ratingQuestion="Availability of fix Pick and drop places for different modes?"
          value={racc2}
          onChange={event => {
            setRacc2(event.target.value);
          }}
        />
        <RatingStars
          name="control-racc3"
          ratingQuestion="Presence of sequence entry and exit points for arrival and departure passengers?"
          value={racc3}
          onChange={event => {
            setRacc3(event.target.value);
          }}
        />
        <Typography variant="h4" align="center">
          Way finding and travel Information Rating:
        </Typography>
        <RatingStars
          name="control-rtrav1"
          ratingQuestion="Availability of information Signs of different tranport services, facilities and tranfers?"
          value={rtrav1}
          onChange={event => {
            setRtrav1(event.target.value);
          }}
        />
        <RatingStars
          name="control-rtrav2"
          ratingQuestion="Clarity in understanding of informatory signs?"
          value={rtrav2}
          onChange={event => {
            setRtrav2(event.target.value);
          }}
        />
        <RatingStars
          name="control-rtrav3"
          ratingQuestion="Availability of time table and travel information related to different modes?"
          value={rtrav3}
          onChange={event => {
            setRtrav3(event.target.value);
          }}
        />
        <RatingStars
          name="control-rtrav4"
          ratingQuestion="Presence of information screens fro time table and travel information in required language?"
          value={rtrav4}
          onChange={event => {
            setRtrav4(event.target.value);
          }}
        />
        <RatingStars
          name="control-rtrav5"
          ratingQuestion="Accuracy and reliability among different modes?"
          value={rtrav5}
          onChange={event => {
            setRtrav5(event.target.value);
          }}
        />
        <RatingStars
          name="control-rtrav6"
          ratingQuestion="Schedule coordination among different modes?"
          value={rtrav6}
          onChange={event => {
            setRtrav6(event.target.value);
          }}
        />
        <RatingStars
          name="control-rtrav7"
          ratingQuestion="Frequency of the modes within the city (intra-city)?"
          value={rtrav7}
          onChange={event => {
            setRtrav7(event.target.value);
          }}
        />
        <RatingStars
          name="control-rtrav8"
          ratingQuestion="Frequency of the modes outside the city (inter-city)?"
          value={rtrav8}
          onChange={event => {
            setRtrav8(event.target.value);
          }}
        />
        <Typography variant="h4" align="center">
          Transfer and Movement Ratings:
        </Typography>
        <RatingStars
          name="control-rmov1"
          ratingQuestion="Satisfaction related to transfer distance between differet modes?"
          value={rmov1}
          onChange={event => {
            setRmov1(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov2"
          ratingQuestion="Presence of number of escalators, walkways and lifts?"
          value={rmov2}
          onChange={event => {
            setRmov2(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov3"
          ratingQuestion="Presence of facilities for people with disablities?"
          value={rmov3}
          onChange={event => {
            setRmov3(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov4"
          ratingQuestion="Presence of facilities for people with luggage?"
          value={rmov4}
          onChange={event => {
            setRmov4(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov5"
          ratingQuestion="Satisfaction related to the distance between the parking area and modes?"
          value={rmov5}
          onChange={event => {
            setRmov5(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov6"
          ratingQuestion="Availability of spaces for parking of vehicles?"
          value={rmov6}
          onChange={event => {
            setRmov6(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov7"
          ratingQuestion="Availability of enquery countries?"
          value={rmov7}
          onChange={event => {
            setRmov7(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov8"
          ratingQuestion="Presence of enquiry counters?"
          value={rmov8}
          onChange={event => {
            setRmov8(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov9"
          ratingQuestion="Satisfaction related to time used in queuing and security check?"
          value={rmov9}
          onChange={event => {
            setRmov9(event.target.value);
          }}
        />
        <RatingStars
          name="control-rmov10"
          ratingQuestion="Satisfaction from Behaviour and Assistance by the staff?"
          value={rmov10}
          onChange={event => {
            setRmov10(event.target.value);
          }}
        />
        <Typography variant="h4" align="center">
          Comfort and Convenience Rating:
        </Typography>
        <RatingStars
          name="control-rcom1"
          ratingQuestion="Availability of facilities like different varieties of shops, waiting areas, restaurants, toilets, protection from weather, ATMs, etc?"
          value={rcom1}
          onChange={event => {
            setRcom1(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom2"
          ratingQuestion="Availability of total number of seats inside the travel modes nad waiting areas?"
          value={rcom2}
          onChange={event => {
            setRcom2(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom3"
          ratingQuestion="Availability of Wi-Fi, mobilephone and internet signals?"
          value={rcom3}
          onChange={event => {
            setRcom3(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom4"
          ratingQuestion="Availability of total number of charging points inside the travel modes and waiting areas?"
          value={rcom4}
          onChange={event => {
            setRcom4(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom5"
          ratingQuestion="Facilities provided for infants, children nad pregnant women?"
          value={rcom5}
          onChange={event => {
            setRcom5(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom6"
          ratingQuestion="Facilities for elderly people?"
          value={rcom6}
          onChange={event => {
            setRcom6(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom7"
          ratingQuestion="Noise level?"
          value={rcom7}
          onChange={event => {
            setRcom7(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom8"
          ratingQuestion="Air quality?"
          value={rcom8}
          onChange={event => {
            setRcom8(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom9"
          ratingQuestion="Presence of amount of dustbins (seperate for wet and dry waste)?"
          value={rcom9}
          onChange={event => {
            setRcom9(event.target.value);
          }}
        />
        <RatingStars
          name="control-rcom10"
          ratingQuestion="Overall cleanliness?"
          value={rcom10}
          onChange={event => {
            setRcom10(event.target.value);
          }}
        />
        <Typography variant="h4" align="center">
          Safety and Security Rating:
        </Typography>
        <RatingStars
          name="control-rsec1"
          ratingQuestion="Safety and security in the waiting areas inside transport modes?"
          value={rsec1}
          onChange={event => {
            setRsec1(event.target.value);
          }}
        />
        <RatingStars
          name="control-rsec2"
          ratingQuestion="Safety and security in transfer areas?"
          value={rsec2}
          onChange={event => {
            setRsec2(event.target.value);
          }}
        />
        <RatingStars
          name="control-rsec3"
          ratingQuestion="Safety and security while getting on and off transport?"
          value={rsec3}
          onChange={event => {
            setRsec3(event.target.value);
          }}
        />
        <RatingStars
          name="control-rsec4"
          ratingQuestion="Availability of CCTVs cameras and security guards?"
          value={rsec4}
          onChange={event => {
            setRsec4(event.target.value);
          }}
        />
        <hr />

        <RatingStars
          name="control-rover1"
          ratingQuestion={`Overall rating of ${metro} as a multimodal transport hub?`}
          value={rover1}
          onChange={event => {
            setRover1(event.target.value);
          }}
        />
        <RatingStars
          name="control-rover2"
          ratingQuestion={`Rating of overall development around ${metro} to multimodal hub?`}
          value={rover2}
          onChange={event => {
            setRover2(event.target.value);
          }}
        />

        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Finish Survey
        </Button>
      </Card>
    </div>
  );
}
