import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({submitForm}, popupSelector) {
    super(popupSelector);
    super._element;
    this._form = this._element.querySelector('.popup__form');
    
    this._submitForm = submitForm;
    this._inputvalues = this._getInputValues();
    this._handler = this._handler.bind(this);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._data = {};

    this._inputList.forEach((input) => {
      this._data[input.name] = input.value;
    })

    return this._data;
  }

  _handler(event) {
    event.preventDefault();
    this._submitForm(this._getInputValues());
    this.close();
  }

  setEventListener() {
    this._form.addEventListener('submit', this._handler);
    super.setEventListener();
  }

  close() {
    this._form.removeEventListener('submit', this._handler);
    this._form.reset();
    super.close();
  }
} 