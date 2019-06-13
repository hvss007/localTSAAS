import React, { Component } from 'react';
import {Route} from 'react-router-dom';
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
        {/* <Trips>

        </Trips> */}
        <Route path="/" exact component={Members}/>
        <Route path="/trip-info" component={Trips}/>
        </div>
        )
    }
}
export default Survey;