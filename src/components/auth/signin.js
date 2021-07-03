import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Row, Col, Spin, Alert, Card } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { ACCESS_TOKEN_KEY, EMAIL_KEY } from "../../configs/client";
import "./styles/signin.css";
import GoogleRecaptcha from "./captcha";
import jwt from "jwt-decode";
const FormItem = Form.Item;
class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckGoogleCaptcha: false,
    };
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFail = this.onFinishFail.bind(this);
  }
  componentDidMount() {}
  componentDidUpdate() {
    const { signinSuccess } = this.props;
    if (signinSuccess) {
      let token = localStorage.getItem(ACCESS_TOKEN_KEY);
      var decoded = jwt(token);
      console.log("decoded:", decoded);
      if (decoded.role > 1) {
        window.location.href = "/staff/register";
      } else {
        window.location.href = "/dashboard/destination-management";
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSignIn(values);
      }
    });
  };
  onFinish = (values) => {
    console.log("values:", values);

    const { handleSignIn } = this.props;
    handleSignIn(values);
  };
  onFinishFail = (err) => {
    console.log("err:", err);
  };
  render() {
    const email = localStorage.getItem(EMAIL_KEY) || "";
    const role = localStorage.getItem("role") || "";

    if (email) {
      this.props.resetStatus();
      if (role === "customer")
        return (
          <Redirect
            to={{
              pathname: "/dashboard/destination-management",
            }}
          />
        );
      else if (role === "staff") {
        return (
          <Redirect
            to={{
              pathname: "/staff/register",
            }}
          />
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/signin",
            }}
          />
        );
      }
    } else {
      if (this.props.signinSuccess) {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || "";
        this.props.verifyAccessToken(accessToken);
      }
    }

    const formLayout = (
      <React.Fragment>
        {this.props.messageError && (
          <Alert
            message="Error"
            description={this.props.messageError}
            type="error"
            showIcon
          />
        )}

        <br />
        <Form
          initialValues={{
            email: "admin@gmail.com",
            password: "admin",
            something: "1234",
          }}
          onFinish={this.onFinish}
          onFinishFail={this.onFinishFail}
        >
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </FormItem>

          {/* <FormItem name="captcha" rules={[{ required: true, message: 'Please select google recaptcha!' }]}>

                        <GoogleRecaptcha />

                    </FormItem> */}
          <FormItem>
            <a className="form-signin-forgot" href="forget-password">
              Forget password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="form-signin-button"
            >
              Sign In
            </Button>
          </FormItem>
        </Form>
      </React.Fragment>
    );

    // if(this.props.role === 'customer'){
    //     return (<Redirect to={{
    //         pathname: '/dashboard',
    //     }}/>);
    // }else if(this.props.role === 'staff'){
    //     return (<Redirect to={{
    //         pathname: '/staff',
    //     }}/>);
    // }

    return (
      <React.Fragment>
        <Card className="signIn-left"></Card>
        <Card>
          <Form onSubmit={this.handleSubmit} className="form-signin">
            <legend className="title-signin">
              <h2>Sign In</h2>
            </legend>

            {this.props.isLoading && (
              <Spin tip="Loading ..." size="large">
                {formLayout}
              </Spin>
            )}
            {!this.props.isLoading && formLayout}
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

const SignIn = SignInForm;
export default SignIn;
