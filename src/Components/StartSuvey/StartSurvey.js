import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
class StartSurvey extends Component{
    
    onClickHandler=()=>{
        const data={};
        Axios.post("https://jsonplaceholder.typicode.com/posts",data)
        .then(response=>{
            Axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response=>{
                console.log(response)
            })
        } )
    }

    render(){
    return(
        <div  style={{width:'100%',height:'100vh', display:'flex'}}>
            <Link to="/member" style={{margin:'auto'}} onClick={this.onClickHandler}> Start Survey</Link>
        </div>
    )}
}
export default StartSurvey;