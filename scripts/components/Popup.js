export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = this._getPopup();
  }

  _getPopup() {
    this._popup = document.querySelector(this._popupSelector)
    return this._popup;
  }

  open() {
    this._element.classList.add('popup_opened');
  };

  close() {
    this._popup.classList.remove('popup_opened');
  };

  setEventListener() {
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeButton.setEventListener('click', this.close());
  };
}