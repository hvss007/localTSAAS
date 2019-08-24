import React,{Component} from 'react';
// import Toolbar from './Navigation/Toolbar/Toolbar';
// import SideDrawer from './SideDrawer/SideDrawer';
import classes from '../StartSuvey/StartSurvey.css';
import MobileHomePage from '../../assets/icons/mobile.png'
import HomePage from '../../assets/icons/homepage.png';
import Background from '../../assets/icons/homebackground.png';
import TsaasLogo from '../../assets/icons/tsaaslogo.png';
import Axios from 'axios'
import HostName from '../../assets/globalvaribles/GlobalVariables'
import Cards from './MainHomeCards'


class StartSurveySub extends Component{
    constructor(props){
        super(props)
        this.state={
            surveyType:[

            ]
        }
    }
    
    submitClickedHandler=()=>{
        this.props.history.push({pathname:"/hhs"})
        // Axios.defaults.xsrfCookieName = 'csrftoken'
        // Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        // Axios.post(HostName+"survey/",{surveyType:'hhs'}).then(response=>{
        //     const surveyID=response.data.surveyID
            
        //     this.props.history.push({pathname:"/hhs"+surveyID})
        // })
        // .catch(e=>console.log("network not connected",e))
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
    render(){
        const cards=this.state.surveyType.map(item=>{
            return <Cards clicked={this.onClickHandler} key={item.index} name={item.surveyFormat} url={item.surveyURL} ></Cards>
        })
    const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
        const mobileBackgroundStyle={background:'url('+MobileHomePage+')',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'45% 0%'}
        const backgroundElement =window.innerWidth<=500? <div style={{...mobileBackgroundStyle}} className={classes.FirstImageWrapper}></div>:null
        const background =window.innerWidth>=500?{ 
            backgroundImage:'url('+HomePage+'),url('+Background+')',backgroundRepeat:'no-repeat',backgroundSize:'contain,cover',backgroundPosition:'80% 40%,0% 40%'}:null
    return(
        <div style={background} className={classes.StartSurvey} >
        {/* <SideDrawer open={this.props.showSideDrawer} closed={this.props.SideDrawerClosedHandler}></SideDrawer> */}
        {/* <Toolbar drawerToggleClicked={this.props.SideDrawerToggleHandler} ></Toolbar> */}
            
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
                    {/* <p style={{margin:'4px auto 4px'}}> Welcome to TSaaS! Please take few minutes to complete the survey. Your few minutes will help us to synthesize a city traffic model. Personal information and location are neither asked nor tracked.</p>
                    {(this.props.collegeName==="demo" || this.props.collegeName==="None" || this.props.collegeName==="home") ? 
                    <div>
                        <p>Please <a href="mailto:amitfce@iitr.ac.in"> contact us</a> to set up a survey or take a demo survey. </p>
                    </div> 
                    : 
                    <div>
                       <p > This survey link is exclusive for <span style={ {fontWeight:'bold',textDecorationLine:'underline'}}> {this.props.collegeName}</span>. </p>
                    </div>
                    }
                    {/* TODO: following is a repetition, should be merged with above.*/}
                    {/* {(this.props.collegeName==="demo" || this.props.collegeName==="None" || this.props.collegeName==="home") ? 

                    <div className={classes.StartSurveyButtonContainer} >
                        <button  className={buttonClasses.join(' ')}
                            style={{fontWeight:'600', fontSize:'18px', textTransform:'none'}} onClick={this.props.submitClicked}> Take the demo survey </button> 
                    </div>
                    :
                   
                    }  */}
                     <div className={classes.StartSurveyButtonContainer} >
                        <button  className={buttonClasses.join(' ')}
                            style={{fontWeight:'600', fontSize:'18px', textTransform:'none'}} onClick={this.submitClickedHandler}> Take the survey </button> 
                    </div>
                                        </div>
                    
                <div className={classes.RightContainer}> </div>
            </div>
                    {cards}
        </div>
    )}
}
export default StartSurveySub