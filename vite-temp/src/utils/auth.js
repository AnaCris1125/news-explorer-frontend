const baseUrl = "https://se-register-api.en.tripleten-services.com/v1";

export const register = (email, password, usuario) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, usuario }),
    }).then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Error en el registro: ${res.status}`);
    });
  };
  

  export const authorize = ({ email, password }) => {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(handleResponse('login'));
  };
  

  export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(handleResponse('validación de token'));
  };
  

  function handleResponse(context) {
    return (res) => {
      if (res.ok) return res.json();
      return res.text().then((text) => {
        throw new Error(`Error en ${context}: ${res.status} - ${text}`);
      });
    };
  }