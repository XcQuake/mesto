import openPopup from './index.js'

export class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    return cardElement
  }

  _openImagePopup() {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__image-caption');

    popupImage.src = this._link;
    popupImage.alt = this._title;
    popupCaption.textContent = this._title;

    openPopup(popupTypeImage)
  }

  _setEventListeners() {   
    const likeButton = this._element.querySelector('.card__like-button');
    const deleteButton = this._element.querySelector('.card__delete-button');
    const cardImage = this._element.querySelector('.card__image');

    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-button_active');
    })

    deleteButton.addEventListener('click', () => {
      deleteButton.closest('.card').remove();
    })

    cardImage.addEventListener('click', () => {
      this._openImagePopup();
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
  }
}
