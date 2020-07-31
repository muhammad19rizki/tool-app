import React, { Component, Fragment } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Nav } from "reactstrap";
import { NavLink } from "react-router-dom";
import {gmflogo} from '../gmflogo.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleNavBar = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }


    render() {
        const { isOpen } = this.state;
        return (
            <Fragment>
                <Navbar dark color="primary" className="shadow mb-4">
                    <NavbarBrand href="/" className="mr-auto">
                        <img src={gmflogo} width="40" height="40" className="d-inline-block align-top" alt="React Bootstrap logo"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavBar} className="mr-2 d-block d-sm-none" />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink exact to="/" className="nav-link">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/admin/job" className="nav-link">Job</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/admin/tools" className="nav-link">Tools</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/planner/assignment" className="nav-link">Assignment</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment>
        );
    }
}

export default Header;