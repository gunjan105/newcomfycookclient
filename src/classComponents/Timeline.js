import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class Timeline extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userAuthenticate: true
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('user')) {
            this.setState({userAuthenticate: false})
        }
    }
    render() {
        return(
            <React.Fragment>
                <h1>Timeline</h1>
                {this.authenticationRedirect()}
            </React.Fragment>
        )
    }
    authenticationRedirect() {
        return <div>{this.state.userAuthenticate ? (null) : (<Redirect to="/" />)}</div>;
    }
}

export default Timeline