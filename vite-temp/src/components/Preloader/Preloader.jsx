import React from 'react';
import "../Preloader/Preloader.css";

function Preloader() {
    return (
      <div className="preloader">
        <div className="spinner"></div>
        <p className="preloader__message">Buscando noticias...</p>
      </div>
    );
  }
  
  export default Preloader;