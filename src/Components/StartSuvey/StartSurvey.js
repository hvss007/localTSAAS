import React,{Component} from 'react';
// import {Link} from 'react-router-dom';
// import Axios from 'axios';
// import Jaipur from '../../assets/icons/matsimjaipur.png';
//import Matsim from '../../assets/icons/matsim.gif';
import Axios from 'axios';
import StartSurveySub from './StartSurveySub';
// import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'
import HostName from '../../assets/globalvaribles/GlobalVariables';
// require('dotenv').config();
class StartSurvey extends Component{
    state={
        showSideDrawer:false,
        displayComponent:false,
        collegeName:'',
        collegeID:''
    }
    componentWillMount(){
        Axios.get(HostName+"college/")
        .then(Response=>{
               const collegeArr= Response.data.filter(item=>{
               return (("/"+item.collegeURL===this.props.match.url));
            //    let element=Response.data.filter(
            //        item=>{
            //         return ((item.Name==='home'));
            //        }
                   
            //    )
           })
           if(collegeArr.length===1){
               this.setState({displayComponent:true,collegeName:collegeArr[0].collegeName,collegeID:collegeArr[0].collegeID})
           }
           else{

           }
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
            if(this.props.match.url==="/"){
                this.props.history.push({pathname:"/demo/family"})
            }
            else{this.props.history.push({pathname:this.props.match.url+"/family"})}
    }
    
    render(){    
        let showElement;
        if(this.props.match.url==="/"){
            showElement=<StartSurveySub collegeName={"demo"} collegeID={'1'} showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></StartSurveySub>
        }
        else{
                showElement=null
        }
       
        // const navElement=this.props.match.params.id==="privacypolicy"?<PrivacyPolicy/>:null
        // const testElement=this.props.match.url==="/"?<StartSurveySub collegeName="none"  showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></StartSurveySub>:null
        const element=this.state.displayComponent?<StartSurveySub collegeName={this.state.collegeName} collegeId={this.state.collegeId}  showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></StartSurveySub>:showElement;
    return element
    }
}
export default StartSurvey;