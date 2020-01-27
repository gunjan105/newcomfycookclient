import React from 'react';
// import {FormGroup, Label, Input} from 'reactstrap'
import ReactSearchBox from 'react-search-box'

const AddIngredientsSection = ({ingredientsFromDatabase, addTempSelectedIngredientsInState}) => {
    var data = []
    for (let i = 0; i < ingredientsFromDatabase.length; i++) {
        const e = ingredientsFromDatabase[i];
        data.push({key: e._id, value: e.name})
    }    
    return(
        <React.Fragment>            
            <ReactSearchBox
                placeholder="search ingredients"
                data={data}
                onSelect={record => addTempSelectedIngredientsInState(record.key)}
            />
            
      </React.Fragment>
    )
}

export default AddIngredientsSection