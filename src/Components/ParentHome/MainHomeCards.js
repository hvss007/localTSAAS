import React from 'react';
// import classes from './MainHome.css'
const surveyCards=(props)=>{

    return(
        <div onClick={()=>props.clicked(props.url)} >
            {props.name}
        </div>
    )
} 
export default surveyCards