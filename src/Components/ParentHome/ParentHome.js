import React,{Component} from 'react';
import Toolbar from '../StartSuvey/Navigation/Toolbar/Toolbar';
import SideDrawer from '../StartSuvey/SideDrawer/SideDrawer';
import classes from '../StartSuvey/StartSurvey.css';
import styles from './ParentHome.css'
// import MobileHomePage from '../../assets/icons/parentHomeMobile.png'
// import HomePage from '../../assets/icons/parentHome.png';
// import Background from '../../assets/icons/homebackground.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';
import Global from '../../assets/globalvaribles/GlobalVariables'
import Cards from './ParentHomeCards'
import Axios from 'axios'
import HHS from '../../assets/icons/hhs-mobile.png'
import PTS from '../../assets/icons/pts-mobile.png'
import RDAC from '../../assets/icons/rdac-mobile.png'
import ACCESS from '../../assets/icons/access-mobile.png'

var HostName=Global.hostName
export default class ParentHome extends Component{
    constructor(props){
        super(props)
        this.state={
            surveyType:[

            ],
            showSideDrawer:false
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

    onClickHandler=(url)=>{
        this.props.history.push({pathname:"/"+url})
    }
    componentWillMount(){
        Axios.defaults.xsrfCookieName = 'csrftoken'
        Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        Axios.get(HostName+"surveyType").then(response=>{
            
            this.setState({surveyType:[...response.data]})
        })
        .catch(e=>console.log("network not connected",e))
    }
    
    render()
    
    {   
        const imgArray=[HHS,PTS,ACCESS,RDAC]
        const cards=this.state.surveyType.map((item,index)=>{
        return <Cards src={imgArray[item.surveyTypeID-1]} clicked={this.onClickHandler} key={index} name={item.surveyFormat} url={item.surveyURL} ></Cards>
    })
    return(
        <div  className={classes.StartSurvey} >
            
         <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
        <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} ></Toolbar>
             
            <div  className={classes.MainContainer}>
                <div className={classes.LeftContainer}>
                    {/* {backgroundElement} */}
                    <div className={classes.ImgTextWrapper}>
                        <img alt={"TSaaS"} src={TsaasLogo}></img>
                        <div className={classes.LogoText}>
                            <p className={classes.TsaasLogoTextHeading}>Travel Survey</p>
                            <p className={classes.TsaasLogoTextHeading}>as a Service</p>
                        </div>    
                    </div>
                    <p style={{fontSize:'20px',margin:'10px 0'}}> Welcome to TSaaS! Please select a survey from the following list which will take you to the survey page.</p>
                    <p style={{fontSize:'18px'}}> If the desired survey is not available, you can request a survey <a href="mailto:amitfce@iitr.ac.in?subject=Request for a new survey"> here</a>.</p> 
                    </div>
                    
                <div className={styles.RightContainer}>{cards} </div>
            </div>
        </div>
    )}
}
