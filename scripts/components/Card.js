export default class Card {
  constructor({title, link}, handleFunction, cardSelector) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleFunction;
    
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

  _setEventListeners() {   
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('card__like-button_active');
    })

    this._deleteButton.addEventListener('click', () => {
      this._element.remove();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardImage);
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
