import React from 'react';
import classes from './LandmarkAutoComplete.css'
const landmarkAutoComplete=(props)=>{
    return(
        <div className={classes.LandmarkAutoComplete}>
            {props.children}
        </div>
    )
}
export default landmarkAutoComplete;