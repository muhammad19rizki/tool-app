import React, { Component } from "react";
import { createStore } from "redux";
import { Row, Col } from 'reactstrap';
import { Provider } from 'react-redux';
import toolsReducer from "../reducers/ToolsReducer";
import { Route } from 'react-router-dom';
import ListTools from "./components/ListTools";
import ToolsForm from "./components/ToolsForm";

const toolsStore = createStore(toolsReducer);
class Tools extends Component {

    render() {
        return (
            <Provider store={toolsStore}>
                <Row>
                    <Col>
                        <Route exact path="/admin/tools" render={() => <ListTools />} />
                        <Route path="/admin/tools/form" render={() => <ToolsForm />} />
                    </Col>
                </Row>
            </Provider>
        )
    }
}
export default Tools;