import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation/ NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackdropNew from '../../../Hoc/Backdrop/BackdropNew';
import Aux from '../../../Hoc/Aux';
const sideDrawer=(props)=>{
    let  attachedClasses=[classes.SideDrawer,classes.Close]
     if(props.open){
         attachedClasses=[classes.SideDrawer,classes.Open]
     }   
    return(
        <Aux>
            <BackdropNew show={props.open} clicked={props.closed}></BackdropNew>
            <div className={attachedClasses.join(' ')}>
                <Logo height="8%" fontSize='16px'/>
                <nav style={{boxSizing:'border-box',paddingLeft:'28px'}}>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}
export default sideDrawer;