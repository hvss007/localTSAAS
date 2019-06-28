import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Members from '../../Components/Members/Members';
import Trips from '../Trips/Trips';
import StartSurvey from '../../Components/StartSuvey/StartSurvey';
import Family from '../../Components/Family/Family';
class Survey extends Component{
    render(){
        return(
        <div>  
        {/* <Members 
        // changedMems={this.inputChangeHandler} 
        // membInfo={this.state.member}
        >
        </Members> */}
        {/* <Trips>\
        </Trips> */}
        <Switch>
        <Route path='/:id' exact component={StartSurvey}/>
        <Route path='/:id/family'exact component={Family}></Route>
        <Route path="/:id/family:id/member" exact component={Members}/>
        <Route path="/:id/family:id/member:id1/trip-info" exact component={Trips}/>
        </Switch>
        </div>
        )
    }
}
export default Survey;