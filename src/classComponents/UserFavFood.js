import React from 'react';
import {Card, CardBody, CardImg, CardTitle, Button} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import Axios from 'axios';
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import PageTitle from '../functionComponents/PageTitle';

class SearchedFoodView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            foods: null,
            viewUserRecipe: false,
            viewUserRecipeFoodId: null
        }
    }

    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/favourites/'+decode(localStorage.getItem('user')).id)
            .then(res => {
                console.log('hi')
                if (res.data.success) {
                    this.setState({foods: res.data.foods})
                    console.log(res.data.foods)
                }
            })
            .catch(err => console.log(err))
    }
    viewUserRecipe = (e) => {
        this.setState({viewUserRecipe: true, viewUserRecipeFoodId: e.target.value})
    }
    
    render() {
        return(
            <React.Fragment>
               {this.state.foods ? (
                   <div className="row">                    
                   {this.state.foods.length === 0 ? (<h5>You haven't saved any food to your favourites yet...</h5>) : (
                        <div>
                            {this.state.foods.map((f, key) => <div key={key} className="col-4">
                        <Card>
                            <CardImg top width="100%" src="https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle><h5>{f.food.name}</h5></CardTitle>                                                
                                <Button onClick={this.viewUserRecipe} value={f.food._id}>View</Button>
                            </CardBody>
                        </Card>                                        
                    </div>)}
                       </div>
                   )}
               </div>
               ) : (null)} 
                {this.state.viewUserRecipe ? (<Redirect to={"/user/view-recipe/"+this.state.viewUserRecipeFoodId} />) : (null)}
            </React.Fragment>
        )
    }
}

export default SearchedFoodView