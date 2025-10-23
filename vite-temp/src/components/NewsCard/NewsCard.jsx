import React, { useState, useEffect } from 'react';
// import { api } from '../../utils/api';
import './NewsCard.css';



function NewsCard({ article, loggedIn, isSaved, onSaveCard, onDeleteCard, onLoginClick, isSavedPage = false }) {
  const { source, title, publishedAt, description, urlToImage } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleSaveClick = () => {
  
    if (!loggedIn) {
      if (onLoginClick) onLoginClick();
      return;
    }

    if (isSaved) {
      onDeleteCard(article, currentSearchKeyword);
    } else {
      console.log("💾 Guardando nuevo artículo...");
      onSaveCard(article, article.keyword);
    }
  };


  return (
    <div className="news__card">
      <img src={urlToImage} alt={title} className="news__card-image" />
      <div className="news__card-content">
        <p className="news__card-date">{formattedDate}</p>
        <h3 className="news__card-title">{title}</h3>
        <p className="news__card-description">{description}</p>
        <p className="news__card-source">{source.name}</p>

        {isSavedPage ? (
          
          <button
            className="news__card-btn news__card-delete_btn"
            onClick={() => onDeleteCard(article)}
          >
          </button>
        ) : (
       
          <button
            className={`news__card-save_btn ${isSaved ? "news__card-save_btn--active" : ""}`}
            onClick={handleSaveClick}
          >
            {!loggedIn && (
              <span className="news__card-tooltip">Inicia sesión para guardar artículos</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default NewsCard;