import React, { useState } from 'react';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react'; 
import './Checkout.css'; 

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    address2: '',
    country: '',
    state: '',
    zip: '',
    sameAddress: false,
    saveInfo: false,
    paymentMethod: 'credit',
    ccName: '',
    ccNumber: '',
    ccExpiration: '',
    ccCvv: '',
    upiId: '', // Add UPI ID state
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Checkout Successful',
      text: 'Your checkout process has been completed successfully!',
    });
  };

  return (
    <div className="container">
      <main className="checkout-main">
        <div className="checkout-row">
          <div className="checkout-column">
            <h4 className="mb-3">Billing Address</h4>
            <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <section className='address-section'>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      required
                    />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="1234 Main St"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Apartment or suite"
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">State</label>
                  <select
                    className="form-select"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="sameAddress"
                  name="sameAddress"
                  checked={formData.sameAddress}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="sameAddress">Shipping address is the same as my billing address</label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="saveInfo">Save this information for next time</label>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Payment</h4>
              </section>
<section className='payment-section'>
              <div className="my-3">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="credit">Credit card</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="debit"
                    name="paymentMethod"
                    value="debit"
                    checked={formData.paymentMethod === 'debit'}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="debit">Debit card</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="paypal">PayPal</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="upi">UPI</label>
                </div>
              </div>

              {formData.paymentMethod === 'upi' && (
                <div className="mb-3">
                  <label htmlFor="upiId" className="form-label">UPI ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="your-upi-id@bank"
                    required
                  />
                  <div className="invalid-feedback">
                    UPI ID is required.
                  </div>
                  <QRCode value={formData.upiId} className="qr-code" />
                </div>
              )}

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="ccName" className="form-label">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ccName"
                    name="ccName"
                    value={formData.ccName}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <small className="text-muted">Full name as displayed on card</small>
                  <div className="invalid-feedback">
                    Name on card is required.
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="ccNumber" className="form-label">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ccNumber"
                    name="ccNumber"
                    value={formData.ccNumber}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Credit card number is required.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="ccExpiration" className="form-label">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ccExpiration"
                    name="ccExpiration"
                    value={formData.ccExpiration}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Expiration date required.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="ccCvv" className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ccCvv"
                    name="ccCvv"
                    value={formData.ccCvv}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Security code required.
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
              </section>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
