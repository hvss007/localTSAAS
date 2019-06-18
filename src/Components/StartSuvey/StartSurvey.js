import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './StartSurvey.css';
import Axios from 'axios';
class StartSurvey extends Component{
    
    onClickHandler=()=>{
       
            Axios.get("http://127.0.0.1:8000/api/family/")
            .then(response=>{
                
                console.log(response.data);
               this.props.history.push({pathname:this.props.match.url+response.data.familyID+'/member'})
            })
       
    }

    render(){
        const buttonClasses=[classes.StartSurveyButton,classes.StartSurveyButtonBorder]
    return(
        <div  className={classes.StartSurvey}>
            <button className={buttonClasses.join(' ')}
            //to={{
             //   pathname:this.props.match.url+'/member'
            //}}
             style={{margin:'auto'}} onClick={this.onClickHandler}> Start Survey</button>
        </div>
    )}
}
export default StartSurvey;