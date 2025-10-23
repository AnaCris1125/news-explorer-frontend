import React, { useState } from 'react';
import './SearchForm.css';


function SearchForm({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };



  return (
    <section className="search-section">
      <h1 className="search-title">¿Qué está pasando en el mundo?</h1>
      <p className='search-paragraph'>Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.</p>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Introduce un tema"
          className="search-input"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </section>
  );
}

export default SearchForm;