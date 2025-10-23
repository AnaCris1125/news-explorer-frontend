import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import SavedNews from './components/SavedNews/SavedNews';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import NewsCardList from './components/NewsCardList/NewsCardList';
import InfoTooltip from './components/InfoTooltip/InfoTooltip';
import Preloader from './components/Preloader/Preloader';
import SearchForm from './components/SearchForm/SearchForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { checkToken, authorize, register } from './utils/auth';
import * as auth from './utils/auth';
import "./App.css";
import { thirdPartyApi } from './utils/ThirdPartyApi';


function App() {
  const [articles, setArticles] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentUser, setCurrentUser] = useState(null);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Verificar token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const storedName = localStorage.getItem("name");
    if (token) {
      checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser({
            name: storedName || res.data?.name || res.data?.email,
            email: res.data?.email,
          });
          if (location.pathname === "/signin" || location.pathname === "/signup") {
            navigate("/");
          }
        })
        .catch(console.error);
    }
  }, [navigate, location]);

  useEffect(() => {
    if (currentUser) {
      const key = `savedCards_${currentUser.name}`;
      const userCards = JSON.parse(localStorage.getItem(key)) || [];
      setSavedCards(userCards);
    } else {
      setSavedCards([]);
    }
  }, [currentUser]);


  // Funciones para abrir/cerrar popups
  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };
  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };
  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleRegister = (email, password, usuario) => {
    register(email, password)
      .then((res) => {
        localStorage.setItem("displayName", usuario);
        setCurrentUser({
          name: usuario,
          email: res.data?.email,
        });

        setIsRegisterSuccess(true);
        setIsTooltipOpen(true);
        closeAllPopups();
        navigate("/");
      })
      .catch((err) => {
        console.error("Error en registro:", err);
        setIsRegisterSuccess(false);
        setIsTooltipOpen(true);
      });
  };


  // Login y logout
  const handleLogin = (email, password) => {
    authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          const usuario = localStorage.getItem("displayName") || email;
          setCurrentUser({
            name: usuario,
            email: email,
          });

          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          setArticles([]);
          setError(null);
          closeAllPopups();
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error en login:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleSearch = (query) => {
    if (!query) {
      setError("Por favor, introduzca una palabra clave");
      return;
    }

    setLoading(true);
    setError("");
    thirdPartyApi
      .searchNews(query)
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde."
        );
      })
      .finally(() => setLoading(false));
  };

  const handleSaveCard = (article, keyword) => {
    if (!currentUser) return;

    const key = `savedCards_${currentUser.name}`;
    const prevCards = JSON.parse(localStorage.getItem(key)) || [];

    // Solo guardamos si no existe
    if (!prevCards.some(a => a.title === article.title)) {
      const newCard = { ...article, keyword }; // <- guardamos la keyword aquí
      const newCards = [...prevCards, newCard];
      localStorage.setItem(key, JSON.stringify(newCards));
      setSavedCards(newCards);
    }
  };

  const handleDeleteCard = (article) => {
    setSavedCards(prev => prev.filter(a => a.title !== article.title));
  };


  return (
    <>
      {/* Contenido principal */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero">
                {/* Header solo si no hay popup abierto */}
                {!isLoginOpen && !isRegisterOpen && (
                  <Header
                    loggedIn={loggedIn}
                    onLogout={handleLogout}
                    userName={currentUser?.name}
                    onLoginClick={openLogin}
                    onRegisterClick={openRegister}
                  />
                )}
                <SearchForm onSearch={handleSearch} />
              </section>

              {/* Contenedor para resultados */}
              {(articles.length > 0 || error) && (
                <section className="results">
                {loading && <Preloader />}
              
                {!loading && articles.length > 0 && (
                  <NewsCardList
                    articles={articles}
                    loggedIn={loggedIn}
                    savedCards={savedCards}
                    onSaveCard={handleSaveCard}
                    onDeleteCard={handleDeleteCard}
                  />
                )}
              
                {!loading && error && <p className="error-message">{error}</p>}
              </section>
         
              )}
              <section className='about__section'>
                <About />
              </section>
            </>
          }
        />
        <Route
          path="/saved-news"
          element={
            <>
              <Header
                loggedIn={loggedIn}
                onLogout={handleLogout}
                userName={currentUser?.name}
                onLoginClick={openLogin}
                onRegisterClick={openRegister}
                theme="light"
              />
              <SavedNews
                articles={savedCards}
                currentUser={currentUser}
                loggedIn={loggedIn}
                onDeleteCard={handleDeleteCard}
              />
            </>
          }
        />
      </Routes>

      {/* Popups */}
      {isLoginOpen && (
        <Login
          isOpen={isLoginOpen}
          onClose={closeAllPopups}
          onLogin={handleLogin}
          onRegisterClick={openRegister}
        />
      )}

      {isRegisterOpen && (
        <Register
          isOpen={isRegisterOpen}
          onClose={closeAllPopups}
          onLoginClick={openRegister}
          onRegister={handleRegister}
        />
      )}

      {isTooltipOpen && (
        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isRegisterSuccess}
          onClose={() => setIsTooltipOpen(false)}
          onRegisterClick={openRegister}
        />
      )}

      {/* Footer solo si no hay popup abierto */}
      {!isLoginOpen && !isRegisterOpen && <Footer />}
    </>
  );
}

export default App;

