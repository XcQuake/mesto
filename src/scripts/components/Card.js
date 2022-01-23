export default class Card {
  constructor({name, link}, cardSelector, handleCardClick) {
    this._title = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleDeleteCard;
    
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

  _deleteCard() {
    const data = {
      card: this._element,
      cardId: this._cardId
    }
    this._handleCardDelete(data);
  }

  _setEventListeners() {   
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('card__like-button_active');
    })

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardImage);
    })
  }

  generateCard() {
    this._setEventListeners();

    if (this._owner._id == this._userId){
      this._deleteButton.classList.remove('card__delete-button_hidden')
    };
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    return this._element;
  }
}
