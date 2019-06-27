import React from 'react';
import classes from './BackdropNew.css';
const backdrop =(props)=>{
    return(
       props.show? <div className={classes.Backdrop} onClick={props.clicked} ></div>:null
    )
}
export default backdrop;