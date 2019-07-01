import React,{Component} from 'react';
import classes from './FinishSurvey.css'

import Toolbar from '../StartSurvey/Navigation/Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import classes from '../StartSuvey/StartSurvey.css';
import MobileHomePage from '../../assets/icons/mobile.png'
import HomePage from '../../assets/icons/homepage.png';
import Background from '../../assets/icons/homebackground.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';

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

    const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
        const backgroundElement =window.innerWidth<=500? <div style={{background:'url('+MobileHomePage+')',marginBottom:'50px',backgroundRepeat:'no-repeat',backgroundSize:'cover'}} className={classes.FirstImageWrapper}></div>:null
        console.log(window.innerWidth);
        const background =window.innerWidth>=500?{ 
            backgroundImage:'url('+HomePage+')'+','+'url('+Background+')',backgroundRepeat:'no-repeat',backgroundSize:'cover,cover',backgroundPosition:'0% 40%,0% 40%'}:null
    
    return(
        <div style={background} className={classes.StartSurvey}>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
        <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} ></Toolbar>
            
            <div  className={classes.MainContainer}>
                <div className={classes.LeftContainer}>
                    {backgroundElement}
                    <div className={classes.ImgTextWrapper}>
                        <img src={TsaasLogo}></img>
                        <div className={classes.LogoText}>
                            <p>Traffic Survey</p>
                            <p>as a Service</p>
                        </div> 
            			<div className={classes.Main}>
            				<h1>Thanks for filling the survey</h1>
        				</div>               
                    </div>           
            </div>
        </div>
        </div>
    )
	}
}

export default FinishSurvey;
