import React, { Component } from 'react';
import classes from './ContactUs.css';
class ContactUs extends Component{
    constructor(props) {
        super(props);
        this.platform = null;
        this.map = null;
        this.state = {
            app_id: 'wvzQzqmPlU1T9tjf0YLU',
            app_code: 'b_is4SmSRfh8e0-Mr2-low',
            center: {
                lat: "29.8543",
                lng:"77.8880",
            },
            lat:"29.8543",
            lng:"77.8880",
            zoom: "16",
            theme:"normal.day",
            showFrontDrop:false,
            backdropShow:false,
            count:0
        }
    }
    componentDidMount() {
        this.platform = new window.H.service.Platform(this.state);
        this.layer = this.platform.createDefaultLayers();
        this.container = document.getElementById('civilmap');
        this.map = new window.H.Map(this.container, this.layer.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
          })
          this.group = new window.H.map.Group();
        var events = new window.H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        this. behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        var ui = new window.H.ui.UI.createDefault(this.map,this.layer)
        //this.addMarkersToMap(this.map,behavior);
        //this.req(this.behavior);
        this.map.addObject(this.group);
        this.addMarkersToMap(this.state.center,this.behavior);     
    }
    addMarkersToMap=(position,behavior)=>{
        // if(this.props.initLat!==null&&this.props.initLng!==null)
        // {
        //   var placeMarker=new window.H.map.Marker({lat:this.props.initLat, lng:this.props.initLng})
        //   this.group.addObject(placeMarker);
        // }
        // else{
        var placeMarker=new window.H.map.Marker({lat:position.lat, lng:position.lng})
        placeMarker.draggable=true;
        let map=this.map;
        //let behavior=this.behavior;
        //map.removeObject(this.group);        
        this.group.addObject(placeMarker);
        
        // this.dragEventHandler(map,behavior);
        // }
        
    }
    render(){
        return(
            <div className={classes.ContactUs}>
                <div className={classes.Heading}><h1>Contact Us</h1></div>
                <div className={classes.ContactMain}>
                <div className={classes.ContactLeftMain}>
                    <h2>Office Location</h2>
                    <div style={window.width>500?{width:'400px', height:'400px'}:{width:'100%', height:'400px'}} id="civilmap"></div>
                </div>
                <div className={classes.ContactRightMain}>
                    <p>Dr. Amit Agarwal</p>
                    <p>Assistant Profesor</p>
                    <p>Transportation Engineering Group</p>
                    <p>Department of Civil Engineering</p>
                    <p>IIT Roorkee</p>
                    <p>Roorkee, India-247667</p>
                    <p>Phone: +91-1332-285441</p>
                    <p>amitfce@iitr.ac.in</p>
                    <a href="http://faculty.iitr.ac.in/~amitfce/">http://faculty.iitr.ac.in/~amitfce/</a>
                    <a href="https://www.iitr.ac.in/~CE/amitfce">https://www.iitr.ac.in/~CE/amitfce</a>
                </div>
                </div>
                
            </div>
        )
    }
}
export default ContactUs;