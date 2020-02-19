import React from 'react';
import {Card, CardBody, CardImg, CardTitle, Button} from 'reactstrap'

const SearchedFoodView = ({searchedFood, viewUserRecipe}) => {
    return(
        <React.Fragment>
            {searchedFood.length === 0 ? (
                <p>There is no food that contains all the ingredients above</p>
            ) : (
                <div className="row">
                    {searchedFood.map((f, key) => <div key={key} className="col-4">
                                        <Card>
                                            <CardImg top width="100%" src="https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle><h5>{f.name}</h5></CardTitle>                                                
                                                <Button onClick={viewUserRecipe} value={f._id}>View</Button>
                                            </CardBody>
                                        </Card>                                        
                                    </div>)}
                </div>
            )}
        </React.Fragment>
    )
}

export default SearchedFoodView