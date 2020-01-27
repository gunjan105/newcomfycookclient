import React from 'react';
import {ListGroupItem, ListGroupItemHeading, ListGroupItemText, FormGroup, Label, Input} from 'reactstrap'

const ShowSelectedIngredients = ({tempSelectedIngredients, addToSelectedIngredients, onChangeIngQty, onChangeIngUnit}) => {
    return(
        <React.Fragment>
            {tempSelectedIngredients.map((si, key) => <div key={key}>
            <ListGroupItem>
                <ListGroupItemHeading>{si.name}</ListGroupItemHeading>
                <ListGroupItemText>
                    <div className="row">
                        <div className="col-3">
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input type="text" name={"ingQty,"+key} id="quantity" placeholder="quantity" onChange={onChangeIngQty} />
                        </FormGroup>
                        </div>
                        <div className="col-3">
                            <FormGroup>
                                <Label for="unit">Unit</Label>
                                <Input type="select" name={"ingUnit,"+key} id="ingUnit" onChange={onChangeIngUnit}>
                                    <option disabled selected>select</option>
                                    <option>KG</option>
                                    <option>ML</option>
                                    <option>Table Spoon</option>
                                    <option>Pieces</option>
                                </Input>
                            </FormGroup>
                        </div>
                    </div>
                </ListGroupItemText>
            </ListGroupItem>
            </div>)}
        </React.Fragment>
    )
}

export default ShowSelectedIngredients