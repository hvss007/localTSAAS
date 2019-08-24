import React from 'react';
import classes from './ParentHome.css'
const surveyCards=(props)=>{
    return(
        <div  className={classes.Tiles} onClick={()=>props.clicked(props.url)} >
            <img style={{width:'391px'}} alt={props.name} src={props.src}></img>
            <p>{props.name}</p>
        </div>
    )
} 
export default surveyCards