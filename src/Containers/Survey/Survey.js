import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Members from '../../Components/Members/Members';
import Trips from '../Trips/Trips';
import StartSurvey from '../../Components/StartSuvey/StartSurvey';
import Family from '../../Components/Family/Family';
import PrivacyPolicy from '../../Components/PrivacyPolicy/PrivacyPolicy';
import ContactUs from '../../Components/ContactUs/ContactUs';
import FinishSurvey from '../../Components/FinishSurvey/FinishSurvey';
import Wiki from '../../Components/Wiki/Wiki';
import Maps from '../GoogleMaps/Maps'
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
        {/* <Route path='/' component={StartSurvey}/>     */}
        <Route path='/Maps' exact component={Maps}/> 
        <Route path='/finishsurvey' exact component={FinishSurvey}/> 
        <Route path='/privacypolicy' exact component={PrivacyPolicy}/> 
        <Route path='/contact' exact component={ContactUs}/> 
        <Route path='/wiki' exact component={Wiki}/> 
        <Route path='/' exact  component={StartSurvey}/>
        <Route path='/:id' exact  component={StartSurvey}/>
        {/* <Route path='/:id/wiki' exact component={Wiki}/> */}
        {/* <Route path='/privacypolicy' exact component={PrivacyPolicy}/>  */}
        {/* <Route path='/family' exact component={Family}></Route> */}
        <Route path='/:id/family'exact component={Family}></Route>
        <Route path="/:id/family:id/member" exact component={Members}/>
        <Route path="/:id/family:id/member:id1/trip-info" exact component={Trips}/>
        
        </Switch>
        </div>
        )
    }
}
export default Survey;