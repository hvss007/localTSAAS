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
                    <p> Welcome to TSaaS! Please take few minutes to complete the survey. Your few minutes will help us to synthesize a city traffic model. Personal information and location are neither asked nor tracked.</p>
                    <p> </p>
                    {(props.collegeName==="demo"|| props.collegeName==="None") ? null : 
                    <div>
                       <p > This survey link is exclusive for students / faculties / employees of <span style={ {fontWeight:'bold',textDecorationLine:'underline'}}> {props.collegeName}</span>. </p>
                    </div>
                    }
                    {/* {window.innerWidth>=500? 
                        <div> <p style={{color:'darkblue'}}>
                        { (props.collegeName==="home"|| props.collegeName==="None")? "" :"This survey link is exclusive for students of "+ props.collegeName  +"." } 
                        </p> </div> :
                        <div>
                    <p style={{margin:'auto'}}>
                        {(props.collegeName==="home"|| props.collegeName==="None")?null:"This survey link is exclusive for students of "+props.collegeName}
                    </p> </div>
                    } */ }
                    <div style={{marginTop:'5px'}}><button  className={buttonClasses.join(' ')}
            //to={{
             //   pathname:this.props.match.url+'/member'
            //}}
             style={{margin:'auto',fontWeight:'600', fontSize:'18px'}} onClick={props.submitClicked}> Take the survey </button> </div>
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