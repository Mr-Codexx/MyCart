import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Make sure to import SweetAlert
import './ShoppingCart.css';

function ShoppingCart({ cartItems, setCartItems }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json);
        const uniqueCategories = [...new Set(json.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const filtered = products
      .filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product) =>
        selectedCategory ? product.category === selectedCategory : true
      )
      .filter((product) => product.rating.rate >= minRating)
      .filter((product) => product.price <= maxPrice);

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, minRating, maxPrice, products]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleBuyNow = (product) => {
    console.log('Product data:', product); // Debugging line
    addToCart(product);
    console.log(product.title);

    // Show toast notification
    Swal.fire({
      title: `${product.title} added to cart`,
      icon: 'success',
      toast: true,
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : description;
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <h4>Filters</h4>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <h5>Category</h5>
              <ul className="list-group mb-3">
                <li
                  className="list-group-item"
                  onClick={() => setSelectedCategory("")}
                >
                  All Categories
                </li>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`list-group-item ${
                      category === selectedCategory ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <h5>Rating</h5>
              <input
                type="range"
                className="form-range"
                min="0"
                max="5"
                step="0.1"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
              />
              <p>Minimum Rating: {minRating}</p>
              <h5>Price</h5>
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                value={maxPrice === Infinity ? "" : maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value) || Infinity)}
              />
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="mb-4">Shopping Cart</h1>
            <div className="row">
              {filteredProducts.length === 0 ? (
                <div className="col-12">No products found</div>
              ) : (
                filteredProducts.map((product) => (
                  <div className="col-md-6 mb-4" key={product.id}>
                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={product.image}
                            className="img-fluid rounded-start"
                            alt={product.title}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{truncateDescription(product.description)}</p>
                            <p className="card-text">
                              <small className="text-muted">Category: {product.category}</small>
                            </p>
                            <p className="card-text">
                              <strong>Price: ₹{(product.price * 81.24).toFixed(2)}</strong>
                            </p>
                            <p className="card-text">
                              Rating: {product.rating.rate} ({product.rating.count} reviews)
                            </p>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleBuyNow(product)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
