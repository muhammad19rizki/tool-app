import React, { Component, Fragment } from 'react';
import { Col, Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { SET_LOADING, HANDLE_INPUT_CHANGES, SUBMIT_COMPLETE } from "../../reducers/ActionAssignment";
import { withRouter } from 'react-router-dom';
import {createAssignment, updateAssignment} from "../../services/AssignmentService";


class AssignmentForm extends Component {

    submitAssignmentData = async () => {
        const { form } = this.props;
        if (form.id) return await updateAssignment(form);
        else return await createAssignment(form);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete } = this.props;
        setLoading();
        this.submitAssignmentData()
            .then((data) => {
                submitComplete();
                this.handleReturn();
            });
    }

    handleReturn = () => {
        const { history } = this.props;
        history.replace("/planner/assignment");
    }

    isValid = () => {
        const { form, isLoading } = this.props;
        return form.jobDeskNumber.length > 0 ||
            form.jobName.length > 0 ||
            form.typeJob.length > 0 ||
            form.aircraftReg.length > 0 ||
            // form.date.length > 0 ||
            form.reference.length > 0 ||
            form.status.length > 0 ||
            // form.account.length > 0 ||
            isLoading;
    }

    render() {
        const { form, handleInputChanges, isLoading } = this.props;
        return (
            <Fragment>
                <Card>
                    <CardHeader tag="form">Assignment Form</CardHeader>
                    <CardBody>
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <FormGroup row>
                                <Label for="jobDeskNumber"
                                       sm="3">Jobdesk Number</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="jobDeskNumber"
                                           name="jobDeskNumber"
                                           value={form.jobDeskNumber}
                                           placeholder="Job Desc Number"
                                           onChange={(event) => handleInputChanges('jobDeskNumber', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="jobName"
                                       sm="3">Job Name</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="jobName"
                                           name="jobName"
                                           value={form.jobName}
                                           placeholder="Job Name"
                                           onChange={(event) => handleInputChanges('jobName', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="typeJob"
                                       sm="3">Type Job</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="typeJob"
                                           name="typeJob"
                                           value={form.typeJob}
                                           placeholder="Type Job"
                                           onChange={(event) => handleInputChanges('typeJob', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="aircraftReg"
                                       sm="3">Aircraft Reg</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="aircraftReg"
                                           name="aircraftReg"
                                           value={form.aircraftReg}
                                           placeholder="Aircraft Reg"
                                           onChange={(event) => handleInputChanges('aircraftReg', event.target.value)} />
                                </Col>
                            </FormGroup>
                            {/*<FormGroup row>*/}
                            {/*    <Label for="date"*/}
                            {/*           sm="3">Date</Label>*/}
                            {/*    <Col sm="9">*/}
                            {/*        <Input type="text"*/}
                            {/*               id="date"*/}
                            {/*               name="date"*/}
                            {/*               value={form.date}*/}
                            {/*               placeholder="Date"*/}
                            {/*               onChange={(event) => handleInputChanges('date', event.target.value)} />*/}
                            {/*    </Col>*/}
                            {/*</FormGroup>*/}
                            <FormGroup row>
                                <Label for="reference"
                                       sm="3">Reference</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="reference"
                                           name="reference"
                                           value={form.reference}
                                           placeholder="Reference"
                                           onChange={(event) => handleInputChanges('reference', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="status"
                                       sm="3">Status</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="status"
                                           name="status"
                                           value={form.status}
                                           placeholder="Status"
                                           onChange={(event) => handleInputChanges('status', event.target.value)} />
                                </Col>
                            </FormGroup>
                            {/*<FormGroup row>*/}
                            {/*    <Label for="account"*/}
                            {/*           sm="3">Account</Label>*/}
                            {/*    <Col sm="9">*/}
                            {/*        <Input type="text"*/}
                            {/*               id="account"*/}
                            {/*               name="account"*/}
                            {/*               value={form.account}*/}
                            {/*               placeholder="Account"*/}
                            {/*               onChange={(event) => handleInputChanges('account', event.target.value)} />*/}
                            {/*    </Col>*/}
                            {/*</FormGroup>*/}
                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="submit"
                                            color="primary"
                                            disabled={!this.isValid()}>
                                        {!isLoading ? 'Save Assignment' : 'submiting data...'}
                                    </Button>
                                    <Button type="reset"
                                            color="secondary"
                                            onClick={this.handleReturn}
                                            className="ml-3">Return</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return { ...state }
}

function mapDispatchToProps(dispatch) {
    return {
        handleInputChanges: (inputName, inputValue) => dispatch({ type: HANDLE_INPUT_CHANGES, payload: { inputName, inputValue } }),
        setLoading: () => dispatch({ type: SET_LOADING }),
        submitComplete: () => dispatch({ type: SUBMIT_COMPLETE }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AssignmentForm));