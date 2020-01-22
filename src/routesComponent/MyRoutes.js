import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Register from '../classComponents/Register';
import Login from '../classComponents/Login';
import Home from '../classComponents/Home';
import Timeline from '../classComponents/Timeline'
import Logout from '../classComponents/Logout';

const MyRoutes = () => {
    return(
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={Register} />             
                <Route path="/login" exact component={Login} />
                <Route path="/user/timeline" exact component={Timeline} />         
                <Route path="/logout" exact component={Logout} />         
            </Switch>
        </React.Fragment>
    )
}

export default MyRoutes