import React, { Component } from 'react';
import AppNav from './AppNav';
import image from './images/Money-counting-machine.gif';
class Home extends Component {
    state = {  }
    render() { 
        return (<div style={{alignItems: 'center'}}>
            <AppNav/>
            <div className="center"><div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={image}/></div>
        <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px'}}>
            Welcome to expense tracker</h2></div>
            
        </div>);
    }
}
 
export default Home;