import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Register from '../classComponents/Register';
import Login from '../classComponents/Login';
import Home from '../classComponents/Home';
import Timeline from '../classComponents/Timeline'
import Logout from '../classComponents/Logout';
import Profile from '../classComponents/Profile';
import EditProfile from '../classComponents/EditProfile'
import MyRecipes from '../classComponents/MyRecipes'
import AddRecipe from '../classComponents/AddRecipe'

const MyRoutes = () => {
    return(
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={Register} />             
                <Route path="/login" exact component={Login} />
                <Route path="/user/timeline" exact component={Timeline} />         
                <Route path="/user/profile" exact component={Profile} />
                <Route path="/user/my-recipe" exact component={MyRecipes} />
                <Route path="/user/add-recipe" exact component={AddRecipe} />
                <Route path="/user/edit/profile" exact component={EditProfile} />         
                <Route path="/logout" exact component={Logout} />         
            </Switch>
        </React.Fragment>
    )
}

export default MyRoutes