import React from 'react'
import {FaRegHeart} from 'react-icons/fa'

const Unfav = ({fav}) => {
    return(
        <React.Fragment>
            <FaRegHeart onClick={fav} size="30"></FaRegHeart>
        </React.Fragment>
    )
}

export default Unfav