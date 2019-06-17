import React from 'react';
import classes from './Backdrop.css'
const backdrop=(props)=>{
    return(
       props.show? <div onClick={()=>{
           console.log("working");
           props.hideBackdrop(!props.show);
        }}  className={classes.Backdrop} ></div>:null
    )
}
export default backdrop;