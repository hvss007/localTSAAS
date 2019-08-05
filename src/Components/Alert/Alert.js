import React from 'react';
import classes from './Alert.css'
const alert=(props)=>{
    return(
        <div className={classes.Alert}>
            <p className={classes.Message}>
                {props.message}
            </p>
            <div className={classes.ButtonContainer}>
                <button onClick={()=>props.buttonClickHandler(1)}>Yes</button>
                <button onClick={()=>props.buttonClickHandler(2)}>No</button>
            </div>
        </div>
    )
}
export default alert;