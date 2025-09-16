import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav__link">Inicio</NavLink>
      <NavLink to="/saved-news" className="nav__link">Guardados</NavLink>
      <NavLink to="/about" className="nav__link">Sobre mí</NavLink>
    </nav>
  );
}

export default Navigation;