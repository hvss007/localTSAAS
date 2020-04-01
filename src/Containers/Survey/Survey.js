import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Members from "../../Components/Members/Members";
import Trips from "../Trips/Trips";
import StartSurvey from "../../Components/StartSuvey/StartSurvey";
import ParentHome from "../../Components/ParentHome/ParentHome";
import Family from "../../Components/Family/Family";
import PrivacyPolicy from "../../Components/PrivacyPolicy/PrivacyPolicy";
import ContactUs from "../../Components/ContactUs/ContactUs";
import FinishSurvey from "../../Components/FinishSurvey/FinishSurvey";
import Wiki from "../../Components/Wiki/Wiki";
import RAHome from "../../Components/roadAccidents/AccidentsHome";
import IsochroneMap from '../../Components/Isochrones/IsochroneMaps';
// import PersonalInformation from "../../Components/PTSurvey/PersonalInformation/PersonalInformation";
// import TravelInformation from "../../Components/PTSurvey/TravelInformation/TravelInformation";
import PTHome from "../../Components/PTSurvey/PThm";
import RatingForm from "../../Components/PTSurvey/RatingForm/RatingForm";
import PublicTransportForm from "../../Components/PTSurvey/MainForm/PublicTransportForm";

class Survey extends Component {
  render() {
    return (
      <div>
        {/* <Members 
        // changedMems={this.inputChangeHandler} 
        // membInfo={this.state.member}
        >
        </Members> */}
        {/* <Trips>\
        </Trips> */}
        <Switch>
          
          {/* home */}
          <Route path="/" exact component={ParentHome} />
          
          {/* Road accident */}
          <Route path="/rdac" exact component={RAHome} />
          
          {/* pt survey */}
          <Route path="/pts" exact component={PTHome} />
          <Route path="/pts/:id" exact component={PTHome} />
          <Route path="/pts/:id/:id/pts-main" exact component={PublicTransportForm} />
          {/* <Route
            path="/pts/:id/:id/personal-info"
            exact
            component={PersonalInformation}
          /> */}
          {/* <Route
            path="/pts/:id/:id/person:id/travel-info"
            exact
            component={TravelInformation}
          /> */}
          <Route
            path="/pts/:id/:id/pts-main/:id/rating-form"
            exact
            component={RatingForm}
          />
          {/* fixed pages */}
          <Route path="/finishsurvey" exact component={FinishSurvey} />
          <Route path="/privacypolicy" exact component={PrivacyPolicy} />
          <Route path="/contact" exact component={ContactUs} />
          <Route path="/wiki" exact component={Wiki} />
          <Route path="/isochrones" exact component={IsochroneMap}/>
          {/* household survey */}
          <Route path="/hhs" exact component={StartSurvey} />
          <Route path="/hhs/:id" exact component={StartSurvey} />
          <Route path="/hhs/:id/:id/family" exact component={Family}></Route>
          <Route
            path="/hhs/:id/:id/family:id/member"
            exact
            component={Members}
          />
          <Route
            path="/hhs/:id/:id/family:id/member:id1/trip-info"
            exact
            component={Trips}
          />
        </Switch>
      </div>
    );
  }
}
export default Survey;
