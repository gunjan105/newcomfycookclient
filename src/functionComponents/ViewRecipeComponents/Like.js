import React from 'react'
import { AiFillLike} from 'react-icons/ai'

const Like = ({unlike}) => {
    return(
        <React.Fragment>
            <AiFillLike onClick={unlike} size="30" color="blue"></AiFillLike>
        </React.Fragment>
    )
}

export default Like