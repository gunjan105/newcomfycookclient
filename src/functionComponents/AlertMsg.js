import React from 'react';
import { Alert } from 'reactstrap'

const AlertMsg = ({color, msg}) => {
    return(
        <Alert color={color}>
            {msg}
        </Alert>
    )
}

export default AlertMsg