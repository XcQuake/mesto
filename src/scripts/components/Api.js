export default class Api {
  constructor({baseUrl, headers}) {
    this._link = baseUrl;
    this._headers = headers;
    this._token = headers.authorization;
  }
  
  getUserInfo() {
    return fetch(`${this._link}/users/me`, {method: 'GET', headers: this._headers})
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        return {
          name: res.name,
          description: res.about,
          link: res.avatar
        }
      })
  }

  getInitialCards() {
    return fetch(`${this._link}/cards`, {method: 'GET', headers: this._headers})
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  changeProfile(data) {
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH', 
      headers: this._headers, 
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
  }

  changeAvatar(item) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: 'PATCH', 
      headers: this._headers, 
      body: JSON.stringify({
        avatar: item.link
      })
    })
  }

  }
}