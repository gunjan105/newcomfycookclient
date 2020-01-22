import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap'

const FormInput = ({type, name, id, placeholder, onChange, label, value}) => {
    return(
        <FormGroup>
            <Label for={id}>{label}</Label>
            <Input type={type} name={name} id={id} placeholder={placeholder} onChange={onChange} value={value} />
        </FormGroup>
    )
}

export default FormInput