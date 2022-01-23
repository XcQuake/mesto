export default class Card {
  constructor({item, user}, {handleCardClick, handleDeleteCard, handlePutLike, handleDeleteLike}, cardSelector) {
    this._title = item.name;
    this._link = item.link;
    this._owner = item.owner;
    this._likes = item.likes;
    this._cardId = item._id;
    this._userId = user._id;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleDeleteCard;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;

    this._cardSelector = cardSelector;
    
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeCounter = this._element.querySelector('.card__like-counter');
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

  _putLike() {
    this._handlePutLike(this._cardId)
      .then((res) => {
        this._likeButton.classList.add('card__like-button_active');
        this._likeCounter.textContent = res.likes.length;
      })
      .catch(err => console.log(err));
  }

  _deleteLike() {
    this._handleDeleteLike(this._cardId)
      .then((res) => {
        this._likeButton.classList.remove('card__like-button_active');
        this._likeCounter.textContent = res.likes.length;
      })
      .catch(err => console.log(err));
  }

  _setEventListeners() {   
    this._likeButton.addEventListener('click', () => {
      if(!this._likeButton.classList.contains('card__like-button_active')){
        this._putLike()
      } else {
        this._deleteLike()
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardImage);
    });
  }

  generateCard() {
    this._setEventListeners();

    this._likes.forEach(el => {
      if (el._id == this._userId) {
        this._likeButton.classList.add('card__like-button_active')
      };
    });

    if (this._owner._id == this._userId){
      this._deleteButton.classList.remove('card__delete-button_hidden')
    };
    
    this._likeCounter.textContent = this._likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    return this._element;
  }
}
