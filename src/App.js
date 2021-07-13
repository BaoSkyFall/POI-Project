import React, { Component } from "react";
import {  Route, Switch } from "react-router-dom";
import "./App.css";

import SignIn from "./containers/auth/signin";
// import SignUp from './containers/auth/signup';
import Dashboard from "./components/customer/index/index";
import StaffPage from "./containers/staff/staff";
import ForgetPassword from "./containers/auth/forgetPassword";

class App extends Component {
  render() {
    return (
      <Switch>
        {/* <Route exact path='/' component={SignIn}  /> */}
        <Route exact path="/" render={() => <SignIn />} />
        <Route
          exact
          path="/forget-password"
          render={() => <ForgetPassword />}
        />

        {/* <Route path='/signin' render={() => <SignIn />} />
        <Route path='/signup' render={() => <SignUp />} />  */}
        <Route exact path="/dashboard/:type" component={Dashboard} />
        <Route exact path="/staff/:type" component={StaffPage} />
      </Switch>
    );
  }
}

export default App;
