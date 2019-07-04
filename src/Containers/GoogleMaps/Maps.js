import React, { Component } from 'react';
import Axios from 'axios';
import { RESOURCE } from 'webpack/lib/ModuleFilenameHelpers';

export default class Maps extends Component{
    state={}
componentDidMount(){
    Axios.get('http://autocomplete.geocoder.cit.api.here.com/6.2/suggest.json?query=Berli&app_id={wvzQzqmPlU1T9tjf0YLU}&app_code={b_is4SmSRfh8e0-Mr2-low}')
    .then(Response=>{
        console.log(Response)
    })
}
render(){
    return null
}


}
