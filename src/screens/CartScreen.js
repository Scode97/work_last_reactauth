import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  const { cartItems } = cart;

  const quan = cart.cartItems.map((quan) => ({
    quantity: quan.data.quantity,
    price: quan.data.itemPrice,
    id: parseInt(quan.product),
  }));
  // console.log(quan, "this is d");
  // console.log("this", quan);
  // const price = cart.cartItems.map((p) => p.data.itemPrice);
  // const id = cart.cartItems.map((p) => parseInt(p.product));

  const dispatch = useDispatch();
  // const placeOrderHandler = () => {
  //   dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  // };
  const price = cart.cartItems.reduce(
    (a, c) => a + c.data.itemPrice * c.qty,
    0
  );
  const list = {
    items: quan,
    date: secondsSinceEpoch,
    totalPrice: price,
  };
  const placeOrderHandler = () => {
    // console.log("one");
    dispatch(createOrder(list));
    // console.log(dispatch(createOrder(list)));
  };

  // const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  // let item;
  // console.log(cart.cartItems);
  // cart.cartItems.forEach(element => {
  //   if (productId===element.id){

  //     item=element;
  //     item.quantity=qty
  //   }
  // });
  // console.log(item)

  //   cart.forEach(function(message){
  //     console.log(message)
  // });

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <br></br>
            <Link to="/">Go Back To Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {/* {console.log("cartItems", cartItems)} */}
            {cartItems.map((item) => (
              // console.log(`itemName: ${item.data.itemName}, itemQuan: ${item.qty}`)

              <li key={item.product}>
                <div className="row card">
                  <div className="min-30">
                    <Link
                      style={{ color: "black" }}
                      to={`/product/${item.product}`}
                    >
                      {item.data.itemName}
                    </Link>
                  </div>
                  <div style={{ margin: 7 }}>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.data.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.qty * item.data.itemPrice}</div>

                  <div>
                    <button
                      type="button"
                      style={{ margin: 7 }}
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.data.itemPrice * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                className="primary block"
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0}
              >
                Place Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
