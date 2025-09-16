import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo">News Explorer</h1>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;