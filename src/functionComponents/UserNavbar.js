import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {Collapse,Navbar,NavbarToggler,Nav,NavItem} from 'reactstrap';
import MyBrandName from './MyBrandName';

const UserNavbar = () => {
    console.log('user navbar reloaded')
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
            <Navbar color="light" light expand="md">
                <Link to="/user/timeline"><MyBrandName text="Comfy Cook" /></Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                    <Link to="/logout">Logout</Link>
                    </NavItem>                   
                    {/* <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                        Option 1
                        </DropdownItem>
                        <DropdownItem>
                        Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                        Reset
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown> */}
                </Nav>
                </Collapse>
            </Navbar>
    </div>
    )
}

export default UserNavbar