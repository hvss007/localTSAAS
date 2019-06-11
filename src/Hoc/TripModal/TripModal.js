import React from 'react';
import classes from './TripModal.css'
import Aux from '../Aux';
import FinalBackdrop from '../FinalBackdrop/FinalBackdrop';
//import tripAccessIn from '../../Containers/Trips/Trip/Individual Trip/TripAcessAndMode/TripAcess/TripAccessIn/TripAccessIn';
const TripModal=(props)=>{
    const tripModalClasses=[classes.TripModal];
    const dialogBoxStyleClasses=[classes.Dialogbox1];
    if(props.clicked===true){
        tripModalClasses.push(classes.Display);
    }
    if(props.clickedIn){
        dialogBoxStyleClasses.push(classes.Dialogbox1Display);
    }
    

    return (
        <Aux>
        <div className={tripModalClasses.join(" ")}>
            <div className={classes.Dialogbox}>
                <div className={classes.Body}>
                {/* <span className={tipClasses.join(' ')}></span> */}
                    <div className={classes.Message}>
                        {props.children}  
                        {/* <span>I just made a comment about this comment box which is purely made from CSS.</span> */}
                    </div>   
                </div>
                </div>
                <div className={dialogBoxStyleClasses.join(' ')}>
                <div className={classes.Body}>
                {/* <span className={tipClasses.join(' ')}></span> */}
                    <div className={classes.Message}>
                        {props.inputElementIn}  
                        {/* <span>I just made a comment about this comment box which is purely made from CSS.</span> */}
                    </div>   
                </div>
                </div>    
        </div>
        <FinalBackdrop backdropHide={props.backdropHide} backdropShow={props.backdropShow}></FinalBackdrop>
        </Aux>
    );
}
export default TripModal;