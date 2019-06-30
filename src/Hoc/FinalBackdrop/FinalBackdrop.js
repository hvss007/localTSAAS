import React from 'react';
import classes from './FinalBackdrop.css'
const finalBackdrop=(props)=>{
    return(
       props.backdropShow?
        <div onClick={()=>{props.backdropHide()}}  className={classes.FinalBackdrop}></div>:null
    )
}
export default finalBackdrop;