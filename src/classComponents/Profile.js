import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import ProfileCard from '../functionComponents/ProfileComponents/ProfileCard'
import Axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            userAuthenticate: true,
            editClicked: false,
            favClicked: false
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('user')) {
            this.setState({userAuthenticate: false})
        }
        Axios.get(config.get('server_path')+'/user/'+decode(localStorage.getItem('user')).id)
            .then(res => {
                if (res.data.success) {
                    this.setState({user: res.data.user})
                    console.log(res.data.user)   
                }
            })
            .catch(err => console.log(err))
    }
    editClicked = () => {
        this.setState({editClicked: true})
    }
    favClicked = () => {
        this.setState({favClicked: true})
    }
    render() {
        return(
            <React.Fragment>
                <div className="container">
                    {this.state.user ? (<ProfileCard user={this.state.user} editClicked={this.editClicked} favClicked={this.favClicked} />) : (null)}
                </div>           
                {this.authenticationRedirect()} 
                {this.otherRedirects()}
            </React.Fragment>
        )
    }
    authenticationRedirect() {
        return <div>{this.state.userAuthenticate ? (null) : (<Redirect to="/" />)}</div>;
    }
    otherRedirects() {
        return <div>{this.state.editClicked ? (<Redirect to="/user/edit/profile" />) : (null)}
            {this.state.favClicked ? (<Redirect to="/user/favourites" />) : (null)}
        </div>
    }
}

export default Profile