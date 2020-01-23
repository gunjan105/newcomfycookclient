import React from 'react';

const ProfileCardInfo = ({label, info}) => {
    return(
        <React.Fragment>
<b>{label}</b><span>{info}</span>
        </React.Fragment>
    )
}

export default ProfileCardInfo