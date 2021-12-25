import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._element = super._getPopup();
    this._form = this._element.querySelector('.popup__form')
    this._submitButton = this._element.querySelector('.popup__save-button');

    this._submitForm = submitForm;
  }

  setEventListener() {
    this._submitButton.addEventListener('click', this._submitForm);

    super.setEventListener();
  }

  close() {
    this._form.reset();
    super.close();
  }
} 