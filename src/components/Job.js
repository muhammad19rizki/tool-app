import React, { Component } from "react";
import { createStore } from "redux";
import { Row, Col } from 'reactstrap';
import { Provider } from 'react-redux';
import jobReducer from "../reducers/JobReducer";
import { Route } from 'react-router-dom';
import ListJob from "./components/ListJob";
import JobForm from "./components/JobForm";

const jobStore = createStore(jobReducer);
class Job extends Component {

    render() {
        return (
            <Provider store={jobStore}>
                <Row>
                    <Col>
                        <Route exact path="/admin/job" render={() => <ListJob />} />
                        <Route path="/admin/job/form" render={() => <JobForm />} />
                    </Col>
                </Row>
            </Provider>
        )
    }
}
export default Job;