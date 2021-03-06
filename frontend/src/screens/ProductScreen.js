import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  },[dispatch, props.match.params.id]);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to shopping</Link>
      </div>
      {loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
        <div className="details">
          <div className="details-image">
            <ul className="slides">
              <li id="slide1">
                <img src={product.image} alt="product" />
              </li>
              <li id="slide2">
                <img src={product.detailImage1} alt="product" />
              </li>
              <li id="slide3">
                <img src={product.detailImage2} alt="product" />
              </li>
              <li id="slide4">
                <img src={product.detailImage3} alt="product" />
              </li>
            </ul>

            <ul className="thumbnails">
              <li>
                <a href="#slide1">
                  <img src={product.image} alt="thumbnail" />
                </a>
              </li>
              <li>
                <a href="#slide2">
                  <img src={product.detailImage1} alt="thumbnail" />
                </a>
              </li>
              <li>
                <a href="#slide3">
                  <img src={product.detailImage2} alt="thumbnail" />
                </a>
              </li>
              <li>
                <a href="#slide4">
                  <img src={product.detailImage3} alt="thumbnail" />
                </a>
              </li>
            </ul>
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                Location: <b>{product.location}</b>
              </li>
              <li>
                Condition: <b>{product.condition}</b>
              </li>
              <li>
                Price: <b>??{product.price}</b>
              </li>
              <li>
                Color: <b>{product.color}</b>
              </li>
              <li>
                Payment Options: <b>{product.PaymentOptions}</b>
              </li>
            </ul>
            <div className="details-action">
              <ul>
                <li>Price: ??{product.price}</li>
                <li>
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "We're Sorry, Item is unavailable."}
                </li>
                <li>
                  Qty:{" "}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
