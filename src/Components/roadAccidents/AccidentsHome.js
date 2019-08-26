import React from 'react';
import Toolbar from '../StartSuvey/Navigation/Toolbar/Toolbar';
import SideDrawer from '../StartSuvey/SideDrawer/SideDrawer';
import classes from '../StartSuvey/StartSurvey.css';
import MobileHomePage from '../../assets/icons/rdac-mobile.png'
import HomePage from '../../assets/icons/accidentHome.png';
import Background from '../../assets/icons/homebackground.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';
import Axios from 'axios'
import HostName from '../../assets/globalvaribles/GlobalVariables'
// import Cards from './MainHomeCards'

const RAHome=(props)=>{
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
                    <p style={{margin:'4px auto 4px'}}> 
                        {/* Please take few minutes to complete the road accident record. Your few minutes will help us to get information to improve the black spot and prevent further accidents. Personal information and location are neither asked nor tracked. */}
                        We are working on an survey form to enter the information of a road accidents. 
                        </p>
                    {/* {(props.collegeName==="demo" || props.collegeName==="None" || props.collegeName==="home") ? 
                    <div>
                        <p>Please <a href="mailto:amitfce@iitr.ac.in?subject:Request to set up a road accident recorder"> contact us</a> to set up a survey or take a demo survey. </p>
                    </div> 
                    : 
                    <div>
                       <p > This survey link is exclusive for <span style={ {fontWeight:'bold',textDecorationLine:'underline'}}> {this.props.collegeName}</span>. </p>
                    </div>
                    }
                    {/* TODO: following is a repetition, should be merged with above.*/}
                    {/* {(props.collegeName==="demo" || props.collegeName==="None" || props.collegeName==="home") ? 

                    <div className={classes.StartSurveyButtonContainer} >
                        <button  className={buttonClasses.join(' ')}
                            style={{fontWeight:'600', fontSize:'18px', textTransform:'none'}} onClick={this.props.submitClicked}> Take the demo survey </button> 
                    </div>
                    :
                    null
                    }  */} 
                     <div className={classes.StartSurveyButtonContainer} >
                        <button  className={buttonClasses.join(' ')}
                            style={{fontWeight:'600', fontSize:'18px', textTransform:'none'}} onClick={this.submitClickedHandler}> Launching soon ... </button> 
                    </div>
                    </div>
                    
                <div className={classes.RightContainer}> </div>
            </div>
                    
        </div>
    )}

export default RAHome
