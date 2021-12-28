export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = document.querySelector(this._popupSelector);

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
    document.addEventListener('keydown', this._handleEscClose);
  };

  open() {
    this._element.classList.add('popup_opened');
  };

  close() {
    this._element.classList.remove('popup_opened');
    this._element.removeEventListener('mousedown', this._handleMousedownClose);
    document.removeEventListener('keydown', this._handleEscClose);
  };
}