import React from 'react';
import classes from './TripAccessIn.css'
const tripAccessIn=(props)=>{
    const tripAccessInputClasses=[classes.AccessInput];
    if(props.invalid&&props.touched){
        tripAccessInputClasses.push(classes.Invalid)
    }
    return (
        <div className={classes.TripAccessIn}>
            <label name={props.title}>{props.title}</label>
            <input className={tripAccessInputClasses.join(' ')} type="number" onChange={(event)=>props.changed(event,props.title,props.id)}></input>
        </div>
    )
}
export default tripAccessIn;