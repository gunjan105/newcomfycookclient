import React, { Component } from 'react';
import Axios from 'axios'
import config from 'react-global-configuration'
import {Redirect} from 'react-router-dom'

import FormTitle from '../functionComponents/FormTitle';
import Details from '../functionComponents/RegisterComponents/Details';
import Address from '../functionComponents/RegisterComponents/Address';
import Cred from '../functionComponents/RegisterComponents/Cred';
import AlertMsg from '../functionComponents/AlertMsg';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {username: null, password: null, name: null,mobile1: null,mobile2: null,email: null,dob: null,street: null,area: null,pincode: null,city: null,state: null,country: null,website: null,youtube: null,user: null, detailsComponent: true, addressComponent: false, credComponent: false, redirectLogin: false, msg: null, userAuthenticate: false}
    }
    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState({userAuthenticate: true})
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    detailsSubmited = () => {
        this.setState({detailsComponent: false, addressComponent: true})
    }
    addressSubmited = () => {        
        this.setState({addressComponent: false, credComponent: true})
    }
    registerUser = () => {
        this.setState({
            user: {
                cred: {
                    username: this.state.username,
                    password: this.state.password
                },
                details: {
                    name: this.state.name,
                    contact: {
                         mobile1: this.state.mobile1,
                         mobile2: this.state.mobile2,
                         email: this.state.email
                    },
                    dob: this.state.dob,
                    age: null,
                     address: {
                         street: this.state.street,
                         area: this.state.area,
                         pincode: this.state.pincode,
                         city: this.state.city,
                         state: this.state.state,
                         country: this.state.country
                     }
                },
                urls: {
                    website: this.state.website,
                    youtube: this.state.youtube
                }
            }
        })
        Axios.post(config.get('server_path')+'/auth/register', this.state.user)
            .then(res => {
                if (res.data.success) {
                    this.setState({redirectLogin: true})
                } else {
                    this.setState({msg: res.data.msg})
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return(
            <React.Fragment>
                {this.state.msg !== null ? (<AlertMsg color="danger" msg={this.state.msg} />) : (null)}
                <FormTitle title="Register User" />
                {this.state.detailsComponent ? 
                    (<Details onChange={this.onChange} detailsSubmited={this.detailsSubmited}/>)
                    :
                    (
                        <div>
                            {this.state.addressComponent ? 
                                (<Address onChange={this.onChange} addressSubmited={this.addressSubmited} />)
                                :
                                (
                                    <div>
                                        {this.state.credComponent ? 
                                            (<Cred onChange={this.onChange} registerUser={this.registerUser} />)
                                            :
                                            (null)
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }                
                {this.state.redirectLogin ? 
                    (<Redirect to="/login" />)
                    :
                    (null)
                }
                {this.authenticationRedirect()}
            </React.Fragment>
        )
    }
    authenticationRedirect() {
        return <div>{this.state.userAuthenticate ? (<Redirect to="/user/timeline" />) : (null)}</div>;
    }
}

export default Register