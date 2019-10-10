import React,{Component} from 'react';
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
        collegeURL:'',
        surveyTypeID:''
    }
    componentWillMount(){
        Axios.defaults.xsrfCookieName = 'csrftoken'
        Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        Axios.get(HostName+"college/")
        .then(Response=>{
                // get id of survey type 'hhs'
                Axios.get(HostName+"surveyType/").then(Res=>{
                    const hhsItem = Res.data.filter(item=>{
                        return (item.surveyURL==='hhs');
                    });
                   const survId = hhsItem[0].surveyTypeID;
                   const collegeArr= Response.data.filter(item=>{
                    return ( 
                        (item.collegeURL===this.props.match.url.split('/')[2])
                        &&
                        (item.surveyTypeID===survId)
                        );
               })
            //    console.log(collegeArr);
               if(collegeArr.length===1){
                   this.setState({displayComponent:true,
                    collegeName:collegeArr[0].collegeName,
                    collegeURL:collegeArr[0].collegeURL,
                    surveyTypeID:collegeArr[0].surveyTypeID})
               }
               else{
               }

                })
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
        Axios.post(HostName+"survey/",{surveyType:'hhs'}).then(response=>{
            const surveyID=response.data.surveyID
            // console.log()
            if(this.props.match.url.split('/').length===2){
                // this.props.history.push({pathname:"/demo/hhs"+surveyID+"/family"})
                this.props.history.push({pathname:this.props.match.url+"/demo/"+surveyID+"/family"})
            }
            else{
                this.props.history.push({pathname:this.props.match.url+"/"+surveyID+"/family"})}
        })
        .catch(e=>console.log("network not connected"))
            
    }
    
    render(){    
        let showElement;
        // console.log(this.props.match.url.split('/'))
        if(this.props.match.url==='/hhs'){
            showElement=<StartSurveySub 
            collegeURL={"demo"} 
            surveyTypeID={'1'} 
            showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></StartSurveySub>
        }
        
        else{
                showElement=null
        }
        const element=this.state.displayComponent?<StartSurveySub 
        collegeName={this.state.collegeName} 
        collegeURL={this.state.collegeURL}  
        surveyTypeID={this.state.surveyTypeID}
        showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></StartSurveySub>:showElement;
    return element
    }
}
export default StartSurvey;