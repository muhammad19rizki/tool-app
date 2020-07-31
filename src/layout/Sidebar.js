import React, { Component, Fragment } from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
    render() {
        return (
            <Fragment>
                <p>Sidebar Menu</p>
                <Nav vertical pills>
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
            </Fragment>
        );
    }
}
export default Sidebar;