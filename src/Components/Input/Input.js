import React from 'react';
import classes from './Input.css';
const Input =(props)=>{
    let inputElement=null;
    const inputClasses=[classes.InputElement];
    if(props.invalid&&props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType){
        case('input'):
        inputElement=<input onChange={props.changed} 
        className={inputClasses.join(' ')}  {...props.elementconfig}></input>
        break;
        case("select"):
        inputElement=
        (<select onChange={props.changed} className={inputClasses.join(' ')} 
            >
              {     
                  props.elementconfig.options.map((inOpt)=>
                  {
                  return(
                  <option selected={inOpt.selected} disabled={inOpt.disabled} key={inOpt.value} value={inOpt.value}  >{inOpt.displayValue}</option>
                  )})  
              }
        </select>)
        break;
        default:
            inputElement=<input className={classes.InputElement} ></input>
    }
    return(
        <div className={classes.Input}> 
            <label className={classes.Label}>{props.label} </label>
            {inputElement}
        </div>
    )

}


export default Input;