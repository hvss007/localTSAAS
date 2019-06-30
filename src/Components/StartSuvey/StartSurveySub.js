import React from 'react';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import classes from './StartSurvey.css';
import MobileHomePage from '../../assets/icons/mobile.png'
import HomePage from '../../assets/icons/home1.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';

const startSurveySub=(props)=>{
    const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
        const backgroundElement =window.innerWidth<=500? <div style={{background:'url('+MobileHomePage+')',marginBottom:'50px',backgroundRepeat:'no-repeat',backgroundSize:'cover'}} className={classes.FirstImageWrapper}></div>:null
        console.log(window.innerWidth);
        const background =window.innerWidth>=500?{ background:'rgb(255,255,255)'+ 'url('+HomePage+')',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'0% 40%'}:null
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
                            <p>As A Service</p>
                        </div>    
                    </div>
                    {window.innerWidth>=500? <div>
                        <p>
                            {props.collegeName=="homepage"&&props.collegeName=="IIT Roorkee"?"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.":"Welcome students of "+props.collegeName}
                        </p> </div> :null}
                    <div><button  className={buttonClasses.join(' ')}
            //to={{
             //   pathname:this.props.match.url+'/member'
            //}}
             style={{margin:'auto',fontWeight:'600', fontSize:'18px'}} onClick={props.submitClicked}> Take a Survey</button> </div>
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