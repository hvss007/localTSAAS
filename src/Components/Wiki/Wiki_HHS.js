import React, { Component } from "react";
import Backdrop from "../../Hoc/Backdrop/Backdrop1";
import Aux from "../../Hoc/Aux";
import FamilyScreenshot1 from "../../assets/screenshots/family1.png";
import FamilyScreenshot2 from "../../assets/screenshots/family2.png";
import FamilyScreenshot3 from "../../assets/screenshots/family3.png";
import MemberScreenshot1 from "../../assets/screenshots/member1.png";
import MemberScreenshot2 from "../../assets/screenshots/member2.png";
import MemberScreenshot3 from "../../assets/screenshots/member3.png";
// import MemberScreenshot4 from "../../assets/screenshots/member4.png";
// import MemberScreenshot5 from "../../assets/screenshots/member5.png";
import TripScreenshot1 from "../../assets/screenshots/trip1.png";
import TripScreenshot2 from "../../assets/screenshots/trip2.png";
import TripScreenshot3 from "../../assets/screenshots/trip3.png";
import TripScreenshot4 from "../../assets/screenshots/trip4.png";
import TripScreenshot5 from "../../assets/screenshots/trip5.png";
import TripScreenshot6 from "../../assets/screenshots/trip6.png";
import TripScreenshot7 from "../../assets/screenshots/trip7.png";
import ImageDialogs from "./ImageDialogs";

import { Link } from "react-router-dom/cjs/react-router-dom";
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
            The aim of this survey is to build a tool to collect the trip
            diaries conveniently without asking any personal information and
            locations of the users. A typical trip diary attempts to answer the
            following questions:
          </p>
          <ul>
            <li>How many trips do people make per day?</li>
            <li>What is the detaination?</li>
            <li>Which is the preferred travel mode?</li>
            <li>What is the preferred departure time?</li>
            <li>What is the activity/trip-sequence?</li>
            <li>
              What is the most influencing factor for their choices about travel
              mode, route etc.?
            </li>
          </ul>
          <p>
            The collected data will be used to analyze the current trip profiles
            and travel behaviour of the residents of a city. The data is
            generally used to develop/synthesize a transportation planning model
            so that transport analysts can make predictions about the people who
            are not surveyed. The model is important to forecast the traffic, to
            test various policies etc. The implications from the policy testing
            will assist transportation planners and policy makers who need
            comprehensive data for managing the city traffic and infrastructure.
          </p>

          <p>
            {" "}
            <b>
              <i>TSaaS</i>
            </b>{" "}
            (Traffic Survey as a Service) serves as an inventory of daily trip
            diaries. The state-of-the-art techniques such as pen-paper surveys
            are not only time and resource-intensive, but prone to various
            errors. Some of the advanced techniques force users to install the
            app on their smartphones and continuously track their location
            throughout the day/week. Since such applications record the personal
            information and locations precisely, the response rate is very low
            due to privacy concerns. Therefore, after a fair trade-off between
            the two techniques, TSaaS is developed which is an open-source,
            web-based revealed preference survey. The survey is designed in a
            way that it records most of the information required to
            differentiate the trip profiles and trip patterns in minimum time,
            however without asking any personal information. The source code is
            hosted on GitHub as front-end and back-end.
          </p>

          <h4> Data Collection: </h4>
          <p>
            {" "}
            In short, information about activities (purpose of the trip; e.g.
            home, work, education, social visits, leisure, shopping etc.) and
            trips (vehicle, trip distance, trip time etc.) on a typical day over
            a 24-hour period is recorded using this questionnaire. Further,
            detailed information of each screen is provided:{" "}
          </p>
          <ul>
            <li>
              Family page:
              <ul>
                <li>
                  Enter number of cars, scooter/motorcycles and bicycles.{" "}
                  <span className={classes.ImageLink}>
                    <ImageDialogs
                      image={FamilyScreenshot1}
                      name="See an example."
                    />
                  </span>
                </li>
                <li>
                  Enter monthly income of the family.{" "}
                  <span className={classes.ImageLink}>
                    <ImageDialogs
                      image={FamilyScreenshot2}
                      name="See an example."
                    />
                  </span>
                </li>
                <li>
                  Enter permanent address (home town): choose state and
                  district, enter initials of nearest landmark and select one
                  item from drop down landmarks. Finally drag the marker closest
                  to your permanent address.{" "}
                  <span className={classes.ImageLink}>
                    <ImageDialogs
                      image={FamilyScreenshot3}
                      name="See an example."
                    />
                  </span>
                </li>
                <li>
                  Hint: If no drop down item matches your criteria, search with
                  some other.
                </li>
                <li>Click on submit button.</li>
              </ul>
            </li>
            {/* <div> <span className={classes.ImageLink}><img style={{width:'250px'}} alt={"family_screenshot1"} src={FamilyScreenshot1}></img></span><p>Family page</p></div>
                    <div> <span className={classes.ImageLink}><img style={{width:'250px'}} alt={"family_screenshot2"} src={FamilyScreenshot2}></img></span><p>Family page contd.</p></div>
                    <div> <span className={classes.ImageLink}><img style={{width:'250px'}} alt={"family_screenshot3"} src={FamilyScreenshot3}></img></span><p>Family page contd.</p></div> */}
            <li>Member page:</li>
            <ul>
              <li>
                Enter gender, age, educational qualification, maritial status,
                monthly income and principal source of income.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={MemberScreenshot1}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                Enter number of sim cards, mobile phone usages while
                driving/traveling, etc.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={MemberScreenshot2}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                Enter information about two-wheeler and four-wheeler licensing,
                etc.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={MemberScreenshot3}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                Enter if you are respondent, head of family and whether if you
                stay at home for the whole day and click on submit.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={MemberScreenshot3}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                If the member stay at the home, a new member page will reappear;
                else you will be sent to trip page.
              </li>
            </ul>
            <li>Trip page:</li>
            <ul>
              <li>
                Enter the state and district in which a trip is made, and click
                on proceed. If the trip is outside the study region, a new
                member page will appear.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={TripScreenshot1}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                Enter the landmark nearest to your origin location. This will
                show a map with a marker. Drag the marker nearest to your origin
                location and click 'Ok'.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={TripScreenshot2}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                Enter the type of origin and approximate departure time.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={TripScreenshot3}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                Similar to origin, enter the landmark nearest to your
                destination, adjust the marker, click on 'Ok', select type of
                destination type and appeoximate arrival time.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={TripScreenshot4}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                Enter the travel modes (vehicle/walk) in the order which the
                member has used them.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={TripScreenshot5}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                Select the travel cost and travel distance ranges for the whole
                trip. After that, click on 'Add Trip'.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={TripScreenshot6}
                    name="See an example."
                  />
                </span>
              </li>
              <li>
                This will start a new trip, origin information of second trip
                onwards will be auto filled. Start entering details with
                departure time.
              </li>
              <li>
                Click on 'Remove trip' to remove a trip. Click on 'Proceed' if
                all trips of the current member are entered. This process will
                be repeated for all members.{" "}
                <span className={classes.ImageLink}>
                  <ImageDialogs
                    image={TripScreenshot7}
                    name="See an example."
                  />
                </span>
              </li>
            </ul>
          </ul>

          <h4> Privacy Policy:</h4>
          <p>
            The details of our privacy policy is available{" "}
            <Link to="/privacypolicy">here</Link>.
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
          <ul>
            <li>
              <b>Front-end:</b> Harsh Vardhan
            </li>
            <li>
              <b>Back-end:</b> Ishan Rai
            </li>
            <li>
              <b>Design:</b> Piyush Anand
            </li>
            <li>
              <b>Mentor / Supervisor:</b> Dr. Amit Agarwal{" "}
            </li>
          </ul>
          {/* <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
                <Toolbar  drawerToggleClicked={this.SideDrawerToggleHandler}></Toolbar> */}
        </div>
      </Aux>
    );
  }
}

export default Wiki;
