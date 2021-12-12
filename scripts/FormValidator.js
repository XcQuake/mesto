export default class FormValidator {
   constructor(data, formSelector) {
     this._formSelector = formSelector;
     this._inputSelector = data.inputSelector;
     this._buttonSelector = data.buttonSelector;
     this._buttonInactiveClass = data.buttonInactiveClass;
     this._activeErrorClass = data.activeErrorClass;
     this._inputErrorClass = data.inputErrorClass;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._activeErrorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._activeErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._buttonInactiveClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._buttonInactiveClass);
      buttonElement.disabled = false;
    }
  }

   _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._buttonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  }

  enableValidation() {
    this._setEventListeners(this._formSelector)
  }
 }

 