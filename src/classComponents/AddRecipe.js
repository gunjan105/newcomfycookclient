import React, { Component } from 'react';
import Axios from 'axios'
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import FormTitle from '../functionComponents/FormTitle';
import {Redirect} from 'react-router-dom'
import FormInput from '../functionComponents/FormInput'
import {Form, Input, FormGroup, Label, Button, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap'
import AddIngredientsSection from '../functionComponents/AddRecipeComponents/AddIngredientsSection'
import ShowSelectedIngredients from '../functionComponents/AddRecipeComponents/ShowSelectedIngredients';
import AddRecipeStep from '../functionComponents/AddRecipeComponents/AddRecipeStep'
import ShowRecipeSteps from '../functionComponents/AddRecipeComponents/ShowRecipeSteps'

class AddRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            food: null,
            category: 'Veg',
            cusines: null,
            veg: null, nonVeg: null, jain: null, swaminarayan: null, faradi: null,
            user: decode(localStorage.getItem('user')).id,
            ingredientsFromDatabase: null,
            tempSelectedIngredients: [],
            ingredients: [],
            tempStep: null,
            recipe: {
                step: []
            },
            hardKeywordsForSearching: [],
            softKeywordsForSearchingText: null,
            softKeywordsForSearching: [],
            modal: false,
            redirectAfterAdding: false
        }
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/cusines')
            .then(res => {
                if (res.data.success) {
                    this.setState({cusines: res.data.cusines})
                }
            })
        this.getIngredientsFromDatabase()
    }
    getIngredientsFromDatabase = () => {
        Axios.get(config.get('server_path')+'/food/ingredients')
            .then(res => {
                if (res.data.success) {
                    this.setState({ingredientsFromDatabase: res.data.ingredients})
                }
            })
            .catch(err => console.log(err))
    }
    addTempSelectedIngredientsInState = (ingId) => {
        Axios.get(config.get('server_path')+'/food/ingredients/'+ingId)
            .then(res => {
                if (res.data.success) {                    
                    this.setState({tempSelectedIngredients: [...this.state.tempSelectedIngredients, res.data.ingredient]})
                }
            })
            .catch(err => console.log(err))
    }
    addFood = () => {        
        for(let i = 0; i < this.state.tempSelectedIngredients.length; i++) {
            var e = this.state.tempSelectedIngredients[i]
            var temp = this.state.ingredients
            var temp1 = this.state.hardKeywordsForSearching

            temp.push({ing: e._id, quantity: e.quantity, unit: e.unit})  
            temp1.push(e.name)          
            console.log(temp1+'-----')
            this.setState({ingredients: temp, hardKeywordsForSearching: temp1})
        }
        if (this.state.category === 'Veg') {
            this.setState({veg: true, nonVeg: false})
            if (this.state.special === 'jain') {
                this.setState({jain: true, swaminarayn: false, faradi: false})
            } else if (this.state.special === 'swaminarayan') {
                this.setState({swaminarayan: true, jain: false, faradi: false})
            } else {
                this.setState({faradi: true, swaminarayan: false, jain: false})
            }
        } else {
            this.setState({veg: false, nonVeg: true, jain: false, swaminarayan: false, faradi: false})            
        }    
        var arrOfHashtags = this.state.softKeywordsForSearchingText.split("#")
        arrOfHashtags.shift()
        for (let j = 0; j < arrOfHashtags.length; j++) {
            arrOfHashtags[j] = arrOfHashtags[j].trim();
        }
        console.log(arrOfHashtags)            
        console.log(this.state)
        console.log('this is final')
        Axios.post(config.get('server_path')+'/food/makeFoodRecipe', this.state)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    this.toggleModal()
                }
            })
            .catch(err => console.log(err))
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})  
        console.log(this.state)      
    }
    onChangeIngQty = (e) => {
        console.log(e.target.name.split(',')[1])
        var siIndex = e.target.name.split(',')[1]
        var a = this.state.tempSelectedIngredients.slice()
        var temp = a[siIndex]
        console.log(temp)

        a[siIndex] = {_id: temp._id, name: temp.name, category: temp.category, unit: temp.unit, quantity: e.target.value}
        this.setState({tempSelectedIngredients: a})
    }
    onChangeIngUnit = (e) => {
        console.log(e.target.name.split(',')[1])
        var siIndex = e.target.name.split(',')[1]
        var a = this.state.tempSelectedIngredients.slice()
        var temp = a[siIndex]
        console.log(temp)

        a[siIndex] = {_id: temp._id, name: temp.name, category: temp.category, quantity: temp.quantity, unit: e.target.value}
        this.setState({tempSelectedIngredients: a})
    }
    onChangeStep = (e) => {
        this.setState({tempStep: e.target.value})
    }
    onAddStepClicked = () => {
        var steps = this.state.recipe.step

        var newStepData = {image: '', description: this.state.tempStep}

        steps.push(newStepData)

        this.setState({recipe: {step: steps}, tempStep: ''})
    }
    modal() {
        return <div>
            {this.state.formData !== null ? (<div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.name}</ModalHeader>
                    <ModalBody>
                        Added Successfully !
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.doneClicked}>Done</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>) : (null)}
        </div>;
    }
    toggleModal = () => {
        this.setState({modal: !this.state.modal})
    }
    doneClicked = () => {
        this.toggleModal()
        this.setState({redirectAfterAdding: true})
    }
    render() {
        return(
            <React.Fragment>
                <FormTitle title="Add New Recipe" />
                <Form className="container">
                    <div className="row">
                        <div className="col-6"><FormInput type="text" name="name" id="name" label="Food Name: " placeholder="Enter food name here..." onChange={this.onChange} /></div>
                        <div className="col-3">
                        <FormGroup>
                            <Label>Category: </Label>
                            <Input type="select" name="category" id="exampleSelect" onChange={this.onChange}>                            
                                <option>Veg</option>
                                <option>Non-Veg</option>
                            </Input>
                        </FormGroup>                        
                        </div>
                        <div className="col-3">
                        {this.state.category === 'Veg' ? 
                            (
                                <FormGroup>
                                    <Label>special category</Label>
                                    <Input type="select" name="special" id="special" onChange={this.onChange}>
                                        <option>normal</option>
                                        <option>jain</option>
                                        <option>swaminarayan</option>
                                        <option>faradi</option>
                                    </Input>
                                </FormGroup>
                            )
                            :
                            (null)
                        }
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-4">
                            <FormGroup>
                                <Label>Cusine</Label>
                                <Input type="select" name="cusine" id="cusine" onChange={this.onChange}>
                                    <option disabled selected>select one</option>
                                    {this.state.cusines ? 
                                        (
                                            <React.Fragment>
                                                {this.state.cusines.map((c, key) => <option key={key} value={c._id}>{c.name}</option>)}
                                            </React.Fragment>
                                        )
                                        :
                                        (null)
                                    }
                                </Input>
                            </FormGroup>
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-4">
                            <FormInput type="text" name="servings" id="servings" label="Servings" placeholder="how many person can be served..." onChange={this.onChange} />
                        </div>
                        <div className="col-8">
                            <Label>ingredients</Label>
                            {this.state.ingredientsFromDatabase ? (<AddIngredientsSection ingredientsFromDatabase={this.state.ingredientsFromDatabase ? (this.state.ingredientsFromDatabase) : (null)} addTempSelectedIngredientsInState={this.addTempSelectedIngredientsInState} />) : (null)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {this.state.tempSelectedIngredients ? (<ShowSelectedIngredients tempSelectedIngredients={this.state.tempSelectedIngredients} onChangeIngQty={this.onChangeIngQty} onChangeIngUnit={this.onChangeIngUnit} />) : (null)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <AddRecipeStep onChangeStep={this.onChangeStep} onAddStepClicked={this.onAddStepClicked} tempStep={this.state.tempStep}/>
                        </div>
                        <div className="col-12">
                            {this.state.recipe.step.length === 0 ? (null) : (<ShowRecipeSteps recipe={this.state.recipe} />)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <FormInput type="textarea" name="softKeywordsForSearchingText" onChange={this.onChange} placeholder="add hashtags for searching" />
                        </div>
                    </div>
                    <Button onClick={this.addFood} outline color="success">Add</Button>                       
                </Form>
                {this.state.modal ? (this.modal()) : (null)}
                {this.state.redirectAfterAdding ? (<Redirect to="/user/my-recipe" />) : (null)}
            </React.Fragment>
        )
    }
}

export default AddRecipe