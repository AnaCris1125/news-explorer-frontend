import React from 'react';
import './Footer.css';
import GitHub from "../../images/github.png";
import Facebook from "../../images/facebook.png";

function Footer() {
  return (
    <footer className="footer">
      <div className='nav'>
        <a href="/" className='footer-nav'>Inicio</a>
        <p className='footer-nav'>Practicum</p>
      </div>
      
      <img className='footer-icono' src={GitHub} alt="Icono GitHub" />
      <img className='footer-icono' src={Facebook} alt="Icono Facebbok" />
      

      <p className="footer-copyright">&#169; 2025 Supersite, Powered by News API</p>
    </footer>
  )
}

export default Footer