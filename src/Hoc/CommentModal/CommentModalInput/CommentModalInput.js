import React from 'react';
import classes from './CommentInputModal.css';
const commentModalInput=(props)=>{
    return(
        <div className={classes.ImageWrapper}>
            <img onClick={()=>{props.clicked(props.title,props.id)}} src={props.source}></img>
            <label>{props.title}</label>
            {props.title==='Other'?<input onChange={(event)=>props.changed(event)}></input>: null}
        </div>
    )
}
export default commentModalInput;