import { Link, useLocation } from 'react-router-dom';
import React, { useState } from "react";
import './Header.css';
import closeIcon from "../../images/close.svg";
import iconoLogout from "../../images/icono-logout.png";



function Header({ loggedIn, theme, onLogout, userName, onLoginClick, onRegisterClick }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`header header--${theme} ${loggedIn ? "logged-in" : ""}`}>
      <div className="header__container">
        
        <div className="header-logo" onClick={() => navigate("/")}>
          NewsExplorer
        </div>

       
        <button className="header__burger" onClick={toggleMenu}>
          {isMenuOpen ? (
            <img className="header__burger-close" src={closeIcon} alt="Cerrar menú" />
          ) : (
            <>
              <span className="header__burger-line"></span>
              <span className="header__burger-line"></span>
            </>
          )}
        </button>

       
        <nav className="header__nav-desktop">
          {loggedIn ? (
            <>
              <a href="/" className="header__nav-link">Inicio</a>
              <a href="/saved-news" className="header__nav-link">Artículos guardados</a>
              <div className="header__user">
                <span className="header__user-name">{userName}</span>
                <img
                  src={iconoLogout}
                  className="header__logout"
                  alt="Cerrar sesión"
                  onClick={onLogout}
                />
              </div>
            </>
          ) : (
            <>
              <a href="/" className="header__nav-link">Inicio</a>
              <button className="header__login" onClick={onLoginClick}>
                Iniciar sesión
              </button>
            </>
          )}
        </nav>

      
        {isMenuOpen && (
          <div className="header__nav-mobile">
            {loggedIn ? (
              <>
                <a href="/" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>Inicio</a>
                <a href="/saved-news" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>Artículos guardados</a>
                <div className="header__user">
                  <span className="header__user-name">{userName}</span>
                  <img
                    src={iconoLogout}
                    className="header__logout"
                    alt="Cerrar sesión"
                    onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  />
                </div>
              </>
            ) : (
              <>
                <a href="/" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>Inicio</a>
                <button className="header__login" onClick={onLoginClick}>
                  Iniciar sesión
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="header__image-line"></div>
    </header>
  );
}


export default Header;

