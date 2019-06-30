import React from 'react';
import classes from './TripModal.css'
import Aux from '../Aux';
import FinalBackdrop from '../FinalBackdrop/FinalBackdrop';
//import tripAccessIn from '../../Containers/Trips/Trip/Individual Trip/TripAcessAndMode/TripAcess/TripAccessIn/TripAccessIn';
const TripModal=(props)=>{
    const tripModalClasses=[classes.TripModal];
    const messageClasses=[classes.Message];
    const dialogBoxStyleClasses=[classes.Dialogbox1];
    if(props.clicked===true){
        tripModalClasses.push(classes.Display);
        messageClasses.push(classes.MessageDisplay);
    }
    if(props.clickedIn){
        tripModalClasses.push(classes.DisplayIn);
        dialogBoxStyleClasses.push(classes.Dialogbox1Display);
    }
    

    return (
        <Aux>
            <FinalBackdrop backdropHide={props.backdropHide} backdropShow={props.backdropShow}></FinalBackdrop>
            <div className={tripModalClasses.join(" ")}>
                <div className={classes.Dialogbox}>
                    <div className={classes.Body}>
                    {/* <span className={tipClasses.join(' ')}></span> */}
                        <div className={messageClasses.join(' ')}>
                            {props.children}  
                            {/* <span>I just made a comment about this comment box which is purely made from CSS.</span> */}
                        </div>   
                    </div>
                    </div>
                    <div className={dialogBoxStyleClasses.join(' ')}>
                    <div className={classes.Body}>
                    {/* <span className={tipClasses.join(' ')}></span> */}
                        <div style={{justifyContent:"space-between"}} className={messageClasses.join(' ')}>
                            {props.inputElementIn}  
                            {/* <span>I just made a comment about this comment box which is purely made from CSS.</span> */}
                        </div>   
                    </div>
                    </div>    
            </div>
        </Aux>
    );
}
export default TripModal;