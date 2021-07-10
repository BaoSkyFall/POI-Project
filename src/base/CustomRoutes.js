import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { verify } from "../services/account.services";
import { MyStore } from "../";

export const SRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (window.location.href.endsWith("/home")) {
          return (
            <div id="wrapper" className="wrapper-with-transparent-header">
              <header
                id="header-container"
                className="fullwidth transparent-header"
              >
                <Header></Header>
              </header>
              <div className="clearfix" />

              <div className="content">
                <Component {...props}></Component>
              </div>

              <Footer></Footer>
            </div>
          );
        } else {
          return (
            <div id="wrapper">
              <header id="header-container" className="fullwidth">
                <Header></Header>
              </header>
              <div className="clearfix" />

              <div className="content">
                <Component {...props}></Component>
              </div>

              <Footer></Footer>
            </div>
          );
        }
      }}
    ></Route>
  );
};

export class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isAuthorized: false,
    };
  }

  componentWillMount() {
    verify()
      .then((res) => {
        this.setState({ isLoaded: true, isAuthorized: true });
      })
      .catch((err) => {
        this.setState({ isLoaded: true, isAuthorized: false });
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (!this.state.isLoaded) {
      return (
        <div className="text-center p-5">
          <div className="border border-primary p-5">
            <div>
              Chúng tôi đang tiến hành kiểm tra thông tin tài khoản của bạn
            </div>
            <div>Vui lòng đợi ...</div>
            <br></br>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else if (this.state.isAuthorized) {
      return (
        <Route
          {...rest}
          render={(props) => {
            return (
              <div id="wrapper">
                <header id="header-container" className="fullwidth">
                  <Header></Header>
                </header>
                <div className="clearfix" />

                <div className="content">
                  <Component {...props}></Component>
                </div>

                <Footer></Footer>
              </div>
            );
          }}
        ></Route>
      );
    } else {
      return <Redirect to="./login"></Redirect>;
    }
  }
}
