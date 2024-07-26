import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaRegUserCircle, FaCartArrowDown } from 'react-icons/fa';
import Profile from './Auth/Profile';

function Header({ cartCount, userName, searchQuery, setSearchQuery, isAuthenticated }) {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  useEffect(() => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));
  }, []);

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">𝐌𝐫𝐂𝐨𝐝𝐞𝐱𝐱 </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto d-flex align-items-center">
          <FaRegUserCircle
            size={32}
            className='UserIcon'
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={`Welcome, ${userName}`}
            onClick={handleProfileClick}
          />
          <Link to="/cart" className="btn btn-outline-primary position-relative">
            <FaCartArrowDown />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                <span className='count'> {cartCount}</span>
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </Link>
        </div>
      </nav>
      {showProfile && (
        <Profile userName={userName} onClose={handleCloseProfile} isAuthenticated={isAuthenticated} />
      )}
    </header>
  );
}

export default Header;
