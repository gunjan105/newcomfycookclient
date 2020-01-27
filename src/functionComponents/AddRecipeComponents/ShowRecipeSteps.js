import React from 'react'
import {ListGroup, ListGroupItem} from 'reactstrap'

const ShowRecipeStep = ({recipe}) => {
    return(
        <React.Fragment>
            <ListGroup>
                {recipe.step.map((s, key) => <ListGroupItem key={key}>
                    <p>{key+1} : {s.description}</p>
                </ListGroupItem>)}                
            </ListGroup>            
        </React.Fragment>
    )
}

export default ShowRecipeStep