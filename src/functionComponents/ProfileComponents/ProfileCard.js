import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Button} from 'reactstrap'
import {FaRegSmile} from 'react-icons/fa'
import {GoHeart} from 'react-icons/go'
import {AiOutlineEdit} from 'react-icons/ai'

import ProfileCardHeader from './ProfileCardHeader';
import ProfileCardInfo from './ProfileCardInfo';
// import { Redirect } from 'react-router-dom';

const ProfileCard = ({user, editClicked}) => {
    return(
        <React.Fragment>
            <div className="row mt-5">
                <div className="col-2"></div>
                <div className="col-8">
                    <Card>
                        <CardHeader><ProfileCardHeader header={user.details.name} /></CardHeader>
                        <CardBody>
                            <div className="row">
                                <div className="col-6"><ProfileCardInfo label="username: " info={user.cred.username} /></div>
                                <div className="col-6"><ProfileCardInfo label="email: " info={user.details.contact.email} /></div>
                            </div>
                            <div className="row">
                                <div className="col-6"><ProfileCardInfo label="mobile 1: " info={user.details.contact.mobile1} /></div>
                                {user.details.contact.mobile2 ? (<div className="col-6"><ProfileCardInfo label="mobile 2: " info={user.details.contact.mobile1} /></div>) : (null)}                                
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <ProfileCardInfo label="Date of Birth: " info={user.details.dob} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6"><a href={user.urls.website}><ProfileCardInfo label="website: " info={user.urls.website} /></a></div>
                                <div className="col-6"><a href={user.urls.youtube}><ProfileCardInfo label="youtube: " info={user.urls.youtube} /></a></div>
                            </div>
                            <div className="row">
                                <div className="col"><Button outline color="primary" className="btn btn-sm" onClick={editClicked}>Edit <AiOutlineEdit></AiOutlineEdit></Button></div>
                                <div className="col"><Button outline color="success" className="btn btn-sm">Go To Favourites <GoHeart color="red" fontSize="20"></GoHeart></Button></div>
                            </div>
                        </CardBody>
                        <CardFooter>ComfyCook loves you ! <FaRegSmile></FaRegSmile></CardFooter>
                    </Card>
                </div>
                <div className="col-2"></div>
            </div>
        </React.Fragment>
    )
}

export default ProfileCard