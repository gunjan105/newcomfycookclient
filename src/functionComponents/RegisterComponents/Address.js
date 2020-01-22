import React from 'react';
import {Button, Form} from 'reactstrap'
import FormInput from '../FormInput'
import FormSubtitle from '../FormSubtitle'

const Address = ({onChange, addressSubmited}) => {
    return(
        <React.Fragment>
            <Form className="container"> 
                <FormSubtitle subtitle="address" />
                <FormInput type="text" name="street" id="street" placeholder="enter street here" onChange={onChange} label="Street" />
                <FormInput type="text" name="area" id="area" placeholder="enter area here" onChange={onChange} label="Area" />
                <FormInput type="text" name="pincode" id="pincode" placeholder="enter pincode here" onChange={onChange} label="Pincode" />
                <FormInput type="text" name="city" id="city" placeholder="enter city here" onChange={onChange} label="City" />
                <FormInput type="text" name="state" id="state" placeholder="enter state here" onChange={onChange} label="State" />
                <FormInput type="text" name="country" id="country" placeholder="enter country here" onChange={onChange} label="Country" value="India" />
                <Button onClick={addressSubmited}>Next</Button>
            </Form>
        </React.Fragment>
    )
}

export default Address