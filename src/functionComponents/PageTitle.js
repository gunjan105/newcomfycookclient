import React from 'react';

const PageTitle = ({title}) => {
    const titleStyle = {
        fontWeight: "bold"
    }
    return(
        <h1 style={titleStyle}>{title}</h1>
    )
}

export default PageTitle