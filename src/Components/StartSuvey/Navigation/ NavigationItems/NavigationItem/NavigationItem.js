import React from 'react';
import classes from './NavigationItem.css'
import { Link } from 'react-router-dom/cjs/react-router-dom';
const navigationItem=(props)=>{
   return(props.anchor?<li className={classes.NavigationItem}><a href={props.link} target="_blank" className={props.active?classes.active:null}>{props.children}</a></li>:<li className={classes.NavigationItem}><Link className={props.active?classes.active:null} to={props.link}>{props.children}</Link></li>)
}
export default navigationItem;