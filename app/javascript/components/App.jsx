import React from "react";
import Dashboard from "../src/components/Dashboard/index";
import CreateTask from "../src/components/Tasks/CreateTask";
import ShowTask from "../src/components/Tasks/ShowTask";
import EditTask from "../src/components/Tasks/EditTask";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/tasks/:id/show" component={ShowTask} />
        <Route exact path="/tasks/:id/edit" component={EditTask} />
      </Switch>
    </Router>
  );
};

export default App;
