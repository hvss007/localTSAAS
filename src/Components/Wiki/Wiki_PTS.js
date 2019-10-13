import React, { Component } from "react";
import Backdrop from "../../Hoc/Backdrop/Backdrop1";
import Aux from "../../Hoc/Aux";

import { Link } from 'react-router-dom/cjs/react-router-dom';
import classes from "./Wiki.css";

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
          The aim of this survey is to collect information about the public transport usage in a city 
          without asking any personal information (e.g. Name, Phone numbers, etc.) and locations of 
          the users.The purpose of the survey is to understand the travel behaviour and user preferences.
          </p>

          <p>The most common questions asked in Public Transport surveys are about:
            <ul>
            <li>Origin and Destination details (both access and egress)</li>
            <li>Average time taken in each leg of the journey</li>
            <li>Average travel cost</li>
            <li>Trip purpose</li>
            <li>Age of the respondent</li>
            <li>Occupation of the respondents</li>
          </ul>
          </p>
    
          <p>
            The collected data will be utilized to:
            <ul>
            <li>Determine travel pattern of the passengers</li>
            <li>Estimate the efficiency of the existing transport services</li>
            <li>Development of a planning model to forecast the traffic, to test various policies etc.</li>
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

          <h4> Data Collection: </h4>
          <p>
            {" "}
            Information about purpose of the trip, travel mode used, travel time and cost incurred etc. 
            on a typical day over a 24-hour period is recorded using this questionnaire. Further, detailed 
            information of each screen is provided:{" "}
          </p>
      <ul>
          <li>
              Personal information:
          <ul>
                <li>Enter gender, age, educational qualification, profession and monthly income.{" "}</li>
                <li>Enter information about light vehicle driving licensing.{" "}</li>
                <li>Enter number of vehicles in the household.{" "}</li>
          </ul>
            </li>
           
          <li>
              Travel information:
          <ul>

              <li>Enter the name of metro station.{" "}</li>
              <li>Select the trip purpose.{" "}</li>
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
              <li>Select travel time and travel cost for the whole trip.</li>
              <li>Check the mode used for accessing and egressing the metro station from the checkbox.</li>
              <li> Enter the travel frequency.</li>
              <li> Click on submit button.</li>
              
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

          <h4> Simulation Model:</h4>
          <p>
            The collected data will be used to synthesize a multi-agent
            transport simulation model (
            <a
              href="https://www.matsim.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MATSim
            </a>
            ). This data will also be used to calibrate and validate the model.
            Afterwards, the model can be used to test various policies in a
            city. Some examples of the policies are: alteration/re-circulation
            in the existing network, need of a new transit line or new
            infrastructure, impacts of a new bus/metro line, optimal locations
            of smart parking systems, environmental impacts of the travel
            choices, sustainable transport modes, impact of land-use on trip
            profiles, etc. Please see the{" "}
            <a
              href="https://www.matsim.org/gallery/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gallery
            </a>{" "}
            for various scenarios world-wide.
          </p>

          <h4>Future Scope:</h4>
          <p>
            TSaaS is looking forward to transform the current program into a
            more robust traffic data gathering platform by introducing other
            traffic surveys. Please contact us if you have any suggestions
            and/or would like to contribute.
          </p>
          <h4>Team Members:</h4>
          <p>
            {" "}
            <b>Front-end:</b> Harsh Vardhan
          </p>
          <p>
            {" "}
            <b>Back-end:</b> Ishan Rai
          </p>
          <p>
            {" "}
            <b>Literature review:</b> Paras Singh Rajput, Parag Mittal
          </p>
          <p>
            {" "}
            <b>Design:</b> Piyush Anand, Paras Singh Rajput
          </p>
          <p>
            {" "}
            <b>Mentor / Supervisor:</b> Dr. Amit Agarwal{" "}
          </p>

          {/* <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
                <Toolbar  drawerToggleClicked={this.SideDrawerToggleHandler}></Toolbar> */}
        </div>
      </Aux>
    );
  }
}

export default Wiki;
