import React, { Component } from 'react';
import classes from './ContactUs.css';
class ContactUs extends Component{
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