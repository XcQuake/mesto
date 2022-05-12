import { ApiConfig, ICardData, IUserData } from '../models/Interfaces';

export default class Api {
  private link: string;
  private headers: {
    authorization: string,
    'Content-Type': string,
  }

  constructor(config: ApiConfig) {
    this.link = config.baseUrl;
    this.headers = config.headers;
  }

  private processResult(res: Response) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(): Promise<IUserData> {
    return fetch(`${this.link}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this.processResult(res))
  }

  getInitialCards(): Promise<ICardData[]> {
    return fetch(`${this.link}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this.processResult(res))
  }

  getFullData(): Promise<[IUserData, ICardData[]]> {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  changeProfile({name, about}: {name: string, about: string}): Promise<IUserData> {
    return fetch(`${this.link}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this.processResult(res))
  }

  changeAvatar(profile: IUserData): Promise<IUserData> {
    return fetch(`${this.link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: profile.avatar
      })
    })
      .then(res => this.processResult(res))
  }

  addCard(card: {name: string, link: string}): Promise<ICardData> {
    return fetch(`${this.link}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => this.processResult(res))
  }

  putLikeCard(cardId: string): Promise<ICardData> {
    return fetch(`${this.link}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => this.processResult(res))
  }

  deleteLikeCard(cardId: string): Promise<ICardData> {
    return fetch(`${this.link}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this.processResult(res))
  }

  deleteCard(cardId: string): Promise<{message: string}> {
    return fetch(`${this.link}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this.processResult(res))
  }
}
