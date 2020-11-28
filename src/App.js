import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import { BrowserRouter, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginForm from "./components/LoginForm";
import ProductScreen from "./screens/ProductScreen";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "semantic-ui-css/semantic.min.css";

import { connect } from "react-redux";

import { logout } from "./actions/authActions";
import OrderScreen from "./screens/OrderScreen";

function App({ userObj, logoutFunction }) {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Ecommerce
            </Link>
          </div>

          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userObj ? (
              <>
                <button variant="outline-info" onClick={() => logoutFunction()}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="ui button" to="/register">
                  Register
                </Link>
                <Link className="ui button" to="/signin">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </header>
        <main>
          <Route path="/register" component={RegistrationForm} />
          <Route path="/signin" component={LoginForm} />
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  userObj: state.rootAuth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutFunction: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
