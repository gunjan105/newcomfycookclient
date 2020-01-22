import React from 'react';
import {Button, Form} from 'reactstrap'
import FormInput from '../FormInput'
import FormSubtitle from '../FormSubtitle';

const Cred = ({onChange, registerUser}) => {
    return(
        <React.Fragment>
            <Form className="container"> 
                <FormSubtitle subtitle="Primary Information" />
                <FormInput type="text" name="username" id="username" placeholder="enter username here" onChange={onChange} label="Username" />
                <FormInput type="password" name="password" id="password" placeholder="enter password here" onChange={onChange} label="Password" />
                <Button onClick={registerUser}>Next</Button>
            </Form>
        </React.Fragment>
    )
}

export default Cred