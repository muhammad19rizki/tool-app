import React, { Component } from "react";
import { Table, Card, CardHeader, Spinner, Button } from "reactstrap";
import { getTools, deleteTools } from "../../services/ToolsService";
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {DELETE_TOOLS, FETCH_COMPLETE, SET_LOADING, EDIT_BUTTON} from "../../reducers/ActionsTools";

class ListTools extends Component {

    loadData() {
        const { fetchData, fetchComplete } = this.props;
        console.log(this.props.location.query);

        fetchData();
        getTools()
            .then((toolss) => {
                console.log(toolss)
                fetchComplete(toolss);
            });
    }

    handleEdit = (toolsId) => {
        const { handleEditButton, history } = this.props;
        handleEditButton(toolsId);
        history.replace("/admin/tools/form");
    }

    handleDelete = (toolsId) => {
        deleteTools(toolsId)
            .then((isSuccess) => {
                if (!isSuccess) this.loadData();
            });
    }

    handleNotif = (tools) => {
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
                    this.handleDelete(tools.id)
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
        const { toolss } = this.props;
        let rows = <tr><td colSpan="2" className="text-center"><Spinner color="primary" /></td></tr>
        if (!this.props.isLoading) {
            rows = toolss.map((tools, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{tools.name}</td>
                        <td>{tools.partNumber}</td>
                        <td>{tools.serialNumber}</td>
                        <td>
                            <Button type="button"
                                    size="sm"
                                    color="warning"
                                    onClick={() => this.handleEdit(tools.id)}>Edit</Button>
                        </td>
                        <td>
                            <Button type="button"
                                    size="sm"
                                    color="danger"
                                    onClick={() => this.handleNotif(tools)}>Delete</Button>
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
                <CardHeader tag="strong">Tools
                    <Link to="/admin/tools/form">
                        <Button className="float-right"
                                size="sm"
                                color="primary">
                            Add Tools
                        </Button>
                    </Link>
                </CardHeader>
                <Table responsive striped hover className="m-0">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Part Number</th>
                        <th>Serial Number</th>
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
        deleteTools: (payload) => dispatch({ type: DELETE_TOOLS, payload }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListTools));