import React, { Component } from 'react';
// import Toolbar from '../StartSuvey/Navigation/Toolbar/Toolbar';
// import SideDrawer from '../StartSuvey/SideDrawer/SideDrawer';
import classes from './Wiki.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class  Wiki extends Component{
    state={
        showSideDrawer:false,
        displayComponent:false
    }
    SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    SideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <div className={classes.Wiki}>
                <h1>Wiki</h1>
                <h4>Aim:</h4>
                <p>The aim of this project is to build a tool to collect the trip diaries conveniently without asking any personal information and locations of the users. A typical trip diary attempts to answer the following questions:</p>
                <ul>
                	<li>How many trips do people make per day?</li>
                	<li>What is the detaination?</li>
                	<li>Which is the preferred travel mode?</li>
                	<li>What is the preferred departure time?</li>
                	<li>What is the activity/trip-sequence?</li>
                	<li>What is the most influencing factor for their choices about travel mode, route etc.?</li>
                </ul>
                <p>The collected data will be used to analyze the current trip profiles and travel behaviour of the residents of a city. The data is generally used to develop/synthesize a transportation planning model so that transport analysts can make predictions about the people who are not surveyed. The model is important to forecast the traffic, to test various policies etc. The implications from the policy testing will assist transportation planners and policy makers who need comprehensive data for managing the city traffic and infrastructure.</p>

                <p> <b><i>TSaaS</i></b> (Traffic Survey as a Service) serves as an inventory of daily trip diaries. The state-of-the-art techniques such as pen-paper surveys are not only time and resource-intensive, but prone to various errors. Some of the advanced techniques force users to install the app on their smartphones and continuously track their location throughout the day/week. Since such applications record the personal information and locations precisely, the response rate is very low due to privacy concerns. Therefore, after a fair trade-off between the two techniques, TSaaS is developed which is an open-source, web-based revealed preference survey. The survey is designed in a way that it records most of the information required to differentiate the trip profiles and trip patterns in minimum time, however without asking any personal information. The source code is hosted on GitHub as front-end and back-end.</p>
                
                <h4> Data Collection: </h4>
                <p>  In short, information about activities (purpose of the trip; e.g. home, work, education, social visits, leisure, shopping etc.) and trips (vehicle, trip distance, trip time etc.) on a typical day over a 24-hour period is recorded using this questionnaire. Further, detailed information of each screen is provided: </p>
                <ul>
                	<li>Family Information:</li>
                	<li>Member Information:</li>
                	<li>Trip Information:</li>
                </ul>
 				
                 <h4> Privacy Policy:</h4>
                 <p>The details of our privacy policy is available <Link to="/privacypolicy">here</Link>.</p>

                 <h4> Simulation Model:</h4>
                 <p>The collected data will be used to synthesize a multi-agent transport simulation model (<a href="https://www.matsim.org/" target="_blank">MATSim</a>). This data will also be used to calibrate and validate the model. Afterwards, the model can be used to test various policies in a city. Some examples of the policies are: alteration/re-circulation in the existing network, need of a new transit line or new infrastructure, impacts of a new bus/metro line, optimal locations of smart parking systems, environmental impacts of the travel choices, sustainable transport modes, impact of land-use on trip profiles, etc. Please see the <a href="https://www.matsim.org/gallery/" target="_blank">Gallery</a> for various scenarios world-wide.</p>

                 <h4>Future Scope:</h4>
                 <p>TSAAS is looking forward to transform the current program into a more robust traffic data gathering platform by introducing other traffic surveys. Please contact us if you have any suggestions and/or would like to contribute.</p>

                 <h4>Team Members:</h4>
                 <p> <b>Front-end:</b>  Harsh Vardhan, Ishan Rai</p>
                 <p> <b>Back-end:</b>  Ishan Rai</p>
                 <p> <b>Literature review:</b>  Paras Singh Rajput, Parag Mittal</p>
                 <p> <b>Design:</b> Piyush Anand, Paras Singh Rajput</p>
				 <p> <b>Mentor / Supervisor:</b> Dr. Amit Agarwal </p>
        
                {/* <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
                <Toolbar  drawerToggleClicked={this.SideDrawerToggleHandler}></Toolbar> */}


                
            </div>
        )
    }




}
    

export default Wiki;