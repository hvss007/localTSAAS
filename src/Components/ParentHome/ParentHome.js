import React from 'react';
import Toolbar from '../StartSuvey/Navigation/Toolbar/Toolbar';
import SideDrawer from '../StartSuvey/SideDrawer/SideDrawer';
import classes from '../StartSuvey/StartSurvey.css';
import MobileHomePage from '../../assets/icons/parentHomeMobile.png'
import HomePage from '../../assets/icons/parentHome.png';
import Background from '../../assets/icons/homebackground.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';

const ParentHome=(props)=>{
    const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
        const mobileBackgroundStyle={background:'url('+MobileHomePage+')',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'45% 0%'}
        const backgroundElement =window.innerWidth<=500? <div style={{...mobileBackgroundStyle}} className={classes.FirstImageWrapper}></div>:null
        const background =window.innerWidth>=500?{ 
            backgroundImage:'url('+HomePage+'),url('+Background+')',backgroundRepeat:'no-repeat',backgroundSize:'contain,cover',backgroundPosition:'80% 40%,0% 40%'}:null
    return(
        <div style={background} className={classes.StartSurvey} >
        <SideDrawer open={props.showSideDrawer} closed={props.SideDrawerClosedHandler}></SideDrawer>
        <Toolbar drawerToggleClicked={props.SideDrawerToggleHandler} ></Toolbar>
            
            <div  className={classes.MainContainer}>
                <div className={classes.LeftContainer}>
                    {backgroundElement}
                    <div className={classes.ImgTextWrapper}>
                        <img alt={"TSaaS"} src={TsaasLogo}></img>
                        <div className={classes.LogoText}>
                            <p>Traffic Survey</p>
                            <p>as a Service</p>
                        </div>    
                    </div>
                    <p> Welcome to TSaaS! Please select a survey from the following list which will take you to the survey page.</p>
                    {/* A drop down should show up here which will directly take to survey page. */}
                    <p> If the desired survey is not available, you can request a survey <a href="mailto:amitfce@iitr.ac.in?subject=Request for a new survey"> here</a>.</p> 
                    </div>
                    
                <div className={classes.RightContainer}> </div>
            </div>
        </div>
    )
}
export default ParentHome