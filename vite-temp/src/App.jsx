import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../vite-temp/src/components/Header/Header';
import Main from '../vite-temp/src/components/Main/Main';
import About from '../vite-temp/src/components/About/About';
import Footer from '../vite-temp/src/components/Footer/Footer';
import SavedNews from '../vite-temp/src/components/SavedNews/SavedNews';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
