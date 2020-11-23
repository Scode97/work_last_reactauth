import React from "react";
// import Rating from "./Rating";
import logo from "../p1.jpg";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  // console.log("from products", props.productId);
  return (
    <div key={product.id} className="card">
      <Link to={`/product/${product.id}`}>
        <img className="medium" src={logo} alt={product.itemName} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.id}`}>
          <h3>{product.itemName}</h3>
        </Link>
        {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
        <div className="price">${product.itemPrice}</div>
      </div>
    </div>
  );
}
