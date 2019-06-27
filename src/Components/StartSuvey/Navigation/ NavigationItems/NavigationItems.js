import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems =()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="https://www.iitr.ac.in/departments/CE/" >Home(IITR Civil)</NavigationItem>
        <NavigationItem link="/">Wiki(TSAAS)</NavigationItem>
        <NavigationItem link="/">Privacy Policy</NavigationItem>
        <NavigationItem link="/">Contact Us</NavigationItem>

    </ul>
);

export default navigationItems;