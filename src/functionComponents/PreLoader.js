import React from 'react';

const PreLoader = ({link, imgLink}) => {
    setTimeout(function() {
        window.location.href = link
    },1500);
    return (
        <React.Fragment>
            <center><img src={imgLink} alt={'loading...'} /></center>                
        </React.Fragment>
    );
}
 
export default PreLoader;