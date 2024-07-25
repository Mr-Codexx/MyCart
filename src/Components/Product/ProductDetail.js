import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ cartItems, setCartItems }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = () => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Update quantity if item already exists in cart
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleBackToProducts = () => {
    navigate('/products');
  };

  if (!product) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-sm-12 col-md-4 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src={product.image}
            className="img-fluid rounded-3"
            alt={product.title}
            style={{ maxHeight: '200px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-sm-12 col-md-8">
          <h2 className="fw-bold">{product.title}</h2>
          <p className="text-muted">Price: ₹{(product.price * 81.24).toFixed(2)}</p>
          <p className="text-muted">{product.description}</p>
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleBackToProducts}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
