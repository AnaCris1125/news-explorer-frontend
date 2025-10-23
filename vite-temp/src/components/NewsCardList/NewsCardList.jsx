import React, { useState } from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import './NewsCardList.css';


function NewsCardList({
  articles,
  loggedIn,
  savedCards = [],
  onSaveCard,
  onDeleteCard,
  onLoginClick,
  currentSearchKeyword,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  

  return (
    <section className="news__card-list">
      <p className='news__card-list_resultados'>Resultados de la busqueda</p>
      <div className="news__card-list_grid">
        {articles.slice(0, visibleCount).map((article, index) => (
          <NewsCard
          key={index}
          article={article}
          loggedIn={loggedIn}
          isSaved={savedCards.some(a => a.title === article.title)}
          onSaveCard={(art) => onSaveCard(art, currentSearchKeyword)}
          onDeleteCard={onDeleteCard}
          onLoginClick={onLoginClick}
          />
        ))}
      </div>

      {visibleCount < articles.length && (
        <button className="ver-mas__button" onClick={handleShowMore}>
          Ver más
        </button>
      )}
    </section>
  );
}

export default NewsCardList;