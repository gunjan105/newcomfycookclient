import React from 'react';
import {Button, Form} from 'reactstrap'
import FormInput from '../FormInput'
import FormSubtitle from '../FormSubtitle';

const Details = ({onChange, detailsSubmited}) => {
    return(
        <React.Fragment>
            <Form className="container"> 
                <FormSubtitle subtitle="Primary Information" />
                <FormInput type="text" name="name" id="name" placeholder="enter name here" onChange={onChange} label="Name" />
                <FormInput type="number" name="mobile1" id="mobile1" placeholder="enter mobile 1 here" onChange={onChange} label="mobile 1" />
                <FormInput type="number" name="mobile2" id="mobile2" placeholder="enter mobile 2 here" onChange={onChange} label="mobile 2"/>
                <FormInput type="email" name="email" id="email" placeholder="enter email here" onChange={onChange} label="email"/>
                <FormInput type="date" name="dob" id="dob" placeholder="dob" onChange={onChange} label="Date of Birth"/>
                <FormInput type="text" name="website" id="website" placeholder="website" onChange={onChange} label="Website"/>
                <FormInput type="text" name="youtube" id="youtube" placeholder="youtube" onChange={onChange} label="Youtube"/>
                <Button onClick={detailsSubmited}>Next</Button>
            </Form>
        </React.Fragment>
    )
}

export default Details