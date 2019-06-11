import React, { Component } from 'react';
import Members from '../../Components/Members/Members';
import Trips from '../Trips/Trips';
class Survey extends Component{
    state={
       
    }


    render(){
        return(
        <div>  
        {/* <Members 
        // changedMems={this.inputChangeHandler} 
        // membInfo={this.state.member}
        >
        </Members> */}
        <Trips>

        </Trips>
        </div>
        )
    }
}
export default Survey;