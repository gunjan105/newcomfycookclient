import React, { Component } from 'react';
import FormTitle from '../functionComponents/FormTitle';
import { Form, Button } from 'reactstrap';
import FormInput from '../functionComponents/FormInput';
import Axios from 'axios';
import config from 'react-global-configuration'
import {Redirect} from 'react-router-dom'
import PreLoader from '../functionComponents/PreLoader';
import AlertMsg from '../functionComponents/AlertMsg';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            msg: null,
            userAuthenticate: false,
            success: false
        }
    }
    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState({userAuthenticate: true})
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    login = () => {
        var data = {
            cred: {
                username: this.state.username,
                password: this.state.password
            }
        }
        Axios.post(config.get('server_path')+'/auth/login', data)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('user', res.data.token)
                    this.setState({msg: res.data.msg, success: res.data.success})
                } else {
                    this.setState({msg: res.data.msg, success: res.data.success})
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return(
            <React.Fragment>
                <FormTitle title="Login User" />
                {this.state.msg ? (<AlertMsg color="danger" msg={this.state.msg} />) : (null)}
                <Form className="container">
                    <FormInput type="text" name="username" id="username" placeholder="Enter your username here" label="Username" onChange={this.onChange} />
                    <FormInput type="password" name="password" id="password" placeholder="Enter your password here" label="Password" onChange={this.onChange} />
                    <Button onClick={this.login}>Login</Button>
                </Form>
                {this.state.success ? (<PreLoader link='/user/timeline' imgLink="https://loading.io/icon/nfchj0" />) : (this.componentDidMount)}
                {this.authenticationRedirect()}
            </React.Fragment>
        )
    }
    authenticationRedirect() {
        return <div>{this.state.userAuthenticate ? (<Redirect to="/user/timeline" />) : (null)}</div>;
    }
}

export default Login