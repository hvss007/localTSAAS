import React,{Component} from 'react';
import Axios from 'axios';
import PTHome from './PTHome';
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
        Axios.defaults.xsrfCookieName = 'csrftoken'
        Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        Axios.get(HostName+"college/")
        .then(Response=>{
               const collegeArr= Response.data.filter(item=>{
                   
                return ((item.collegeURL===this.props.match.url.split('/')[2]));
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
        Axios.defaults.xsrfCookieName = 'csrftoken'
        Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        Axios.post(HostName+"survey/",{surveyType:'pts'}).then(response=>{
            const surveyID=response.data.surveyID
            console.log()
            if(this.props.match.url.split('/').length===2){
                // this.props.history.push({pathname:"/demo/hhs"+surveyID+"/family"})
                this.props.history.push({pathname:this.props.match.url+"/demopt/"+surveyID+"/personal-info"})
            }
            else{this.props.history.push({pathname:this.props.match.url+"/"+surveyID+"/personal-info"})}
        })
        .catch(e=>console.log("network not connected"))
            
    }
    
    render(){    
        let showElement;
        console.log(this.props.match.url.split('/'))
        if(this.props.match.url.split('/')[1]==='pts'){
            showElement=<PTHome collegeName={"demopt"} collegeID={'1'} showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></PTHome>
        }
        else{
                showElement=null
        }
        const element=this.state.displayComponent?<PTHome collegeName={this.state.collegeName} collegeId={this.state.collegeId}  showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></PTHome>:showElement;
    return element
    }
}
export default StartSurvey;