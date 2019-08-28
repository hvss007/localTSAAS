import React,{Component} from 'react';
import SubmitButton from '../Members/Member/MemberSubmitButton';
import Toolbar from '../StartSuvey/Navigation/Toolbar/Toolbar';
import SideDrawer from '../StartSuvey/SideDrawer/SideDrawer';
import classes from '../StartSuvey/StartSurvey.css';
import MobileHomePage from '../../assets/icons/mobile.png'
import Background from '../../assets/icons/thanksbackground.png';
import axios from 'axios';
import HostName from '../../assets/globalvaribles/GlobalVariables';
import {withRouter} from 'react-router-dom';
import Aux from '../../Hoc/Aux'
class FinishSurvey extends Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            feedback:{
                value:'',        
            },
        }
    }

    SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    SideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:!prevState.showSideDrawer}
        })
    }
    
    componentDidMount(){
        axios.defaults.xsrfHeaderName = "71LrUj4F3nUNTH47wcC0ynSulY78ysb5SFwjQVZ";
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });  
    }
    onChangeHandler=(event)=>{
        const feedbackCopy={...this.state.feedback}
        feedbackCopy.value=event.target.value
        this.setState({feedback:feedbackCopy})
    }
 	
    submitButtonHandler=(event)=>{
            event.preventDefault();
            const post={
                feedback:this.state.feedback.value,
            }
            axios.post(HostName+"feedback/",post)
                .then((Response)=>{
                    this.setState({show:false})                        
                })
                .catch();
    }
    render(){
    // const mobileBackgroundStyle={background:'url('+MobileHomePage+')',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'45% 0%'}
    // const backgroundElement =window.innerWidth<=500? <div style={{...mobileBackgroundStyle}} className={classes.FirstImageWrapper}></div>:null
    const background =window.innerWidth>=500?{ 
        backgroundImage:'url('+Background+')',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'0% 40%'}:null
    
        let thankyouArray=[];
        for (let key in this.state.feedback){
            thankyouArray.push(
                {
                    id:key,
                    config:this.state.feedback[key]
                }
            )
        }
        return(
        <div style={background} className={classes.StartSurvey}>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
        <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} ></Toolbar>
            <div  className={classes.MainContainer+' '+classes.MainContainerFinishSurvey}>
                <div className={classes.LeftContainer+" "+ classes.LeftContainerFinishSurvey}>
                    <div className={classes.Thank}>
            				<h3>We <span><b>Thank You</b></span> For taking time to complete the survey.</h3>
        			</div>
                    <div className={classes.MobilePageFinishSurvey}>
                        <img alt="Mobile Home Page" src={MobileHomePage}></img>
                    </div>
                    {this.state.show?
                    <Aux>
                        <div className={classes.Thank}>
                                <p> To improve the survey database, your feedback is valuable to us. Please feel free to submit your feedback.</p>
                        </div>
                        <div className={classes.FeedbackWrapper}>
                        <form className={classes.CustomForm}>
                            <textarea onChange={(event)=>this.onChangeHandler(event)} rows="5" style={{width:'100%',outline:'1px solid grey'}} name="comment" form="usrform">
                                {/* Enter your feedback here... */}
                            </textarea>
                        </form>
                        </div>
                        <div>
                            <SubmitButton clicked={this.submitButtonHandler}></SubmitButton>
                        </div>
                    </Aux>:null}
                </div>
                <div className={classes.RightContainer+' '+ classes.RightContainerFinishSurvey}>
                    <img alt="Mobile home page " className={classes.SurveyMonitor} src={MobileHomePage}/> 
                </div>
        </div>
        </div>
    )
	}
}

export default withRouter(FinishSurvey)