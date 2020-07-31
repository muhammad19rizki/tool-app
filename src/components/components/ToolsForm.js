import React, { Component, Fragment } from 'react';
import { Col, Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { createTools, updateTools } from "../../services/ToolsService";
import { SET_LOADING, HANDLE_INPUT_CHANGES, SUBMIT_COMPLETE } from "../../reducers/ActionsTools";
import { withRouter } from 'react-router-dom';


class ToolsForm extends Component {

    submitToolsData = async () => {
        const { form } = this.props;
        if (form.id) return await updateTools(form);
        else return await createTools(form);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete } = this.props;
        setLoading();
        this.submitToolsData()
            .then((data) => {
                submitComplete();
                this.handleReturn();
            });
    }

    handleReturn = () => {
        const { history } = this.props;
        history.replace("/admin/tools");
    }

    isValid = () => {
        const { form, isLoading } = this.props;
        return form.name.length > 0 ||
            form.partNumber.length > 0 ||
            form.serialNumber.length > 0|| isLoading;
    }

    render() {
        const { form, handleInputChanges, isLoading } = this.props;
        return (
            <Fragment>
                <Card>
                    <CardHeader tag="form">Tools Form</CardHeader>
                    <CardBody>
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <FormGroup row>
                                <Label for="name"
                                       sm="3">Tools Name</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="name"
                                           name="name"
                                           value={form.name}
                                           placeholder="Tools Name"
                                           onChange={(event) => handleInputChanges('name', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="partNumber"
                                       sm="3">Part Number</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="partNumber"
                                           name="partNumber"
                                           value={form.partNumber}
                                           placeholder="Part Number"
                                           onChange={(event) => handleInputChanges('partNumber', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="serialNumber"
                                       sm="3">Serial Number</Label>
                                <Col sm="9">
                                    <Input type="text"
                                           id="serialNumber"
                                           name="serialNumber"
                                           value={form.serialNumber}
                                           placeholder="Serial Number"
                                           onChange={(event) => handleInputChanges('serialNumber', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="submit"
                                            color="primary"
                                            disabled={!this.isValid()}>
                                        {!isLoading ? 'Save Tools' : 'submiting data...'}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToolsForm));