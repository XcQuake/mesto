export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);

    this._handleMousedownClose = this._handleMousedownClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleMousedownClose(evt) {
    if (evt.target.classList.contains('popup__close-button') 
    || evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListener() {
    this._element.addEventListener('mousedown', this._handleMousedownClose);
  };

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };
}