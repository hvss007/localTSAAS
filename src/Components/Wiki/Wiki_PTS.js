import React, { Component } from "react";
import Backdrop from "../../Hoc/Backdrop/Backdrop1";
import Aux from "../../Hoc/Aux";

import { Link } from 'react-router-dom/cjs/react-router-dom';
import classes from "./Wiki.css";

import PTS1 from "../../assets/screenshots/pts_1.png";
import PTS2 from "../../assets/screenshots/pts_2.png";
import PTS3 from "../../assets/screenshots/pts_3.png";
import PTS4 from "../../assets/screenshots/pts_4.png";
import PTS5 from "../../assets/screenshots/pts_5.png";
import PTS6 from "../../assets/screenshots/pts_6.png";

class Wiki extends Component {
  state = {
    show: false,
    src: null
  };
  onClickHandler = src => {
    this.setState({ show: true, src: src });
  };
  hideModalBackdrop = value => {
    this.setState({ show: value });
  };
  render() {
    return (
      <Aux>
        <Backdrop
          show={this.state.show}
          src={this.state.src}
          hideModalBackdrop={this.hideModalBackdrop}
        ></Backdrop>
        <div className={classes.Wiki}>
          <h4>Aim:</h4>
          <p>
          The aim of this survey is to collect information about the public transport usage and/or satisfaction with given public transport station in a city 
          without asking any personal information (e.g. Name, Phone numbers, etc.) and locations of 
          the users. The purpose of the survey is to understand the travel behaviour and user preferences.
          </p>

          <p>The most common questions asked in Public Transport surveys are about:
            <ul>
            <li>Origin and Destination details (both access and egress)</li>
            <li>Average time taken in each leg of the journey</li>
            <li>Average travel cost</li>
            <li>Trip purpose</li>
            <li>Age of the respondent</li>
            <li>Occupation of the respondents</li>
            <li>Users' preferences</li>
          </ul>
          </p>
    
          <p>
            The collected data will be utilized to:
            <ul>
            <li>Estimate the efficiency of the existing transport services</li>
            <li>Adopt policies/strategies which appeals to the need of the transport users or potential users</li>
            <li>Monitor pre and post implementation effect of initiatives</li>
            </ul>
          </p>

          <p>
            {" "}
            <b>
              <i>TSaaS</i>
            </b>{" "}
            (Traffic Survey as a Service) serves as an inventory of travel information. 
            The state-of-the-art techniques such as pen-paper surveys are not only 
            time and resource-intensive, but prone to various errors. Some of the advanced techniques 
            force users to install the app on their smartphones and continuously track their location 
            throughout the day/week. Since such applications record the personal information and 
            locations precisely, the response rate is very low due to privacy concerns. Therefore, after
            a fair trade-off between the two techniques, TSaaS is developed which is an open-source, 
            web-based revealed preference survey. The survey is designed in a way that it records most of 
            the information required to differentiate the trip profiles and trip patterns in minimum time, 
            however without asking any personal information. The source code is hosted on GitHub as 
            front-end and back-end.
          </p>
      <ul>
          <li>
              Personal information:
          <ul>
                <li>Enter gender, age, educational qualification, profession and monthly income.{" "}<span
                    className={classes.ImageLink}
                    onClick={() => this.onClickHandler(PTS1)}
                    to="/"
                  >
                    See an example.
                  </span></li>
                <li>Enter information about vehicle driving licensing.{" "}</li>
                <li>Enter number of vehicles in the household.{" "}<span
                    className={classes.ImageLink}
                    onClick={() => this.onClickHandler(PTS2)}
                    to="/"
                  >
                    See an example.
                  </span></li>
          </ul>
            </li>
           
          <li>
              Travel information:
          <ul>

              <li>Enter the name of metro station.{" "}</li>
              <li>Select the trip purpose.{" "}
              <span
                    className={classes.ImageLink}
                    onClick={() => this.onClickHandler(PTS3)}
                    to="/"
                  >
                    See an example.
                  </span>
                  </li>
              <li>
               Select origin location from the map. Enter the landmark
               nearest to your origin location.This will show a map with a marker. 
               Drag the marker nearest to your origin location and click 'Ok'.{" "} 
              </li>
              <li>
                Select destination location from the map. Enter the landmark
                nearest to your destination location.This will show a map with a marker. 
                Drag the marker nearest to your destination location and click 'Ok'.{" "}
              </li>
              <li>Enter travel time and travel cost for the whole trip.{" "}<span
                    className={classes.ImageLink}
                    onClick={() => this.onClickHandler(PTS4)}
                    to="/"
                  >
                    See an example.
                  </span></li>
              <li>Check the mode used for accessing and egressing the metro station from the checkbox.{" "}<span
                    className={classes.ImageLink}
                    onClick={() => this.onClickHandler(PTS5)}
                    to="/"
                  >
                    See an example.
                  </span></li>
              <li> Enter the travel frequency.</li>
              <li> Click on submit button.</li>
          </ul>
            </li>
          <li>
          Rating page
          <ul>
            <li>Rate various attributes on the page.{" "}<span
                    className={classes.ImageLink}
                    onClick={() => this.onClickHandler(PTS6)}
                    to="/"
                  >
                    See an example.
                  </span></li>
          </ul>
          </li>
            
        </ul>

          <h4> Privacy Policy:</h4>
          <p>
            The details of our privacy policy is available{" "}
            <Link to="/privacypolicy">
              here
            </Link>
            .
          </p>
          <h4>Team Members:</h4>
          <ul>
            <li>
            <b>Front-end:</b> Siddharth Varshney
            </li>
            <li><b>Back-end:</b> Ishan Rai</li>
            <li><b>Design:</b> Piyush Anand</li>
            <li><b>Mentor / Supervisor:</b> Dr. Amit Agarwal{" "}</li>
          </ul>
          {/* <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
                <Toolbar  drawerToggleClicked={this.SideDrawerToggleHandler}></Toolbar> */}
        </div>
      </Aux>
    );
  }
}

export default Wiki;
