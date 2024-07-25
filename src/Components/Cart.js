// Cart.js
import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { GoPlus, GoDash } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import EmptyCard from "./EmptyCard";

function Cart({ cartItems, setCartItems }) {
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert("Checkout not implemented");
  };

  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      handleQuantityChange(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      handleQuantityChange(id, item.quantity - 1);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity * 81.24,
    0
  );

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <EmptyCard/>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="row cart-wrapper">
                <div className="item-side col-sm-8 col-md-8">
                  <div className="cart-table-container">
                    <table className="table table-cart">
                      <thead>
                        <tr>
                          <th className="thumbnail-col"></th>
                          <th className="product-col">Product</th>
                          <th className="price-col">Price</th>
                          <th className="qty-col">Quantity</th>
                          <th className="text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id} className="product-row">
                            <td>
                              <figure className="product-image-container">
                                <a href="#!" className="product-image">
                                  <img src={item.image} alt={item.title} />
                                </a>
                                <button
                                  className="btn-remove icon-cancel"
                                  title="Remove Product"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <MdCancel />
                                </button>
                              </figure>
                            </td>
                            <td className="product-col">
                              <h5 className="product-title">
                                <Link to={`/product/${item.id}`}>
                                  {item.title}
                                </Link>
                              </h5>
                            </td>
                            <td>₹{(item.price * 81.24).toFixed(2)}</td>
                            <td>
                              <div className="quantity-wrapper">
                                <div className="input-group">
                                  <span className="input-group-btn">
                                    <button
                                      className="btn btn-default btn-number"
                                      onClick={() => decreaseQuantity(item.id)}
                                    >
                                      <GoDash />
                                    </button>
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control input-number"
                                    value={item.quantity}
                                    min="1"
                                    readOnly
                                  />
                                  <span className="input-group-btn">
                                    <button
                                      className="btn btn-default btn-number"
                                      onClick={() => increaseQuantity(item.id)}
                                    >
                                      <GoPlus />
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <span className="subtotal-price">
                                ₹{(item.price * item.quantity * 81.24).toFixed(
                                  2
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-sm-4 col-md-4">
                  <div className="cart-summary">
                    <h3>Cart</h3>
                    <table className="table table-totals">
                      <tbody>
                        <tr>
                          <td>Subtotal</td>
                          <td>₹{subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="text-left promo-code-area">
                            <h3>Promo Code</h3>
                            <div className="cart-discount">
                              <form action="#">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Coupon Code"
                                    required
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className="btn apply-coupon-btn"
                                      type="submit"
                                    >
                                      Apply Coupon
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-shop btn-update-total"
                            >
                              Update Totals
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>Other charges</td>
                          <td>₹0.00</td>
                        </tr>
                        <tr>
                          <td>Delivery charges</td>
                          <td>₹0.00</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Total</b>
                          </td>
                          <td>
                            <b>₹{subtotal.toFixed(2)}</b>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="checkout-methods">
                      <button
                        onClick={handleCheckout}
                        className="btn btn-block btn-dark"
                      >
                        Proceed to Checkout <RiArrowRightDoubleFill />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
