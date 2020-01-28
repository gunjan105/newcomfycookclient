import React, { Component } from 'react';
import { Button, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import {MdAdd} from 'react-icons/md'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import AlertMsg from '../functionComponents/AlertMsg';


class MyRecipes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addNewRecipeClicked: false,
            user: decode(localStorage.getItem('user')).id,
            foods: [],
            viewUserRecipe: false,
            viewUserRecipeFoodId: null
        }
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/'+this.state.user)
            .then(res => {
                if(res.data.success) {
                    this.setState({foods: res.data.foods})
                }
            })
            .catch(err => console.log(err))
    }
    addNewRecipeClicked = () => {
        this.setState({addNewRecipeClicked: true})
    }
    viewUserRecipe = (e) => {
        this.setState({viewUserRecipe: !this.state.viewUserRecipe, viewUserRecipeFoodId: e.target.value})
    }
    render() {
        return(
            <React.Fragment>
                <div className="container">
                    <Button outline color="success" onClick={this.addNewRecipeClicked}>Add New Recipe <MdAdd></MdAdd></Button>
                </div>
                {this.state.foods ? 
                    (
                        <React.Fragment>
                            <div className="container mt-3">
                                <div className="row">
                                    {this.state.foods.map((f, key) => <div key={key} className="col-4">
                                        <Card>
                                            <CardImg top width="100%" src="https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle><h5>{f.name}</h5></CardTitle>                                                
                                                <Button onClick={this.viewUserRecipe} value={f._id}>View</Button>
                                            </CardBody>
                                        </Card>                                        
                                    </div>)}
                                </div>    
                            </div>                            
                        </React.Fragment>
                    )
                    :
                    (<AlertMsg color="warning" msg="No Food Added Yet." />)
                }
                {this.state.addNewRecipeClicked ? (<Redirect to="/user/add-recipe" />) : (null)}
                {this.state.viewUserRecipe ? (<Redirect to={"/user/view-recipe/"+this.state.viewUserRecipeFoodId} />) : (null)}
            </React.Fragment>
        )
    }
}

export default MyRecipes