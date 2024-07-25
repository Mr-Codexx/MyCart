import React from 'react';
// import './ProductCard.css'; // Assuming you'll create this CSS file

const ProductCard = () => {
  return (
    <div className="">
      <div className="outer">
        <div className="content animated fadeInLeft">
          <span className="bg animated fadeInDown">EXCLUSIVE</span>
          <h1>Afro<br /> baseball hair</h1>
          <p>Shadow your real allegiance to New York's Pirate radio with this cool cap featuring the Graphic Know Wave logo.</p>
          
          <div className="button">
            <a href="#">$115</a>
            <a className="cart-btn" href="#"><i className="cart-icon ion-bag"></i>ADD TO CART</a>
          </div>
        </div>
        <img src="https://bit.ly/2kOzUTm" width="300px" className="animated fadeInRight" alt="Product" />
      </div>
      <p className="footer">Based on the Silk UI Kit - DesignModo Market</p>
    </div>
  );
};

export default ProductCard;
