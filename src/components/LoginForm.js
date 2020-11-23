import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../actions/authActions";

import { Button, Form } from "semantic-ui-react";

const LoginForm = ({ loginFunction, userObj }) => {
  const [user, setUser] = useState({});

  const handlePassword = (event) =>
    setUser({ ...user, password: event.target.value });

  const handleEmail = (event) =>
    setUser({ ...user, email: event.target.value });

  useEffect(() => {
    console.log("The Logged in user is", userObj);
  }, [userObj]);
  console.log(user);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    loginFunction(user);
    console.log("SUBMIT LOGIN");
  };

  //if logged in redirect
  if (userObj) return <Redirect to="/" />;
  return (
    <>
      <Form
        onSubmit={handleLoginSubmit}
        style={{
          width: "50%",
          display: "block",
          content: "center",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <h1>Login</h1>
        <Form.Field>
          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleEmail}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handlePassword}
          />
        </Form.Field>
        <Button className="primary" type="submit">
          Sign In
        </Button>
        <div>
          New customer? <Link to="/register">Create your account</Link>
        </div>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({
  userObj: state.rootAuth.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    loginFunction: (userData) => dispatch(login(userData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
