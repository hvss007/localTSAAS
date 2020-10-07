import React,{Component} from 'react';
import Axios from 'axios';
import AQIHomeSub from './AQIHomeSub';
import Global from '../../assets/globalvaribles/GlobalVariables';

var HostName=Global.hostName
class AQIHome extends Component{
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
                        return (item.surveyURL==='aqips');
                    });
                   const survId = hhsItem[0].surveyTypeID;
                   const collegeArr= Response.data.filter(item=>{
                    return ( 
                        (item.collegeURL===this.props.match.url.split('/')[2])
                        &&
                        (item.surveyTypeID===survId)
                        );
               })
            
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
        Axios.post(HostName+"survey/",{surveyType:'aqips'}).then(response=>{
            const surveyID=response.data.surveyID
            
            if(this.props.match.url.split('/').length===2){
                
                this.props.history.push({pathname:this.props.match.url+"/aqipsdemo/"+surveyID+"/aqips-main"})
            }
            else{
                this.props.history.push({pathname:this.props.match.url+"/"+surveyID+"/aqips-main"})}
        })
        .catch(e=>console.log("network not connected"))
            
    }
    
    render(){    
        let showElement;
        if(this.props.match.url==='/aqips'){
            showElement=<AQIHomeSub 
            collegeURL={"aqipsdemo"} 
            surveyTypeID={'1'} 
            showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></AQIHomeSub>
        }
        
        else{
                showElement=null
        }
        const element=this.state.displayComponent?<AQIHomeSub 
        collegeName={this.state.collegeName} 
        collegeURL={this.state.collegeURL}  
        surveyTypeID={this.state.surveyTypeID}
        showSideDrawer={this.state.showSideDrawer} SideDrawerToggleHandler={this.SideDrawerToggleHandler} SideDrawerClosedHandler={this.SideDrawerClosedHandler}  submitClicked={this.onClickHandler}></AQIHomeSub>:showElement;
    return element
    }
}
export default AQIHome;