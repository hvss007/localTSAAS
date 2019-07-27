import React from 'react';
import classes from './CommentInputModal.css';
const commentModalInput=(props)=>{
    return(
        <div className={classes.ImageWrapper}>
            <img onClick={()=>{props.clicked(props.title,props.id)}} alt={""} src={props.source}></img>
            <label onClick={()=>{props.clicked(props.title,props.id)}} style={{fontSize:'17px'}}>{props.title}</label>
            {props.title==='Other'?<input  onKeyDown={(event)=>props.keyPress(event)} onChange={(event)=>props.changed(event,this)} value={props.value}></input>: null}
        </div>
    )
}
export default commentModalInput;