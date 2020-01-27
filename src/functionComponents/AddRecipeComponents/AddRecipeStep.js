import React from 'react'
import FormInput from '../FormInput'
import {Button} from 'reactstrap'

const AddRecipeStep = ({onChangeStep, onAddStepClicked, tempStep}) => {
    return(
        <React.Fragment>
            <div className="row">
                <div className="col-10"><FormInput type="textarea" name="step" id="step" placeholder="Enter step here..." label="Enter Steps" onChange={onChangeStep} value={tempStep}/></div>
                <div className="col-2"><Button outline className="btn btn-sm mt-5" onClick={onAddStepClicked}>Add Step</Button></div>
            </div>            
        </React.Fragment>
    )
}

export default AddRecipeStep