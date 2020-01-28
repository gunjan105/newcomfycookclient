import React, { Component } from 'react'
import decode from 'jwt-decode'
import Axios from 'axios'
import config from 'react-global-configuration'
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import {MdDelete} from 'react-icons/md'
import {AiTwotoneEdit} from 'react-icons/ai'
import FormInput from '../functionComponents/FormInput'
import {Redirect} from 'react-router-dom'


class ViewRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            food: null,
            user: decode(localStorage.getItem('user')).id,
            foodId: this.props.match.params.fid,
            deleteModal: false,
            random: this.randomStr(6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            randomInput: null,
            deleteRedirect: false
        }
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/get/'+this.state.foodId)
            .then(res => {
                if(res.data.success){
                    this.setState({food: res.data.food})
                    console.log(res.data.food)
                }
            })
            .catch(err => console.log(err))
    }
    randomStr = (len, arr) => { 
        var ans = ''; 
        for (var i = len; i > 0; i--) { 
            ans +=  
              arr[Math.floor(Math.random() * arr.length)]; 
        } 
        return ans; 
    }
    onClickDelete = () => {
        this.setState({deleteModal: !this.state.deleteModal})
    }
    onChangeRandom = (e) => {
        this.setState({randomInput: e.target.value})
    }
    onDelete = () => {
        Axios.post(config.get('server_path')+'/food/delete', {foodId: this.state.foodId, userId: this.state.user})
            .then(res => {
                if(res.data.success) {
                    this.setState({deleteRedirect: true})
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return(
            <React.Fragment>                
                {this.state.food ?
                    (
                        <div className="container mt-3">
                                {this.deleteModal()}
                                <h1>{this.state.food.name}</h1>
                                <p>made by: <b>{this.state.food.user.details.name}</b> | ({this.state.food.cusine.name})</p>
                                <hr/>
                                <p>can serve: {this.state.food.servings}</p>
                                <p><b>Ingredients: </b></p>
                                <ListGroup>
                                    {this.state.food.ingredients.map((i, key) => <ListGroupItem tag="a" href="#" action>
                                        <b>{key+1}.</b> {i.ing.name} - {i.quantity} {i.unit}
                                    </ListGroupItem>)}                                    
                                </ListGroup>
                                <p className="mt-2"><b>Steps: </b></p>
                                <ListGroup>
                                    {this.state.food.recipe.step.map((s, key) => <ListGroupItem tag="a" href="#" action>
                                        <b>{key+1}.</b> {s.description}
                                    </ListGroupItem>)}                                    
                                </ListGroup>
                                {this.state.user === this.state.food.user._id ? 
                                (
                                    <div className="mt-3">
                                        <Button outline className="btn btn-sm mr-3" color="primary">Edit <AiTwotoneEdit></AiTwotoneEdit></Button>
                                        <Button outline className="btn btn-sm" color="danger" onClick={this.onClickDelete}>Delete <MdDelete></MdDelete></Button>
                                    </div>
                                )
                                : 
                                (<div></div>)}
                        </div>
                    )
                    :
                    (null)
                }
                {this.state.deleteRedirect ? (<Redirect to="/user/my-recipe" />) : (null)}
            </React.Fragment>
        )
    }
    deleteModal() {
        return(
            <Modal isOpen={this.state.deleteModal} toggle={this.onClickDelete}>
                <ModalHeader toggle={this.onClickDelete}>delete {this.state.food.name}?</ModalHeader>
                <ModalBody>
                    {this.state.random}
                    <FormInput type="text" name="random" id="random" placeholder="enter the above value here..." value={this.state.randomInput} onChange={this.onChangeRandom} />
                </ModalBody>
                <ModalFooter>
                <Button color="danger" outline onClick={this.onDelete} disabled={this.state.random === this.state.randomInput ? (false) : (true)}>Delete</Button>
                <Button color="secondary" outline onClick={this.onClickDelete}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ViewRecipe