import openPopup from './index.js';
import {
  popupTypeImage,
  popupImage,
  popupCaption
} from './constants.js';

export default class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement
  }

  _openImagePopup() {
    popupImage.src = this._link;
    popupImage.alt = this._title;
    popupCaption.textContent = this._title;

    openPopup(popupTypeImage)
  }

  _setEventListeners() {   
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('card__like-button_active');
    })

    this._deleteButton.addEventListener('click', () => {
      this._element.remove();
    })

    this._cardImage.addEventListener('click', () => {
      this._openImagePopup();
    })
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    return this._element;
  }
}
