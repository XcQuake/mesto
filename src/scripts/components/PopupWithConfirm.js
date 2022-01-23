import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({submitForm}, popupSelector) {
    super(popupSelector);
    super._element;

    this._submitForm = submitForm;
    this._button = this._element.querySelector('.popup__confirm-button');
    this._form = this._element.querySelector('.popup__form');
    this._handler = this._handler.bind(this);
    this._submitButton = this._element.querySelector('.popup__confirm-button');
    this._defaultButtonText = this._submitButton.textContent;
  }

  _handler(event) {
    event.preventDefault();
    this._submitButton.append('...');
    this._submitForm(this._data);
  }
 
  setEventListener() {
    this._form.addEventListener('submit', this._handler);
    super.setEventListener();
  }
  
  open(data) {
    this._data = data;
    super.open()
  }

  close() {
    this._submitButton.textContent = this._defaultButtonText;
    super.close()
  }
}