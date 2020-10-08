import React from 'react';
import classes from './MemberSubmitButton.css';
import Aux from '../../../Hoc/AuxFile'
const memberSubmitButton=function(props){
  const buttonClasses=[classes.MemberSubmitButton,classes.MemberSubmitButtonBorder];
  return(
        <Aux>
        <button onClick={(event)=>props.clicked(event)} 
        className={buttonClasses.join(' ')}>
            Submit
        </button>
        </Aux>
    )
}

export default memberSubmitButton;

