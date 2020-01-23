import React, { Component } from 'react';
import {Form, Button} from 'reactstrap'
import Axios from 'axios'
import decode from 'jwt-decode'
import config from 'react-global-configuration'

import FormInput from '../functionComponents/FormInput'
import FormTitle from '../functionComponents/FormTitle'
import { Redirect } from 'react-router-dom';

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            userAuthenticate: true,
            editedRedirect: false
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('user')) {
            this.setState({userAuthenticate: false})
        }
        Axios.get(config.get('server_path')+'/user/'+decode(localStorage.getItem('user')).id)
            .then(res => {
                if (res.data.success) {
                    this.setState({name: res.data.user.details.name, email: res.data.user.details.contact.email, mobile1: res.data.user.details.contact.mobile1, mobile2: res.data.user.details.contact.mobile2, dob: res.data.user.details.dob, street: res.data.user.details.address.street, area: res.data.user.details.address.area, pincode: res.data.user.details.address.pincode, city: res.data.user.details.address.city, state: res.data.user.details.address.state, country: res.data.user.details.address.country, website: res.data.user.urls.website, youtube: res.data.user.urls.youtube})
                    console.log(res.data.user)   
                }
            })
            .catch(err => console.log(err))
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    edit = () => {
        Axios.post(config.get('server_path')+'/user/update/'+decode(localStorage.getItem('user')).id, this.state)
            .then(res => {
                if (res.data.success) {
                    this.setState({editedRedirect: true})
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return(
            <React.Fragment>
                <FormTitle title="Edit Profile" />
                {/* {this.state.msg ? (<AlertMsg color="danger" msg={this.state.msg} />) : (null)} */}
                <Form className="container">
                    <div className="row">
                        <div className="col-6"><FormInput type="text" name="name" id="name" value={this.state.name} onChange={this.onChange} label="Name"/></div>
                        <div className="col-6"><FormInput type="email" name="email" id="email" value={this.state.email} onChange={this.onChange} label="Email" /></div>
                    </div>
                    <div className="row">
                        <div className="col-6"><FormInput type="number" name="mobile1" id="mobile1" value={this.state.mobile1} onChange={this.onChange} label="mobile 1" /></div>
                        <div className="col-6">{this.state.mobile2 ? (<FormInput type="number" name="mobile2" id="mobile2" value={this.state.mobile2} onChange={this.onChange} label="mobile 2" />): (null)}</div>
                    </div>
                    <div className="row">
                        <div className="col-6"><FormInput type="date" name="dob" id="dob" value={this.state.dob} onChange={this.onChange} label="Date of Birth" /></div>
                    </div>
                    <div className="row">
                        <div className="col-4"><FormInput type="text" name="street" id="street" value={this.state.street} onChange={this.onChange} label="Street" /></div>
                        <div className="col-4"><FormInput type="text" name="area" id="area" value={this.state.area} onChange={this.onChange} label="Area" /></div>
                        <div className="col-4"><FormInput type="text" name="pincode" id="pincode" value={this.state.pincode} onChange={this.onChange} label="Pincode" /></div>
                    </div>
                    <div className="row">
                        <div className="col-4"><FormInput type="text" name="city" id="city" value={this.state.city} onChange={this.onChange} label="City" /></div>
                        <div className="col-4"><FormInput type="text" name="state" id="state" value={this.state.state} onChange={this.onChange} label="State" /></div>
                        <div className="col-4"><FormInput type="text" name="country" id="country" value={this.state.country} onChange={this.onChange} label="Country" /></div>
                    </div>
                    <div className="row">
                        <div className="col-6"><FormInput type="text" name="website" id="website" value={this.state.website} onChange={this.onChange} label="Website" /></div>
                        <div className="col-6"><FormInput type="text" name="youtube" id="youtube" value={this.state.youtube} onChange={this.onChange} label="Youtube" /></div>
                    </div>
                    <Button onClick={this.edit}>Edit</Button>
                </Form>
                {this.state.editedRedirect ? (<Redirect to="/user/profile" />) : (null)}
            </React.Fragment>
        )
    }
}

export default EditProfile