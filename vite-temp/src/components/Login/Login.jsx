import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";
import close from "../../images/close.svg";


function Login({ isOpen, onLogin, onClose, onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className={`popupLogin ${isOpen ? "popupLogin__opened" : ""}`}>
      <div className="popupLogin__container">
        <button type="button" onClick={onClose}>
          <img className="popupLogin__close" src={close} alt="Cerrar popup" />
        </button>

        <h2 className="popupLogin__title">Iniciar sesión</h2>

        <form className="popupLogin__form" onSubmit={handleSubmit} noValidate>
          <label className="popupLogin__field">Correo electrónico</label>
          <input
            type="email"
            className="popupLogin__input"
            placeholder="Introduce tu correo electrónico"
            value={email}
            id='email'
            name='email'
            onChange={(e) => {
              setEmail(e.target.value)
              setemailError(e.target.validationMessage);
              setIsFormValid(e.target.closest("form").checkValidity());
            }}
              
            required
          />
          <span className='popupLogin__input-error' id='email-error'>{emailError}</span>

          <label className="popupLogin__field">Contraseña</label>
          <input
            type="password"
            className="popupLogin__input"
            placeholder="Introduce tu contraseña"
            value={password}
            id='password'
            name='password'
            onChange={(e) => {
              setPassword(e.target.value)
              setpasswordError(e.target.validationMessage);
              setIsFormValid(e.target.closest("form").checkValidity());
            }} 
            required
          />
          <span className='popupLogin__input-error' id='password-error'>{passwordError}</span>

          <button type="submit" className={`popupLogin__submit ${!isFormValid ? "popupLogin__submit_disabled" : ""}`} disabled={!isFormValid} >
            Iniciar sesión
          </button>
        </form>

        <p className="popupLogin__text">
          o{' '}
          <button
            type="button"
            className="popupLogin__link"
            onClick={() => {
              onClose();
              onRegisterClick();
            }}
          >
            Inscribirse
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
