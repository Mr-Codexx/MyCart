import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";

function Header({ cartCount, userName, searchQuery, setSearchQuery }) {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg py-4">
        <Link className="navbar-brand" to="/">MyStore</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
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
          />

          {/* <span className="m-1">Welcome, {userName}</span> */}
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
    </header>
  );
}

export default Header;
