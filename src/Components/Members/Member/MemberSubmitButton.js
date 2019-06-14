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

{/* <nav class="nav-c">
  <div class="svg-wrapper">
  <svg height="40" width="180" xmlns="http://www.w3.org/2000/svg">
    <rect class="shape" height="40" width="180" />
    <div class="slide-block"></div>
    <div class="text">LEARN MORE</div>
  </svg>
</div>
</nav> */}