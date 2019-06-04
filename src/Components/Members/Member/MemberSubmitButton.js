import React from 'react';
import classes from './MemberSubmitButton.css';
const memberSubmitButton=function(props){
    return(
        <button type="submit" onClick={(event)=>props.clicked(event)} className={classes.MemberSubmitButton}>
            Submit
        </button>
        
    )
}

export default memberSubmitButton;