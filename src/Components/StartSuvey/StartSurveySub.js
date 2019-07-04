import React from 'react';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import classes from './StartSurvey.css';
import MobileHomePage from '../../assets/icons/mobile.png'
import HomePage from '../../assets/icons/homepage.png';
import Background from '../../assets/icons/homebackground.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';

const startSurveySub=(props)=>{
    const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
        const backgroundElement =window.innerWidth<=500? <div style={{background:'url('+MobileHomePage+')',marginBottom:'50px',backgroundRepeat:'no-repeat',backgroundSize:'cover'}} className={classes.FirstImageWrapper}></div>:null
        const background =window.innerWidth>=500?{ 
            backgroundImage:'url('+HomePage+')'+','+'url('+Background+')',backgroundRepeat:'no-repeat',backgroundSize:'cover,cover',backgroundPosition:'0% 40%,0% 40%'}:null
    return(
        <div style={background} className={classes.StartSurvey} >
        <SideDrawer open={props.showSideDrawer} closed={props.SideDrawerClosedHandler}></SideDrawer>
        <Toolbar drawerToggleClicked={props.SideDrawerToggleHandler} ></Toolbar>
            
            <div  className={classes.MainContainer}>
                <div className={classes.LeftContainer}>
                    {backgroundElement}
                    <div className={classes.ImgTextWrapper}>
                        <img src={TsaasLogo}></img>
                        <div className={classes.LogoText}>
                            <p>Traffic Survey</p>
                            <p>as a Service</p>
                        </div>    
                    </div>
                    {window.innerWidth>=500? 
                        <div>
                        <p>
                        Welcome to TSaaS! Please take few minutes to complete the survey. Personal information and location are neither asked nor tracked. Your few minutes will help us to synthesize a city traffic model.
                        </p>
                        <p>
                            {(props.collegeName==="home"||props.collegeName==="None")? "" 
                            :"This survey link is exclusive for students of "+props.collegeName+"."}
                        </p> </div> :
                    <div>
                    <p>
                    Welcome to TSaaS! Please take few minutes to complete the survey. Personal information and location are neither asked nor tracked. Your few minutes will help us to synthesize a city traffic model.
                    </p>
                    <p style={{margin:'auto'}}>
                        {(props.collegeName==="home"||props.collegeName==="None")?null:"This survey link is exclusive for students of "+props.collegeName}
                    </p> </div>
                    }
                    <div style={{marginTop:'5px'}}><button  className={buttonClasses.join(' ')}
            //to={{
             //   pathname:this.props.match.url+'/member'
            //}}
             style={{margin:'auto',fontWeight:'600', fontSize:'18px'}} onClick={props.submitClicked}> Take The Survey </button> </div>
                </div>
                <div className={classes.RightContainer}>
                    {/* <img src={Matsim}>
                    </img> */}
                </div>
            </div>
        </div>
    )
}
export default startSurveySub