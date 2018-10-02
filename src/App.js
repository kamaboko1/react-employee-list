import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Employees from './components/employees/Employees';
import AddEmployee from './components/employees/AddEmployee';
import EditEmployee from './components/employees/EditEmployee';
import ErrorPage from './components/layout/ErrorPage';



import { Provider } from './context';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider >
        <Router >
          <div className="App">
            <div className="app-wrapper">
            <Header />
            <Switch >
                <Route exact path="/" component={Employees}/>
                <Route exact path="/employee/add" component={AddEmployee}/>
                <Route exact path="/employee/edit/:id" component={EditEmployee}/>
                <Route component={ErrorPage}/>
            </Switch>
            </div>
          </div>
       </Router>
      </Provider>
    );
  }
}

export default App;
