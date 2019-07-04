import React from 'react';
import classes from './CommentInputModal.css';
const commentModalInput=(props)=>{
    return(
        <div className={classes.ImageWrapper}>
            <img onClick={()=>{props.clicked(props.title,props.id)}} alt={""} src={props.source}></img>
            <label style={{fontSize:'17px'}}>{props.title}</label>
            {props.title==='Other'?<input onChange={(event)=>props.changed(event)}></input>: null}
        </div>
    )
}
export default commentModalInput;