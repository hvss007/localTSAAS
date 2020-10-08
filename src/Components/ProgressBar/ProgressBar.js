import React, { Component } from 'react';
import classes from './ProgressBar.css';
import Aux from '../../Hoc/AuxFile';
class ProgressBar extends Component{
    // var width;
    // setTimeout(( )=>{
    //     width = document.querySelector("."+classes.ProgressBarInner).offsetWidth;
    //     console.log(width)
    // },3000)
    componentDidMount(){
       this.width= document.querySelector("."+classes.ProgressBarInner).offsetWidth;
    }
   render() 
    {return(
        <Aux> 
            <div className={classes.ProgressBar} >
            <h4 className={classes.ProgressBarText}>
                Progress Bar
            </h4>
            <div className={classes.ProgressBarInner}>
                <div  className={classes.ProgressBarInnerInner} style={{transform:'scale('+(this.width*(1+this.props.transformValue>=0?this.props.transformValue:0)/this.props.total)/15.527 +')'}}>
                </div>
            </div>
            </div>
        </Aux>
    )}
}

export default ProgressBar;
// 'scale('+2.8*(1+props.transformValue) +')'