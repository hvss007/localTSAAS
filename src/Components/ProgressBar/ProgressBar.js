import React from 'react';
import classes from './ProgressBar.css';
import Aux from '../../Hoc/Aux';
const progressBar=(props)=>{
    return(
        <Aux> 
            <div className={classes.ProgressBar} >
            <h4 className={classes.ProgressBarText}>
                Progress Bar
            </h4>
            <div className={classes.ProgressBarInner}>
                <div className={classes.ProgressBarInnerInner} style={{transform:'scale('+2.8*(1+props.transformValue) +')'}}>
                </div>
            </div>
            </div>
        </Aux>
    )
}

export default progressBar;