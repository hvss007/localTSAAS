import React, { Component } from 'react';
import classes from './ContactUs.css';
class ContactUs extends Component{
    // constructor(props) {
    //     super(props);
    //     // this.platform = null;
    //     // this.map = null;
    //     // this.state = {
    //     //     app_id: 'wvzQzqmPlU1T9tjf0YLU',
    //     //     app_code: 'b_is4SmSRfh8e0-Mr2-low',
    //     //     center: {
    //     //         lat: "29.86291",
    //     //         lng:"77.89879",
    //     //     },
    //     //     lat:"29.8543",
    //     //     lng:"77.8880",
    //     //     zoom: "16",
    //     //     theme:"normal.day",
    //     //     showFrontDrop:false,
    //     //     backdropShow:false,
    //     //     count:0
    //     // }
    // }
    // componentDidMount() {
    //     this.platform = new window.H.service.Platform(this.state);
    //     this.layer = this.platform.createDefaultLayers();
    //     this.container = document.getElementById('civilmap');
    //     this.map = new window.H.Map(this.container, this.layer.normal.map, {
    //         center: this.state.center,
    //         zoom: this.state.zoom,
    //       })
    //       this.group = new window.H.map.Group();
    //     var events = new window.H.mapevents.MapEvents(this.map);
    //     // eslint-disable-next-line
    //     this. behavior = new window.H.mapevents.Behavior(events);
    //     // eslint-disable-next-line
    //     var ui = new window.H.ui.UI.createDefault(this.map,this.layer)
    //     //this.addMarkersToMap(this.map,behavior);
    //     //this.req(this.behavior);
    //     this.map.addObject(this.group);
    //     this.addMarkersToMap(this.state.center,this.behavior);     
    // }
    // addMarkersToMap=(position,behavior)=>{
    //     // if(this.props.initLat!==null&&this.props.initLng!==null)
    //     // {
    //     //   var placeMarker=new window.H.map.Marker({lat:this.props.initLat, lng:this.props.initLng})
    //     //   this.group.addObject(placeMarker);
    //     // }
    //     // else{
    //     var placeMarker=new window.H.map.Marker({lat:position.lat, lng:position.lng})
    //     placeMarker.draggable=true;
    //     let map=this.map;
    //     //let behavior=this.behavior;
    //     //map.removeObject(this.group);        
    //     this.group.addObject(placeMarker);
        
    //     // this.dragEventHandler(map,behavior);
    //     // }
        
    // }
    render(){
        return(
            <div className={classes.ContactUs}>
                <div className={classes.Heading}><h1>Contact Us</h1></div>
                <div className={classes.ContactMain}>
                <div className={classes.ContactLeftMain}>
                    <h2>Office Location</h2>
                    <div className={classes.GoogleMapResponsive}>
                    <iframe title="IITR" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.051595087141!2d77.89629045133779!3d29.86278583399619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb36f2388a651%3A0x7f4055c136ddbd53!2sDepartment+of+Civil+Engineering!5e0!3m2!1sen!2sin!4v1551327440327" width="400" height="300" frameborder="0" style={{border:"0"}} allowfullscreen></iframe>
                </div>  
                </div>
                <div className={classes.ContactRightMain}>
                    <h3>
                    <p>Dr. Amit Agarwal</p>
                    <p>Assistant Professor</p>
                    <p>Transportation Engineering Group</p>
                    <p>Department of Civil Engineering</p>
                    <p>IIT Roorkee</p>
                    <p>Roorkee, India-247667</p>
                    <p>Phone: +91-1332-285441</p>
                    <p><a href="mailto:amitfce@iitr.ac.in">amitfce@iitr.ac.in</a></p>
                    <p><a href="http://faculty.iitr.ac.in/~amitfce/">http://faculty.iitr.ac.in/~amitfce/</a></p>
                    <p><a href="https://civil.iitr.ac.in/CE?Uid=amitfce">https://civil.iitr.ac.in/CE?Uid=amitfce</a></p>
                    </h3>
                </div>
                </div>
                
            </div>
        )
    }
}
export default ContactUs;