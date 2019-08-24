import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RatingStars from "./../../RatingStars/RatingStars";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 30),
    backgroundColor: "#f3e5f5",
    "@media (max-width:1024px)": {
      margin: theme.spacing(2, 2)
    }
  }
}));

export default function RatingForm() {
  const classes = useStyles();
  return (
    <div>
      <Card raised className={classes.root}>
        <Typography variant="h4" align="center">
          Accessibility Ratings:
        </Typography>
        <RatingStars ratingQuestion="Convenience and ease tp acces the interchange" />
        <RatingStars ratingQuestion="Availability of tix Pick and drop places fro different modes" />
        <RatingStars ratingQuestion="Presence of sequence entry and exit points for arrival and departure passengers" />
        <Typography variant="h4" align="center">
          Way finding and travel Information Rating:
        </Typography>
        <RatingStars ratingQuestion="Availability of Information Signs of Different tranport services, facilities and tranfers" />
        <RatingStars ratingQuestion="Clarity in Understanding of Informatory Signs" />
        <RatingStars ratingQuestion="Availability of time table and travel information related to different modes" />
        <RatingStars ratingQuestion="Presence of information screens fro time table and travel information in required language" />
        <RatingStars ratingQuestion="Accuracy and Reliability among different modes" />
        <RatingStars ratingQuestion="Schedule coordination among different modes" />
        <RatingStars ratingQuestion="Frequency of the modes within the city(intra-city)" />
        <RatingStars ratingQuestion="Frequency of the modes outside the city(inter-city)" />
        <Typography variant="h4" align="center">
          Transfer and Movement Ratings:
        </Typography>
        <RatingStars ratingQuestion="Satisfaction related to Transfer distance between differet modes" />
        <RatingStars ratingQuestion="Presence of number of escalators, walkways and lifts" />
        <RatingStars ratingQuestion="Presence of facilities for people with disablities" />
        <RatingStars ratingQuestion="Presence of facilities for people with luggage" />
        <RatingStars ratingQuestion="Satisfaction related to the distance between the parking area and modes" />
        <RatingStars ratingQuestion="Availability of spaces for parking of vehicles" />
        <RatingStars ratingQuestion="Availability of enquery countries" />
        <RatingStars ratingQuestion="Presence of enquiry counters" />
        <RatingStars ratingQuestion="Satisfaction related to time used in queuing and security check" />
        <RatingStars ratingQuestion="Satisfaction from Behaviour and Assistance by the staff" />
        <Typography variant="h4" align="center">
          Comfort and Convenience Rating:
        </Typography>
        <RatingStars ratingQuestion="Availability of Facilities like different varieties of shops, waiting areas, restaurants, toilets, protection from weather, ATMs, etc" />
        <RatingStars ratingQuestion="Availability of total number of seats inside the modes nad waiting areas" />
        <RatingStars ratingQuestion="Availability of Wi-Fi, Mobile and Internet signals" />
        <RatingStars ratingQuestion="Availability of total number of charginh=g points inside the modes and waiting areas" />
        <RatingStars ratingQuestion="Facilities/Cars rooms provided for infants, children nad pregnant women" />
        <RatingStars ratingQuestion="Facilities for elderly people" />
        <RatingStars ratingQuestion="Noise level" />
        <RatingStars ratingQuestion="Air Quality" />
        <RatingStars ratingQuestion="Presence of amount of daughter(seperate for wet and dry water)" />
        <RatingStars ratingQuestion="Overall Cleanliness" />
        <Typography variant="h4" align="center">
          Safety and Security Rating:
        </Typography>
        <RatingStars ratingQuestion="Safety and Security in the waiting areas inside transport modes" />
        <RatingStars ratingQuestion="Safety and Security in transfer areas" />
        <RatingStars ratingQuestion="Safety and Security while getting on and off transport" />
        <RatingStars ratingQuestion="Availability of CCTVs cameras and security guards" />
        <hr />

        <RatingStars ratingQuestion="Overall Rating of Anand Vihar as a Multimodal Transport Hub out of 5" />
        <RatingStars ratingQuestion="Rating of Overall Development around Anand Vihar to Multimodal Hub" />
      </Card>
    </div>
  );
}
