import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
import {withRouter} from 'react-router-dom';
const navigationItems =(props)=>(
    <ul className={classes.NavigationItems}>
        {console.log(props)}
        <NavigationItem anchor link="https://www.iitr.ac.in/">IIT Roorkee</NavigationItem>
        <NavigationItem link={"/wiki"}>Wiki</NavigationItem>
        <NavigationItem link={"/privacypolicy"}>Privacy Policy</NavigationItem>
        <NavigationItem link={"/contact"}>Contact Us</NavigationItem>
    </ul>
);

export default withRouter(navigationItems);