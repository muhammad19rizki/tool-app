import React, { Component } from "react";
import { Table, Card, CardHeader, Spinner, Button } from "reactstrap";
import Swal from 'sweetalert2';
import {FETCH_COMPLETE, SET_LOADING, EDIT_BUTTON, DELETE_ASSIGNMENT} from "../../reducers/ActionAssignment";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {deleteAssignment, getAssignment} from "../../services/AssignmentService";

class ListAssignment extends Component {

    loadData() {
        const { fetchData, fetchComplete } = this.props;
        console.log(this.props.location.query);

        fetchData();
        getAssignment()
            .then((assignments) => {
                fetchComplete(assignments);
            });
    }

    handleEdit = (assignmentId) => {
        const { handleEditButton, history } = this.props;
        handleEditButton(assignmentId);
        history.replace("/planner/assignment/form");
    }

    handleDelete = (assignmentId) => {
        deleteAssignment(assignmentId)
            .then((isSuccess) => {
                if (!isSuccess) this.loadData();
            });
    }

    handleNotif = (assignment) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'yes, delete it!',
            cancelButtonText: 'no, cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                swalWithBootstrapButtons.fire(
                    'deleted!',
                    'your file has been deleted.',
                    'success',
                    this.handleDelete(assignment.id)
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'cancelled',
                    'your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    componentDidMount() {
        this.loadData();
    }

    generateTableRows() {
        const { assignments } = this.props;
        let rows = <tr><td colSpan="2" className="text-center"><Spinner color="primary" /></td></tr>
        if (!this.props.isLoading) {
            rows = assignments.map((assignment, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{assignment.jobDeskNumber}</td>
                        <td>{assignment.jobName}</td>
                        <td>{assignment.typeJob}</td>
                        <td>{assignment.aircraftReg}</td>
                        {/*<td>{assignment.date}</td>*/}
                        <td>{assignment.reference}</td>
                        <td>{assignment.status}</td>
                        {/*<td>{assignment.account.account}</td>*/}
                        <td>
                            <Button type="button"
                                    size="sm"
                                    color="warning"
                                    onClick={() => this.handleEdit(assignment.id)}>Edit</Button>
                        </td>
                        <td>
                            <Button type="button"
                                    size="sm"
                                    color="danger"
                                    onClick={() => this.handleNotif(assignment)}>Delete</Button>
                        </td>
                    </tr>
                )
            });
        }
        return rows;
    }
    render() {
        return (
            <Card className="shadow">
                <CardHeader tag="strong">Assignment
                    <Link to="/planner/assignment/form">
                        <Button className="float-right"
                                size="sm"
                                color="primary">
                            Add Assignment
                        </Button>
                    </Link>
                </CardHeader>
                <Table responsive striped hover className="m-0">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Jobdesk Number</th>
                        <th>Job Name</th>
                        <th>Type Job</th>
                        <th>Aircraft Reg</th>
                        {/*<th>Date</th>*/}
                        <th>Reference</th>
                        <th>Status</th>
                        {/*<th>Account</th>*/}
                        <th colSpan="2" width="15%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>{this.generateTableRows()}</tbody>
                </Table>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return { ...state };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch({ type: SET_LOADING }),
        fetchComplete: (payload) => dispatch({ type: FETCH_COMPLETE, payload }),
        handleEditButton: (payload) => dispatch({ type: EDIT_BUTTON, payload }),
        deleteAssignment: (payload) => dispatch({ type: DELETE_ASSIGNMENT, payload }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListAssignment));