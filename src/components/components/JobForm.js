import React, { Component, Fragment } from 'react';
import { Col, Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { createJob, updateJob } from "../../services/JobService";
import {SET_LOADING, HANDLE_INPUT_CHANGES, SUBMIT_COMPLETE, HANDLE_INPUT_TOOL} from "../../reducers/ActionJob";
import { withRouter } from 'react-router-dom';
import {getTools} from "../../services/ToolsService";
import {Multiselect} from "multiselect-react-dropdown";


class JobForm extends Component {

    constructor(props) {
        super(props);
        this.state ={
            tools:[],
            selectedValue:[]
        }
    }

    componentDidMount() {
        getTools().then(data=>{
            this.setState({tools:data})
            console.log(data)
        })
    }

    submitJobData = async () => {
        const { form } = this.props;
        // let form = {
        //     name: "ganti ban",
        //     tools:[{
        //         id:"ff80818173a4ca0f0173a4cc60270001"
        //     }],
        // }
        if (form.id) return await updateJob(form);
        else return await createJob(form);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete } = this.props;
        setLoading();
        this.submitJobData()
            .then((data) => {
                submitComplete();
                this.handleReturn();
            });
    }

    handleReturn = () => {
        const { history } = this.props;
        history.replace("/admin/job");
    }

    isValid = () => {
        const { form, isLoading } = this.props;
        return form.name.length > 0 || isLoading;
    }

    onSelect = (event) => {
        // event.preventDefault();
        console.log("ini data=", event);
    }

    render() {
        const { form, handleInputChanges, isLoading, handleInputDropdown, onSelect } = this.props;
        console.log(this.state.tools)
        return (
            <Fragment>
                <Card>
                    <CardHeader tag="form">Job Form</CardHeader>
                    <CardBody>
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <FormGroup row>
                                <Label for="name"
                                    sm="3">Job Name</Label>
                                <Col sm="9">
                                    <Input type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        placeholder="Job Name"
                                        onChange={(event) => handleInputChanges('name', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="tools"
                                       sm="3">Tools</Label>
                                <Col sm="9">
                                    <Multiselect
                                        options={this.state.tools} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="submit"
                                        color="primary"
                                        disabled={!this.isValid()}>
                                        {!isLoading ? 'Save Job' : 'submiting data...'}
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
        handleInputDropdown: (payload) => dispatch({type: HANDLE_INPUT_TOOL, payload:{payload}}),
        handleInputChanges: (inputName, inputValue) => dispatch({ type: HANDLE_INPUT_CHANGES, payload: { inputName, inputValue } }),
        setLoading: () => dispatch({ type: SET_LOADING }),
        submitComplete: () => dispatch({ type: SUBMIT_COMPLETE }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobForm));