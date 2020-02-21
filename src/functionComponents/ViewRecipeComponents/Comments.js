import React from 'react';
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import FormInput from '../FormInput'

const Comments = ({comment, onChangeComment, food, commentState}) => {
    return(
        <React.Fragment>
            <br/>
            <p><b>Comments: </b></p>
            <div className="row">
                <div className="col-10"><FormInput type="textarea" name="comment" label="comment:" placeholder="add a comment here" onChange={onChangeComment} value={commentState} /></div>
                <div className="col-2 mt-5">
                    <Button color="success" outline className="btn btn-sm" onClick={comment}>Add</Button>
                </div>
            </div>
            <ListGroup>
                {food.feedback.comments.slice(0).reverse().map((c, key) => <ListGroupItem key={key}>
                    {c.comment}
                </ListGroupItem>)}
            </ListGroup>
        </React.Fragment>
    )
}

export default Comments