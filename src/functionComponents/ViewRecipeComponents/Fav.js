import React from 'react'
import { FaHeart} from 'react-icons/fa'

const Fav = ({unfav}) => {
    return(
        <React.Fragment>
            <FaHeart onClick={unfav} color="red" size="30"></FaHeart>
        </React.Fragment>
    )
}

export default Fav