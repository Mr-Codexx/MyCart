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
import WatchPage from './Components/Product/WatchPage/WatchPage';
import ShoesPage from './Components/Product/ShoesPage/ShoesPage';
import BagsPage from './Components/Product/BagPage/BagsPage';
import NoPage from './Components/Errors/NoPage';
import Register from './Components/Auth/Register';
import Profile from './Components/Auth/Profile';
import LoginPage from './Components/Auth/Login';
import RegisterPage from './Components/Auth/Register';
import Test from './Components/TEST'
import Footer from './Components/Footer/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleLogin = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  const handleRegister = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  useEffect(() => {
    // Retrieve user info from localStorage on app load
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <CartProvider>
         <Header cartCount={cartItems.length} userName={userName} />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/login" element={<LoginPage onLogin={(name) => handleLogin(name)} />} />
            <Route path="/register" element={<RegisterPage onRegister={(name) => handleRegister(name)} />} />
            <Route path="/products" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/product/:id" element={<ProductDetail setCartItems={setCartItems} />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bags" element={<BagsPage />} />
            <Route path="/shoes" element={<ShoesPage />} />
            <Route path="/watches" element={<WatchPage cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="*" element={<NoPage />} />
            <Route path='test' element={<Test/>}/>
          </Routes>
        </div>
        <Footer/>
      </CartProvider>
    </>
  );
}

export default App;