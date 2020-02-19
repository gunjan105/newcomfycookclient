import React, { Component } from 'react';
import ReactSearchBox from 'react-search-box'
import Axios from 'axios';
import config from 'react-global-configuration'
import SearchedIngredientsView from '../functionComponents/SearchFoodByIngredients/SearchedIngredientsView';
import SearchedFoodView from '../functionComponents/SearchFoodByIngredients/SearchedFoodView';
import { Redirect } from 'react-router-dom';

class SearchFoodByIngredients extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ingredientsFromDatabase: null,
            dataForSearchBar: [],
            searchedIngredientsArray: [],
            searchedFood: null,
            viewUserRecipe: false,
            viewUserRecipeFoodId: null
        }
    }
    componentDidMount() {
        this.getIngredientsFromDatabase()
    }
    getIngredientsFromDatabase = () => {
        Axios.get(config.get('server_path')+'/food/ingredients')
            .then(res => {
                if (res.data.success) {
                    this.setState({ingredientsFromDatabase: res.data.ingredients})
                    this.fillDataForSearchBar()
                }
            })
            .catch(err => console.log(err))
    }
    fillDataForSearchBar = () => {
        var data = []
        this.state.ingredientsFromDatabase.forEach(i => {
            data.push({key: i._id, value: i.name})
        });
        this.setState({dataForSearchBar: data})
    }
    addToSearchedIngredients = (ingredientName) => {
        var searchedIngredientsArrayTemp = this.state.searchedIngredientsArray
        searchedIngredientsArrayTemp.push(ingredientName)
        this.setState({searchedIngredientsArray: searchedIngredientsArrayTemp})
    }    
    removeFromSearchedIngredients = (i) => {
        var searchedIngredientsArrayTemp = this.state.searchedIngredientsArray
        
        const index = searchedIngredientsArrayTemp.indexOf(i)
        if (index > -1) {
            searchedIngredientsArrayTemp.splice(index, 1)
        }
        console.log('remove');
        
        this.setState({searchedIngredientsArray: searchedIngredientsArrayTemp})
    }
    searchFoodByIngredientsFunction = () => {
        var data = {
            ingredientsKeywords: this.state.searchedIngredientsArray
        }

        Axios.post(config.get('server_path')+'/food/search', data)
            .then(res => {
                if (res.data.success) {
                    this.setState({searchedFood: res.data.searchedFood})
                }
            })
            .catch(err => console.log(err))
    }
    viewUserRecipe = (e) => {
        this.setState({viewUserRecipe: true, viewUserRecipeFoodId: e.target.value})
    }
    render() {
        console.log(this.state)
        return(
            <React.Fragment>
                <div className="container mt-4">
                    <ReactSearchBox
                        placeholder="search ingredients"
                        data={this.state.dataForSearchBar}
                        onSelect={record => this.addToSearchedIngredients(record.value)}
                    />
                    <SearchedIngredientsView searchedIngredientsArray={this.state.searchedIngredientsArray} removeFromSearchedIngredients={this.removeFromSearchedIngredients} searchFoodByIngredientsFunction={this.searchFoodByIngredientsFunction} />                
                    {this.state.searchedFood ? (<SearchedFoodView searchedFood={this.state.searchedFood} viewUserRecipe={this.viewUserRecipe} />) : (null)}
                    {this.state.viewUserRecipe ? (<Redirect to={"/user/view-recipe/"+this.state.viewUserRecipeFoodId} />) : (null)}
                </div>                
            </React.Fragment>
        )
    }
}

export default SearchFoodByIngredients