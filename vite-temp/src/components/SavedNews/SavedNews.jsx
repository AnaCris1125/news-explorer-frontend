import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNews.css';


function SavedNews({ articles, currentUser, loggedIn, onDeleteCard }) {

  const keywordsInOrder = [];
  articles.forEach((a) => {
    if (a.keyword && !keywordsInOrder.includes(a.keyword)) {
      keywordsInOrder.push(a.keyword);
    }
  });


  let displayedKeywords = '';
  if (keywordsInOrder.length === 1) {
    displayedKeywords = keywordsInOrder[0];
  } else if (keywordsInOrder.length === 2) {
    displayedKeywords = `${keywordsInOrder[0]}, ${keywordsInOrder[1]}`;
  } else if (keywordsInOrder.length > 2) {
    const remainingCount = keywordsInOrder.length - 2; 
    displayedKeywords = `${keywordsInOrder[0]}, ${keywordsInOrder[1]} y ${remainingCount} más`;
  }

  return (
    <main className="saved-news">
      <section className="saved-news__info">
        <h2 className="saved-news__title">Artículos Guardados</h2>
        <p className="saved-news__user">
          {currentUser ? currentUser.name : 'Usuario'}, tienes{' '}
          {articles.length} {articles.length === 1 ? 'artículo guardado' : 'artículos guardados'}
        </p>
        {displayedKeywords && (
          <p className="saved-news__keywords">
            Por palabra clave: {displayedKeywords}
          </p>
        )}
      </section>

      <section className="saved-news__cards">
        {articles.length > 0 ? (
          <div className="saved-news__cards-grid">
            {articles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                loggedIn={loggedIn}
                isSaved={true}
                onDeleteCard={onDeleteCard}
                isSavedPage={true}
              />
            ))}
          </div>
        ) : (
          <p className="saved-news__empty">No tienes artículos guardados</p>
        )}
      </section>
    </main>
  );
}

export default SavedNews;