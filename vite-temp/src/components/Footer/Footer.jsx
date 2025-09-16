import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} News Explorer</p>
    </footer>
  );
}

export default Footer;