import React from 'react';

const tripAccessIn=(props)=>{
    return (
        <div style={{    width: '100%',
            display: 'flex',
            justifyContent: 'space-between'}}>
            <label name={props.title}>{props.title}</label>
            <input onChange={(event)=>props.changed(event,props.title,props.id)}></input>
        </div>
    )

}
export default tripAccessIn;