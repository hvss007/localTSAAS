import React from 'react';
import classes from './TripAccessIn.css'
const tripAccessIn=(props)=>{
    const tripAccessInputClasses=[classes.AccessInput];
    if(props.invalid&&props.touched){
        tripAccessInputClasses.push(classes.Invalid)
    }
    return (
        <div className={classes.TripAccessIn}>
            <label name={props.displayValue}>{props.displayValue}{props.src?<span><img style={{width:'11px'}} alt={""} src={props.src}></img></span>:null} ?</label>
            <input type={props.type} className={tripAccessInputClasses.join(' ')} onChange={(event)=>props.changed(event,props.title,props.id)}></input>
        </div>
    )
}
export default tripAccessIn;