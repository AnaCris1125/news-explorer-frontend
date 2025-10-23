export class ThirdPartyApi {
  constructor(apiKey) {
    this._apiKey = apiKey;
    this._baseUrl = 'https://newsapi.org/v2';
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
    from.setDate(to.getDate() - 7);

    const url = `${this._baseUrl}/everything?q=${encodeURIComponent(query)}&from=${from
      .toISOString()
      .split('T')[0]}&to=${to.toISOString()
      .split('T')[0]}&pageSize=100&language=es&sortBy=publishedAt&apiKey=${this._apiKey}`;

    const res = await fetch(url);
    return this._checkResponse(res);
  }
}


export const thirdPartyApi = new ThirdPartyApi(import.meta.env.VITE_NEWS_API_KEY);