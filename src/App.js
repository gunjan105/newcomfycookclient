import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'
import MyRoutes from './routesComponent/MyRoutes';
import UserNavbar from './functionComponents/UserNavbar';
import GeneralNavbar from './functionComponents/GeneralNavbar';

class App extends Component { 
  state = {
    userNavbar: null,
    generalNavbar: null
  }
  checkForNavbarActivation = () => {
    if (localStorage.getItem('user')) {
      this.setState({userNavbar: true, generalNavbar: false})
    } else {
      this.setState({userNavbar: false, generalNavbar: true})
    }
  }
  componentDidMount() {
    this.checkForNavbarActivation()
  }
  render() { 
    return (
      <Router>    
      <div>
        {this.state.userNavbar ? 
          (<UserNavbar />)
          :
          (<GeneralNavbar />)
        }
        <MyRoutes />
      this site has been hacked
      
      
      @Copyright Palak Pujara
      </div>
      </Router>
    );
  }  
}
 
export default App;
