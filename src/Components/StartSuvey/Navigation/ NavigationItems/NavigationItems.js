import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
import {withRouter} from 'react-router-dom';
const navigationItems =(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem anchor link="https://www.iitr.ac.in/">IIT Roorkee</NavigationItem>
        <NavigationItem anchor link="https://civil.iitr.ac.in/">Civil Engineering</NavigationItem>
        {/* <NavigationItem anchor link="https://civil.iitr.ac.in/TEG/about">Transportation Engineering</NavigationItem> */}
        <NavigationItem link={"/wiki"}>Wiki</NavigationItem>
        <NavigationItem link={"/privacypolicy"}>Privacy Policy</NavigationItem>
        <NavigationItem anchor link="https://github.com/teg-iitr/tsaas-frontend/">GitHub</NavigationItem>
        <NavigationItem link={"/contact"}>Contact Us</NavigationItem>
    </ul>
);

export default withRouter(navigationItems);