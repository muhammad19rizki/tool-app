import React, { Component } from "react";
import { createStore } from "redux";
import { Row, Col } from 'reactstrap';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import ListAssignment from "./components/ListAssignment";
import AssignmentForm from "./components/AssignmentForm";
import assignmentReducer from "../reducers/AssignmentReducer";

const assignmentStore = createStore(assignmentReducer);
class Assignment extends Component {

    render() {
        return (
            <Provider store={assignmentStore}>
                <Row>
                    <Col>
                        <Route exact path="/planner/assignment" render={() => <ListAssignment />} />
                        <Route path="/planner/assignment/form" render={() => <AssignmentForm />} />
                    </Col>
                </Row>
            </Provider>
        )
    }
}
export default Assignment;