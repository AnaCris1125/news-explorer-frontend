import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Register.css"
import close from "../../images/close.svg";


function Register({ isOpen, onRegister, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [nameError, setnameError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password, usuario);
  };

  return (
    <div className={`popupRegister ${isOpen ? "popupRegister__opened" : ""}`}>
      <div className="popupRegister__container">
        <button type="button" onClick={onClose}>
          <img className="popupRegister__close" src={close} alt="Cerrar popup" />
        </button>

        <h2 className="popupRegister__title">Inscribirse</h2>

        <form className="popupRegister__form" onSubmit={handleSubmit} noValidate>
          <label className="popupRegister__field">
            Correo electronico
          </label>
          <input
            type="email"
            className="popupRegister__input"
            placeholder="Correo electrónico"
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
          <span className='popupRegister__input-error' id='email-error'>{emailError}</span>

          <label className="popupRegister__field">
            Contraseña
          </label>
          <input
            type="password"
            className="popupRegister__input"
            placeholder="Contraseña"
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
          <span className='popupRegister__input-error' id='password-error'>{passwordError}</span>

          <label className="popupRegister__field">
            Nombre de usuario
          </label>
          <input
            type="texto"
            className="popupRegister__input"
            placeholder="Nombre de usuario"
            value={usuario}
            id='name'
            name='name'
            onChange={(e) => {
              setUsuario(e.target.value)
              setnameError(e.target.validationMessage);
              setIsFormValid(e.target.closest("form").checkValidity());
            }}
            required
          />
          <span className='popupRegister__input-error' id='name-error'>{nameError}</span>

          <button className={`popupRegister__submit ${!isFormValid ? "popupRegister__submit_disabled" : ""}`} disabled={!isFormValid} type="submit">
            Inscribirse
          </button>
        </form>
        <p className="popupRegister__text">
          o <Link to="/signin" className="popupRegister__link">inscribirse</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;