import React, { useEffect } from "react";
import Product from "../components/Product";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  // const [products, setProducts] = useState([]);
  // // by default: no loading, no error
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      // the below error appears in {props.children}
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div className="row center">
        {products.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    )}
  </div>
  );
}
