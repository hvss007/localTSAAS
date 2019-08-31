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
    margin: "0 50% 2vh 50%",
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
      console.log(Response);
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
          name="simple-controlled"
          ratingQuestion="Convenience and ease to acces the interchange"
          value={racc1}
          onChange={() => {
            setRacc1(racc1);
          }}
        />
        <RatingStars
          name="simple-controlled"
          ratingQuestion="Availability of fix Pick and drop places for different modes"
          value={racc2}
          onChange={() => {
            setRacc2(racc2);
          }}
        />
        <RatingStars
          name="simple-controlled"
          ratingQuestion="Presence of sequence entry and exit points for arrival and departure passengers"
          value={racc3}
          onChangeActive={(event, value) => {
            setRacc3(value);
          }}
        />
        <Typography variant="h4" align="center">
          Way finding and travel Information Rating:
        </Typography>
        <RatingStars
          ratingQuestion="Availability of information Signs of different tranport services, facilities and tranfers"
          value={rtrav1}
          onChange={(event, rtrav1) => {
            setRtrav1(rtrav1);
          }}
        />
        <RatingStars
          ratingQuestion="Clarity in understanding of informatory signs"
          value={rtrav2}
          onChange={(event, rtrav2) => {
            setRtrav2(rtrav2);
          }}
        />
        <RatingStars
          ratingQuestion="Availability of time table and travel information related to different modes"
          value={rtrav3}
          onChange={(event, rtrav3) => {
            setRtrav3(rtrav3);
          }}
        />
        <RatingStars
          ratingQuestion="Presence of information screens fro time table and travel information in required language"
          value={rtrav4}
          onChange={(event, rtrav4) => {
            setRtrav4(rtrav4);
          }}
        />
        <RatingStars
          ratingQuestion="Accuracy and reliability among different modes"
          value={rtrav5}
          onChange={(event, rtrav5) => {
            setRtrav5(rtrav5);
          }}
        />
        <RatingStars
          ratingQuestion="Schedule coordination among different modes"
          value={rtrav6}
          onChange={(event, rtrav6) => {
            setRtrav6(rtrav6);
          }}
        />
        <RatingStars
          ratingQuestion="Frequency of the modes within the city (intra-city)"
          value={rtrav7}
          onChange={(event, rtrav7) => {
            setRtrav7(rtrav7);
          }}
        />
        <RatingStars
          ratingQuestion="Frequency of the modes outside the city (inter-city)"
          value={rtrav8}
          onChange={(event, rtrav8) => {
            setRtrav8(rtrav8);
          }}
        />
        <Typography variant="h4" align="center">
          Transfer and Movement Ratings:
        </Typography>
        <RatingStars
          ratingQuestion="Satisfaction related to transfer distance between differet modes"
          value={rmov1}
          onChange={(event, rmov1) => {
            setRmov1(rmov1);
          }}
        />
        <RatingStars
          ratingQuestion="Presence of number of escalators, walkways and lifts"
          value={rmov2}
          onChange={(event, rmov2) => {
            setRmov2(rmov2);
          }}
        />
        <RatingStars
          ratingQuestion="Presence of facilities for people with disablities"
          value={rmov3}
          onChange={(event, rmov3) => {
            setRmov3(rmov3);
          }}
        />
        <RatingStars
          ratingQuestion="Presence of facilities for people with luggage"
          value={rmov4}
          onChange={(event, rmov4) => {
            setRmov4(rmov4);
          }}
        />
        <RatingStars
          ratingQuestion="Satisfaction related to the distance between the parking area and modes"
          value={rmov5}
          onChange={(event, rmov5) => {
            setRmov5(rmov5);
          }}
        />
        <RatingStars
          ratingQuestion="Availability of spaces for parking of vehicles"
          value={rmov6}
          onChange={(event, rmov6) => {
            setRmov6(rmov6);
          }}
        />
        <RatingStars
          ratingQuestion="Availability of enquery countries"
          value={rmov7}
          onChange={(event, rmov7) => {
            setRmov7(rmov7);
          }}
        />
        <RatingStars
          ratingQuestion="Presence of enquiry counters"
          value={rmov8}
          onChange={(event, rmov8) => {
            setRmov8(rmov8);
          }}
        />
        <RatingStars
          ratingQuestion="Satisfaction related to time used in queuing and security check"
          value={rmov9}
          onChange={(event, rmov9) => {
            setRmov9(rmov9);
          }}
        />
        <RatingStars
          ratingQuestion="Satisfaction from Behaviour and Assistance by the staff"
          value={rmov10}
          onChange={(event, rmov10) => {
            setRmov10(rmov10);
          }}
        />
        <Typography variant="h4" align="center">
          Comfort and Convenience Rating:
        </Typography>
        <RatingStars
          ratingQuestion="Availability of facilities like different varieties of shops, waiting areas, restaurants, toilets, protection from weather, ATMs, etc"
          value={rcom1}
          onChange={(event, rcom1) => {
            setRcom1(rcom1);
          }}
        />
        <RatingStars
          ratingQuestion="Availability of total number of seats inside the travel modes nad waiting areas"
          value={rcom1}
          onChange={(event, rcom2) => {
            setRcom2(rcom2);
          }}
        />
        <RatingStars
          ratingQuestion="Availability of Wi-Fi, mobilephone and internet signals"
          value={rcom3}
          onChange={(event, rcom3) => {
            setRcom3(rcom3);
          }}
        />
        <RatingStars
          ratingQuestion="Availability of total number of charging points inside the travel modes and waiting areas"
          value={rcom4}
          onChange={(event, rcom4) => {
            setRcom4(rcom4);
          }}
        />
        <RatingStars
          ratingQuestion="Facilities provided for infants, children nad pregnant women"
          value={rcom5}
          onChange={(event, rcom5) => {
            setRcom5(rcom5);
          }}
        />
        <RatingStars
          ratingQuestion="Facilities for elderly people"
          value={rcom6}
          onChange={(event, rcom6) => {
            setRcom6(rcom6);
          }}
        />
        <RatingStars
          ratingQuestion="Noise level"
          value={rcom7}
          onChange={(event, rcom7) => {
            setRcom7(rcom7);
          }}
        />
        <RatingStars
          ratingQuestion="Air quality"
          value={rcom8}
          onChange={(event, rcom8) => {
            setRcom8(rcom8);
          }}
        />
        <RatingStars
          ratingQuestion="Presence of amount of dustbins (seperate for wet and dry waste)"
          value={rcom9}
          onChange={(event, rcom9) => {
            setRcom9(rcom9);
          }}
        />
        <RatingStars
          ratingQuestion="Overall cleanliness"
          value={rcom10}
          onChange={(event, rcom10) => {
            setRcom10(rcom10);
          }}
        />
        <Typography variant="h4" align="center">
          Safety and Security Rating:
        </Typography>
        <RatingStars
          ratingQuestion="Safety and security in the waiting areas inside transport modes"
          value={rsec1}
          onChange={(event, rsec1) => {
            setRsec1(rsec1);
          }}
        />
        <RatingStars
          ratingQuestion="Safety and security in transfer areas"
          value={rsec2}
          onChange={(event, rsec2) => {
            setRsec2(rsec2);
          }}
        />
        <RatingStars
          ratingQuestion="Safety and security while getting on and off transport"
          value={rsec3}
          onChange={(event, rsec3) => {
            setRsec3(rsec3);
          }}
        />
        <RatingStars
          ratingQuestion="Availability of CCTVs cameras and security guards"
          value={rsec4}
          onChange={(event, rsec4) => {
            setRsec4(rsec4);
          }}
        />
        <hr />

        <RatingStars
          ratingQuestion="Overall rating of Anand Vihar as a multimodal transport hub"
          value={rover1}
          onChange={(event, rover1) => {
            setRover1(rover1);
          }}
        />
        <RatingStars
          ratingQuestion="Rating of overall development around Anand Vihar to multimodal hub"
          value={rover2}
          onChange={(event, rover2) => {
            setRover2(rover2);
          }}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
          size="large"
        >
          Submit
        </Button>
      </Card>
    </div>
  );
}
