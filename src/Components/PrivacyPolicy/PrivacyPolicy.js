import React, { Component } from 'react';
import classes from './PrivacyPolicy.css';
class  PrivacyPolicy extends Component{
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
            <div className={classes.PrivacyPolicy}>
                <h1>Privacy Policy</h1>
                <p>This Privacy Policy describes our privacy practices with respect to information collected through TSaaS website, application. TSaaS has the utmost regard for the privacy of its users. We hope the policy outlined below will help you understand what data we may collect, how TSaaS uses it and safeguards that data.</p>
                <h3>The information we collect:</h3>
                <ul>
                    <li><b>non-personal information:</b> it is the information that does not exclusively identify you but is little related such as, information about your demographics (e.g., age category , gender, education, income category, etc.), address limited to the closest landmark etc.</li>
                    <li><b>travel information:</b> it includes the landmarks near to origins, destinations, travel mode, travel time, distance, trip cost. We do not track the location of the users by using GPS of the device.</li>
                    <li><b>respondent information </b>like (sign up, logins, email address, phone number, IP address etc)  are taken up by users.</li>
                </ul>
                <h3>
                    How do we use your information:
                </h3>
                <p>
                Your inputs will be foundation of a synthetic agent-based transport model. This model will help in understanding the current trip patterns, trip behaviour and different probably choices under various policies in the simulation environment.
                </p>
                <p>
                Though, we do not collect any personal information, collected dis-aggregate information is not shared with anyone.
                </p>
                <h3>
                Third party content and links to third party websites
                </h3>
                <p>We have used “HereMaps” API services and the privacy of users are taken into consideration and no such personal information are taken through these maps without user permission. </p>

            </div>
        )
    }




}
    

export default PrivacyPolicy;