import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './StartSurvey.css';
// import Axios from 'axios';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
// import Jaipur from '../../assets/icons/matsimjaipur.png';
//import Matsim from '../../assets/icons/matsim.gif';
import HomePage from '../../assets/icons/homepage.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';
class StartSurvey extends Component{
    state={
        showSideDrawer:false
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
            // Axios.get("http://127.0.0.1:8000/api/family/")
            // .then(response=>{
            //     console.log(response.data);
            //    this.props.history.push({pathname:this.props.match.url+response.data.familyID+'/member'})
            // })
            this.props.history.push({pathname:this.props.match.url+"/family"})
    }
    render(){
        const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
    return(
        <div style={{ background:'rgb(255,255,255)'+ 'url('+HomePage+')',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'0% 40%'}} className={classes.StartSurvey} >
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
        <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} ></Toolbar>
            <div  className={classes.MainContainer}>
                <div className={classes.LeftContainer}>
                    <div className={classes.ImgTextWrapper}>
                        <img src={TsaasLogo}></img>
                        <div className={classes.LogoText}>
                            <p>Traffic Survey</p>
                            <p>As A Service</p>
                        </div>    
                    </div>
                    <div><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> </div>
                    <div><button  className={buttonClasses.join(' ')}
            //to={{
             //   pathname:this.props.match.url+'/member'
            //}}
             style={{margin:'auto',fontWeight:'600', fontSize:'18px'}} onClick={this.onClickHandler}> Take a Survey</button> </div>
                </div>
                <div className={classes.RightContainer}>
                    {/* <img src={Matsim}>
                    </img> */}
                </div>
            </div>
        </div>
    )}
}
export default StartSurvey;