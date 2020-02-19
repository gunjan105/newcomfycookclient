import React from 'react';
import {IoMdClose} from 'react-icons/io'
import { Button } from 'reactstrap';

const SearchedIngredientsView = ({searchedIngredientsArray, removeFromSearchedIngredients, searchFoodByIngredientsFunction}) => {
    const ingredientsTab = {
        backgroundColor: "aqua",
        padding: "5px 10px",
        margin: "5px 10px",
        borderRadius: "5px"
    };
    const closeIconStyle = {
        cursor: "pointer"
    }
    const ingredientContainerStyle = {
        padding: "10px 5px",
        width: "100%",
        margin: "10px auto",
        border: "1px solid #e6e6e6"
    }
    return(
        <React.Fragment>
            {searchedIngredientsArray.length === 0 ? (null) : (
                <div style={ingredientContainerStyle}>
                    <p>Will show you the food recipe which have...</p>
                    {searchedIngredientsArray.map((i, key) => <span key={key} style={ingredientsTab}>
                        {i} <IoMdClose color="red" style={closeIconStyle} onClick={() => removeFromSearchedIngredients(i)}></IoMdClose>
                    </span>)}
                </div>
            )}
            <Button onClick={searchFoodByIngredientsFunction} outline color="success" className="mt-2">Search</Button>
        </React.Fragment>
    )
}

export default SearchedIngredientsView