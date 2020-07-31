import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Job from "../components/Job";
import Assignment from "../components/Assignment";
import Tools from "../components/Tools";


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <p>Home</p>
                    <p>this is home page</p>
                </Route>
                <Route path="/admin/tools" render={() => <p><Tools /></p>} />
                <Route path="/admin/job" render={() => <p><Job /></p>} />
                <Route path="/planner/assignment" render={() => <p><Assignment /></p>} />
            </Switch>
        )
    }
}
export default Routes;