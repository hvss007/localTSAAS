import React from 'react';
import classes from './BuildControl.css';
const buildControl =props=>(
    <div className={classes.BuildControl}>
        <div className={classes.LabelWrapper}>
        <img alt={""} src={props.src}></img>
        <div className={classes.Label}> 
            {props.label}
        </div>
        <p>{props.value}</p>
        </div>
        <button className={classes.Less} onClick={props.removed}>&#8212;</button>
        <button className={classes.More} onClick={props.added}>+</button>

    </div>
)
export default buildControl;