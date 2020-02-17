import React from 'react'
import {AiOutlineLike} from 'react-icons/ai'

const Unlike = ({like}) => {
    return(
        <React.Fragment>
            <AiOutlineLike onClick={like} size="30"></AiOutlineLike>
        </React.Fragment>
    )
}

export default Unlike