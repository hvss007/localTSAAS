import React,{Component} from 'react';
import {Link} from 'react-router-dom';

// import Axios from 'axios';

// import Jaipur from '../../assets/icons/matsimjaipur.png';
//import Matsim from '../../assets/icons/matsim.gif';

import Axios from 'axios';
import StartSurveySub from './StartSurveySub';

class StartSurvey extends Component{
    state={
        showSideDrawer:false,
        displayComponent:false,
        displayText:''
    }
    componentWillMount(){
        Axios.get("http://127.0.0.1:8000/api/college/")
        .then(Response=>{
            console.log(Response);
            console.log(this.props.match.url)
               const collegeArr= Response.data.filter(item=>{
               return (("/"+item.collegeURL===this.props.match.url));
           })
           if(collegeArr.length===1){
               this.setState({displayComponent:true,displayText:collegeArr[0].collegeName})
           }
           console.log(collegeArr);
        })
    }
    SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    SideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:!prevState.showSideDrawer}
        })
    }
    onClickHandler=()=>{  
            // Axios.get("http://127.0.0.1:8000/api/family/")
            // .then(response=>{
            //     console.log(response.data);
            //    this.props.history.push({pathname:this.props.match.url+response.data.familyID+'/member'})
            // })
            this.props.history.push({pathname:this.props.match.url+"/family"})
    }
    
    render(){
        
        const element=this.state.displayComponent?<StartSurveySub collegeName={this.state.displayText}  showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></StartSurveySub>:null;
    return element
    }
}
export default StartSurvey;