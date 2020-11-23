import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import logo from "../p1.jpg";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct, listProducts } from "../actions/productActions";
import Product from "../components/Product";

export default function ProductScreen(props) {
  // const product = data.products.find((x) => x._id === props.match.params.id);
  // props.match.params.id is the id the user enters in the route
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  // let newprod = products.find((x) =>x.id ===props.match.params.id )

  // console.log(props.match.params.id);

  const URLid = parseInt(props.match.params.id);
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    props.history.push(`/cart/${URLid}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        // the below error appears in {props.children}
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) =>
            product.id === URLid ? (
              <div key={product.id}>
                <Link to="/">Back to result</Link>
                <div className="row top">
                  <div className="col-2">
                    <img className="large" src={logo} alt={product.itemName} />
                  </div>
                  <div className="col-1">
                    <ul>
                      <li>
                        <h1>{product.itemName}</h1>
                      </li>
                      <li></li>
                      <li>Price: ${product.itemPrice}</li>
                      <li>Description: {product.itemDescription}</li>
                    </ul>
                  </div>
                  <div className="col-1">
                    <div className="card card-body">
                      <ul>
                        <li>
                          <div className="row">
                            <div>Price</div>
                            <div className="price">${product.itemPrice}</div>
                          </div>
                        </li>
                        <li>
                          <div className="row">
                            <div>Status</div>
                            <div>
                              {product.quantity > 0 ? (
                                <span className="success">In Stock</span>
                              ) : (
                                <span className="danger">Unavailable</span>
                              )}
                            </div>
                          </div>
                        </li>
                        {product.quantity > 0 && (
                          <>
                            <li>
                              <div className="row">
                                <div>Qty</div>
                                <div>
                                  <select
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                  >
                                    {[...Array(product.quantity).keys()].map(
                                      (x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              </div>
                            </li>
                            <li>
                              <button
                                className="primary block"
                                onClick={addToCartHandler}
                              >
                                Add to Cart
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
