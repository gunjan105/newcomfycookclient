import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {MdAdd} from 'react-icons/md'
import {Redirect} from 'react-router-dom'

class MyRecipes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addNewRecipeClicked: false
        }
    }
    addNewRecipeClicked = () => {
        this.setState({addNewRecipeClicked: true})
    }
    render() {
        return(
            <React.Fragment>
                <h1>My Recipe</h1>
                <Button outline color="success" onClick={this.addNewRecipeClicked}>Add New Recipe <MdAdd></MdAdd></Button>
                {this.state.addNewRecipeClicked ? (<Redirect to="/user/add-recipe" />) : (null)}
            </React.Fragment>
        )
    }
}

export default MyRecipes