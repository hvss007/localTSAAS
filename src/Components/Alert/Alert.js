import React from 'react';
import classes from './Alert.css'
import Aux from '../../Hoc/Aux'
const alert=(props)=>{
    return(
        <div className={classes.Alert}>
            <p className={classes.Message}>
                {props.message}
            </p>
            <div className={classes.ButtonContainer}>
                {props.showButton?
                                <Aux>
                                <button onClick={()=>props.buttonClickHandler(1,props.question)}>Yes</button>
                                <button onClick={()=>props.buttonClickHandler(2,props.question)}>No</button></Aux>
                            :
                            <button style={{margin:'auto'}}>Ok</button>
                            }

            </div>
        </div>
    )
}
export default alert;