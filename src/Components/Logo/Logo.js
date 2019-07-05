import React from 'react';
import Logo from '../../assets/icons/Logo.png'
import classes from './Logo.css'
const logo=props=>(
    <div className={classes.Logo} style={{height:props.height}}>
        <img alt = {"TSaaS"} src={Logo}></img>
        <div style={{fontSize:props.fontSize}} className={classes.LogoText}>
        <p style={{whiteSpace:'nowrap'}}>Traffic Survey</p>
        <p style={{whiteSpace:'nowrap'}}>as a Service</p>
        </div>
    </div>
)
export default logo;