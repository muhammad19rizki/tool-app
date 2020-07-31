import React, { Component } from "react";
import { Table, Card, CardHeader, Spinner, Button } from "reactstrap";
import { getJob, deleteJob } from "../../services/JobService";
import Swal from 'sweetalert2';
import { DELETE_JOB, FETCH_COMPLETE, SET_LOADING, EDIT_BUTTON } from "../../reducers/ActionJob";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class ListJob extends Component {

    loadData() {
        const { fetchData, fetchComplete } = this.props;
        console.log(this.props.location.query);

        fetchData();
        getJob()
            .then((jobs) => {
                console.log(jobs)
                fetchComplete(jobs);
            });
    }

    handleEdit = (jobId) => {
        const { handleEditButton, history } = this.props;
        handleEditButton(jobId);
        history.replace("/admin/job/form");
    }

    handleDelete = (jobId) => {
        deleteJob(jobId)
            .then((isSuccess) => {
                if (!isSuccess) this.loadData();
            });
    }

    handleNotif = (job) => {
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
                    this.handleDelete(job.id)
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
        const { jobs } = this.props;
        let rows = <tr><td colSpan="2" className="text-center"><Spinner color="primary" /></td></tr>
        if (!this.props.isLoading) {
            rows = jobs.map((job, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{job.name}</td>
                        <td>
                            <Button type="button"
                                size="sm"
                                color="warning"
                                onClick={() => this.handleEdit(job.id)}>Edit</Button>
                        </td>
                        <td>
                            <Button type="button"
                                size="sm"
                                color="danger"
                                onClick={() => this.handleNotif(job)}>Delete</Button>
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
                <CardHeader tag="strong">Jobs
                    <Link to="/admin/job/form">
                        <Button className="float-right"
                            size="sm"
                            color="primary">
                            Add Job
                        </Button>
                    </Link>
                </CardHeader>
                <Table responsive striped hover className="m-0">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
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
        deleteJob: (payload) => dispatch({ type: DELETE_JOB, payload }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListJob));