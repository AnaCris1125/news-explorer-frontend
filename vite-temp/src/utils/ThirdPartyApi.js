export class ThirdPartyApi {
  constructor() {
    this._baseUrl = 'https://nomoreparties.co/news/v2';
    this._apiKey = import.meta.env.VITE_NEWS_API_KEY;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return res.text().then(text => Promise.reject(`Error ${res.status}: ${text}`));
  }

  async searchNews(query) {
    if (!query) {
      return Promise.reject('Por favor, introduzca una palabra clave');
    }

    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 7); // últimos 7 días

    const fromStr = from.toISOString().split('T')[0];
    const toStr = to.toISOString().split('T')[0];

    const url = `${this._baseUrl}/everything?q=${encodeURIComponent(
      query
    )}&from=${fromStr}&to=${toStr}&pageSize=100&language=es&sortBy=publishedAt&apiKey=${this._apiKey}`;

    const res = await fetch(url);
    return this._checkResponse(res);
  }
}

// Exportamos la instancia para usar en la app
export const thirdPartyApi = new ThirdPartyApi();