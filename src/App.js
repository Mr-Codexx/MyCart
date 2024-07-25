import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import ShoppingCart from './Components/ShoppingCart';
import Cart from './Components/Cart';
import './App.css';
import ProductCard from './Components/Product/ProductCard';
import ProductList from './Components/Product/ProductList'; 
import ProductDetail from './Components/Product/ProductDetail'; 
import About from './Components/About';
import Checkout from './Components/Checkout/Checkout';
import Home from './Components/Home/Home';
import { CartProvider } from './Components/Home/CartContext';
import Login from './Components/Auth/Login';
import ScreenLoader from './Components/Auth/ScreenLoader';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return <ScreenLoader />;
  }


  const userName = "John Doe"; // Replace with dynamic user name if needed

  return (
    <>
    <CartProvider>
      <Header cartCount={cartItems.length} userName={userName} />
      <div className="container mt-5">
        <Routes>
        <Route
            path="/"
            element={<Home cartItems={cartItems} setCartItems={setCartItems}  />} 
          />
          <Route
            path="/login"
            element={<Login />} 
          />
          <Route
            path="/products"
            element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail setCartItems={setCartItems} />} // Route for product detail page
          />
          <Route
            path="/about"
            element={<About />} 
          />
          <Route
            path="/checkout"
            element={<Checkout />} 
          />
        </Routes>
      </div>
      </CartProvider>
    </>
  );
}

export default App;
