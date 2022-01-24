export default class Api {
  constructor({baseUrl, headers}) {
    this._link = baseUrl;
    this._headers = headers;
    this._token = headers.authorization;
  }

  _processResult(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      method: 'GET', 
      headers: this._headers
    })
      .then(res => this._processResult(res))
  }

  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      method: 'GET', 
      headers: this._headers
    })
      .then(res => this._processResult(res)) 
  }

  getFullData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  changeProfile({name, about}) {
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH', 
      headers: this._headers, 
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._processResult(res))
  }

  changeAvatar(item) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(res => this._processResult(res))
  }

  addCard(item) {
    return fetch(`${this._link}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(res => this._processResult(res))
  }

  putLikeCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._processResult(res))
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._processResult(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._processResult(res))
  }
}