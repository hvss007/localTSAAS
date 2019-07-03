import React, { Component } from 'react';
import Axios from 'axios';
import { RESOURCE } from 'webpack/lib/ModuleFilenameHelpers';

export default class Maps extends Component{
    state={}
componentDidMount(){
   
    Axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&key="+process.env.REACT_APP_PLACES_API_KEY)
    .then(Response=>{
        console.log(Response)
    })
}
render(){
    return null
}


}
