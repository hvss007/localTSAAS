import React from 'react';
import classes from './Backdrop1.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
const backdrop1=(props)=>{
    
    return(
       props.show? <div onClick={()=>{
           props.hideModalBackdrop(!props.show);
        }}  className={classes.Backdrop1}>
            {props.alert?props.children:null}
            {props.src?<LazyLoadImage alt="example" src={props.src}/>:null}
        </div>:null
    )
}
export default backdrop1;