import React from 'react';
import classes from './Backdrop1.css'
const backdrop1=(props)=>{
    
    return(
       props.show? <div onClick={()=>{
           props.hideModalBackdrop(!props.show);
        }}  className={classes.Backdrop1}></div>:null
    )
}
export default backdrop1;