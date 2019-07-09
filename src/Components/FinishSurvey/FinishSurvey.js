import React,{Component} from 'react';
// import classes from './FinishSurvey.css'
import SubmitButton from '../Members/Member/MemberSubmitButton';
import Toolbar from '../StartSuvey/Navigation/Toolbar/Toolbar';
import SideDrawer from '../StartSuvey/SideDrawer/SideDrawer';
import classes from '../StartSuvey/StartSurvey.css';
import MobileHomePage from '../../assets/icons/mobile.png'
import HomePage from '../../assets/icons/homepage.png';
import Background from '../../assets/icons/thanksbackground.png';
// import TsaasLogo from '../../assets/icons/tsaaslogo.png';
class FinishSurvey extends Component{
	state={
        showSideDrawer:false,
        displayComponent:false,
    }

 	SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    SideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render(){
    // const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
    const mobileBackgroundStyle={background:'url('+MobileHomePage+')',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'45% 0%'}
    const backgroundElement =window.innerWidth<=500? <div style={{...mobileBackgroundStyle}} className={classes.FirstImageWrapper}></div>:null
    const background =window.innerWidth>=500?{ 
        backgroundImage:'url('+Background+')',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'0% 40%'}:null
    return(
        <div style={background} className={classes.StartSurvey}>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
        <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} ></Toolbar>
            <div  className={classes.MainContainer+' '+classes.MainContainerFinishSurvey}>
                <div className={classes.LeftContainer+" "+ classes.LeftContainerFinishSurvey}>
                    
                    {/*<div className={classes.ImgTextWrapper}>
                        <img src={TsaasLogo}></img>
                        <div className={classes.LogoText}>
                            <p>Traffic Survey</p>
                            <p>as a Service</p>

                        </div>
                    </div>
                        </div>              
                    </div>  */}
 
                    <div className={classes.Thank}>
            				<h3>We <span><b>Thank You</b></span> For taking time to complete the survey.</h3>
        			</div>
                    <div className={classes.MobilePageFinishSurvey}>
                        <img src={MobileHomePage}></img>
                    </div>
                    <div className={classes.Thank}>
            				<h4>To improve the survey database, your feedback is valuable to us. Please feel free to submit your feedback.</h4>
        			</div>
                    <div className={classes.FeedbackWrapper}>
                        <textarea rows="4" cols="50" name="comment" form="usrform">
                            Enter your feedback here...
                        </textarea>
                    </div>
                    <SubmitButton></SubmitButton>

                </div>
                <div className={classes.RightContainer+' '+ classes.RightContainerFinishSurvey}>
                    <img className={classes.SurveyMonitor} src={MobileHomePage}/> 
                </div>
                
        </div>
        </div>
    )
	}
}

export default FinishSurvey;
