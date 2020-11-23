import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signup } from "../actions/authActions";
import { Button, Form } from "semantic-ui-react";
import store from "../store";

const RegisterationForm = ({ registerFunction, userObj }) => {
  const [equal, setEqual] = useState(true);

  const [user, setUser] = useState({
    password: "",
    repeatPassword: "",
  });

  // console.log("User", user);

  const handleUserName = (event) =>
    setUser({ ...user, name: event.target.value });
  const handleEmail = (event) =>
    setUser({ ...user, email: event.target.value });
  const handlePassword = (event) =>
    setUser({ ...user, password: event.target.value });
  const handleRepeatPassword = (event) =>
    setUser({ ...user, repeatPassword: event.target.value });
  const handleRole = (event) => setUser({ ...user, role: event.target.value });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password === user.repeatPassword) {
      setEqual(true);
      registerFunction(user);
    } else {
      setEqual(false);
    }
    console.log("I am clicking submit");
    console.log("Logging user", user);
  };

  useEffect(() => {
    console.log("The Logged in user is", userObj);
  }, [userObj]);

  if (userObj) return <Redirect to="/" />;
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "50%",
          display: "block",
          content: "center",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <h1 style={{ width: "50%" }}>Register</h1>
        <Form.Field>
          <label>Username</label>
          <input
            name="username"
            placeholder="Enter username"
            onChange={handleUserName}
          />
        </Form.Field>

        <Form.Field>
          <label>Email Address</label>
          <input
            name="email"
            placeholder="Enter email"
            onChange={handleEmail}
          />
        </Form.Field>

        <Form.Field>
          <label>Password</label>

          <input
            name="password"
            placeholder="Enter Password"
            onChange={handlePassword}
          />
        </Form.Field>

        <Form.Field>
          <label>Confirm password</label>

          <input
            name="password_confirmation"
            placeholder="Please Repeat Password"
            onChange={handleRepeatPassword}
          />
        </Form.Field>

        {!equal ? (
          <div className="alert alert-danger" role="alert">
            Passwords don't match
          </div>
        ) : null}

        <Form.Field>
          <label>Role</label>

          <input name="role" placeholder="Enter Role" onChange={handleRole} />
        </Form.Field>

        <Form.Field>
          <Button type="submit">Register </Button>
        </Form.Field>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({
  userObj: state.rootAuth.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    registerFunction: (userData) => dispatch(signup(userData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterationForm);
