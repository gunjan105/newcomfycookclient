import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userAuthenticate: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState({userAuthenticate: true})
        }
    }

    render() {
        return(
            <React.Fragment>
                home
                {this.authenticationRedirect()}
            </React.Fragment>
        )
    }

    authenticationRedirect() {
        return <div>{this.state.userAuthenticate ? (<Redirect to="/user/timeline" />) : (null)}</div>;
    }
}

export default Home