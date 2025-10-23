import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Fondo from "../../images/imagen-fondo-app.jpg";

function Main({ isLoggedIn, userName }) {
  return (
    <>
      <main className='content' style={{ backgroundImage: `url(${Fondo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100%',  }}>
        <Header isLoggedIn={isLoggedIn} userName={userName} />
        <SearchForm />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default Main;
