import React, { Component } from 'react'
import decode from 'jwt-decode'
import Axios from 'axios'
import config from 'react-global-configuration'
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import {MdDelete} from 'react-icons/md'
import {AiTwotoneEdit} from 'react-icons/ai'
import FormInput from '../functionComponents/FormInput'
import {Redirect} from 'react-router-dom'
import Like from '../functionComponents/ViewRecipeComponents/Like'
import Fav from '../functionComponents/ViewRecipeComponents/Fav'
import Unlike from '../functionComponents/ViewRecipeComponents/Unlike'
import Unfav from '../functionComponents/ViewRecipeComponents/Unfav'
import Comments from '../functionComponents/ViewRecipeComponents/Comments'


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
            deleteRedirect: false,
            likedByUser: null,
            favByUser: null
        }
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/get/'+this.state.foodId)
            .then(res => {
                if(res.data.success){
                    this.setState({food: res.data.food})
                    // console.log(res.data.food)
                    if (res.data.food.likes.indexOf(this.state.user) > -1) {
                        this.setState({likedByUser: true})
                    } else {
                        this.setState({likedByUser: false})
                    }
                    Axios.get(config.get('server_path')+'/user/'+this.state.user)
                        .then(res1 => {
                            if (res1.data.success) {
                                if (res1.data.user.favourites.filter(e => e.food === this.state.foodId).length > 0) {
                                    this.setState({favByUser: true})
                                } else {
                                    this.setState({favByUser: false})
                                }      
                            }
                        })   
                        .catch(err1 => console.log(err1))                                         
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
    like = () => {
        console.log('liked')
        Axios.post(config.get('server_path')+'/food/like', {foodId: this.state.foodId, userId: this.state.user})
            .then(res => {
                if (res.data.success) {
                    this.setState({likedByUser: true})
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err))
    }
    unlike = () => {
        console.log('unlike');
        Axios.post(config.get('server_path')+'/food/dislike', {foodId: this.state.foodId, userId: this.state.user})  
            .then(res => {
                if (res.data.success) {
                    this.setState({likedByUser: false})
                }
            })
            .catch(err => console.log(err))
    }
    fav = () => {
        console.log('fav'); 
        Axios.post(config.get('server_path')+'/food/fav', {foodId: this.state.foodId, userId: this.state.user})
            .then(res => {
                if (res.data.success) {
                    this.setState({favByUser: true})
                }
            })
            .catch(err => console.log(err))
    }
    unfav = () => {
        console.log('unfav');     
        Axios.post(config.get('server_path')+'/food/unfav', {foodId: this.state.foodId, userId: this.state.user})
            .then(res => {
                if (res.data.success) {
                    this.setState({favByUser: false})
                }
            })
            .catch(err => console.log(err))   
    }
    onChangeComment = (e) => {
        this.setState({comment: e.target.value})                
    }
    comment = () => {        
        var data = {
            comment: this.state.comment,
            userId: this.state.user,
            foodId: this.state.foodId
        }

        Axios.post(config.get('server_path')+'/food/comment', data)
            .then(res => {
                if (res.data.success) {                    
                    Axios.get(config.get('server_path')+'/food/get/'+this.state.foodId)
                        .then(res1 => {
                            if (res1.data.success) {
                                this.setState({food: res1.data.food, comment: ''})
                            }
                        })
                        .catch(err1 => console.log(err1))
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
                                {this.state.likedByUser ? (<Like unlike={this.unlike} />) : (<Unlike like={this.like} />)}
                                {this.state.favByUser ? (<Fav unfav={this.unfav} />) : (<Unfav fav={this.fav} />)}                                
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


                                <Comments comment={this.comment} onChangeComment={this.onChangeComment} food={this.state.food} commentState={this.state.comment} />
                                
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