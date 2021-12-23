export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup__opened');
  };

  close() {
    this._popup.classList.remove('popup__opened');
  };

  setEventListener() {
    this._closeButton.setEventListener('click', this.close());
  };
}