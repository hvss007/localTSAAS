import React,{Component} from 'react';
// import classes from './FinishSurvey.css'
import SubmitButton from '../Members/Member/MemberSubmitButton';
import Toolbar from '../StartSuvey/Navigation/Toolbar/Toolbar';
import SideDrawer from '../StartSuvey/SideDrawer/SideDrawer';
import classes from '../StartSuvey/StartSurvey.css';
import MobileHomePage from '../../assets/icons/mobile.png'
// import HomePage from '../../assets/icons/homepage.png';
import Background from '../../assets/icons/thanksbackground.png';
import axios from 'axios';
import HostName from '../../assets/globalvaribles/GlobalVariables';
import {withRouter} from 'react-router-dom';
import Input from '../Input/Input';
// import TsaasLogo from '../../assets/icons/tsaaslogo.png';
class FinishSurvey extends Component{
    constructor(props){
        super(props);
        this.state={
            feedback:{
                elementType:'input',
                name:'feedback',
                label: 'Feedback',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your feedback here...'
                },
                value:'',
                optional:true,
            },
        }
    }

    state={
        showSideDrawer:false,
        displayComponent:false,
    }
    componentDidMount(){
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });  
    }
	
 	SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    SideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:!prevState.showSideDrawer}
        })
    }

    submitButtonHandler=(event)=>{
        event.preventDefault();
            // const family=this.state.family;
            // const family1=this.state.family1;
                const post={
                    feedback:this.state.feedback,
                }
                axios.post(HostName+"feedback/",post)
                    .then((Response)=>{
                        //console.log(Response);
                        this.props.history.push({pathname:this.props.match.url+Response.data.familyID+'/member'})
                    })
                    .catch(err => 
                        console.error(err)
                        );
    }
    render(){
    // const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
    const mobileBackgroundStyle={background:'url('+MobileHomePage+')',backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'45% 0%'}
    const backgroundElement =window.innerWidth<=500? <div style={{...mobileBackgroundStyle}} className={classes.FirstImageWrapper}></div>:null
    const background =window.innerWidth>=500?{ 
        backgroundImage:'url('+Background+')',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'0% 40%'}:null
    
        let thankyouArray=[];
        for (let key in this.state.feedback){
            thankyouArray.push(
                {
                    id:key,
                    config:this.state.feedback[key]
                }
            )
        }
    
        return(
        <div style={background} className={classes.StartSurvey}>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
        <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} ></Toolbar>
            <div  className={classes.MainContainer+' '+classes.MainContainerFinishSurvey}>
                <div className={classes.LeftContainer+" "+ classes.LeftContainerFinishSurvey}>
                    
                    <div className={classes.Thank}>
            				<h3>We <span><b>Thank You</b></span> For taking time to complete the survey.</h3>
        			</div>
                    <div className={classes.MobilePageFinishSurvey}>
                        <img src={MobileHomePage}></img>
                    </div>
                    <div className={classes.Thank}>
            				<h4> To improve the survey database, your feedback is valuable to us. Please feel free to submit your feedback.</h4>
        			</div>
                    <div className={classes.FeedbackWrapper}>
                        <textarea rows="5" style={{width:'100%'}} name="comment" form="usrform">
                            {/* Enter your feedback here... */}
                        </textarea>
                    
                    <form className={classes.CustomForm}>
                    {thankyouArray.map((memFormElement)=>{return(
                memFormElement.config.show?
                <Input 
                    textAlign='center'
                    labelFontWeight='600'
                    style={{textAlignLast:'center'}}
                    key={memFormElement.id}
                    label={memFormElement.config.label}
                    name={memFormElement.config.name}
                    elementType={memFormElement.config.elementType}
                    elementconfig={memFormElement.config.elementConfig}
                    value={memFormElement.config.value}
                    invalid={!memFormElement.config.valid}
                    touched={memFormElement.config.touched}
                    id={memFormElement.id}
                >    
                </Input>:null
            )})}
                    </form>
                    </div>
                    <div>
                        <SubmitButton clicked={this.submitButtonHandler}></SubmitButton>
                    </div>
                </div>
                <div className={classes.RightContainer+' '+ classes.RightContainerFinishSurvey}>
                    <img className={classes.SurveyMonitor} src={MobileHomePage}/> 
                </div>
                
        </div>
        </div>
    )
	}
}

export default withRouter(FinishSurvey)
