import React from 'react';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import classes from './StartSurvey.css';
import MobileHomePage from '../../assets/icons/hhs-mobile.png'
import HomePage from '../../assets/icons/homepage.png';
import Background from '../../assets/icons/homebackground.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';

const startSurveySub=(props)=>{
    const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
        const mobileBackgroundStyle={background:'url('+MobileHomePage+')',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'45% 0%'}
        const backgroundElement =window.innerWidth<=500? <div style={{...mobileBackgroundStyle}} className={classes.FirstImageWrapper}></div>:null
        const background =window.innerWidth>=500?{ 
            backgroundImage:'url('+HomePage+'),url('+Background+')',backgroundRepeat:'no-repeat',backgroundSize:'contain,cover',backgroundPosition:'80% 40%,0% 40%'}:null
    console.log(props);
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
                    <p style={{margin:'4px auto 4px'}}> Please take few minutes to complete the survey. Your few minutes will help us to synthesize a city traffic model. Personal information and location are neither asked nor tracked.</p>
                    {(props.collegeURL.includes("demo") || props.collegeURL==="None" || props.collegeURL==="home") ? 
                    <div>
                        <p>Please <a href="mailto:amitfce@iitr.ac.in?subject=Request to set up a household trip diary survey"> contact us</a> to set up a survey or take a demo survey. </p>
                    </div> 
                    : 
                    <div>
                       <p > This survey link is exclusive for <span style={ {fontWeight:'bold',textDecorationLine:'underline'}}> {props.collegeName}</span>. </p>
                    </div>
                    }
                    {/* TODO: following is a repetition, should be merged with above.*/}
                    {(props.collegeURL.includes("demo") || props.collegeURL==="None" || props.collegeURL==="home") ? 

                    <div className={classes.StartSurveyButtonContainer} >
                        <button  className={buttonClasses.join(' ')}
                            style={{fontWeight:'600', fontSize:'18px', textTransform:'none'}} onClick={props.submitClicked}> Take the demo survey </button> 
                    </div>
                    :
                    <div className={classes.StartSurveyButtonContainer} >
                        <button  className={buttonClasses.join(' ')}
                            style={{fontWeight:'600', fontSize:'18px', textTransform:'none'}} onClick={props.submitClicked}> Take the survey </button> 
                    </div>
                    }
                    </div>
                    
                <div className={classes.RightContainer}> </div>
            </div>
        </div>
    )
}
export default startSurveySub