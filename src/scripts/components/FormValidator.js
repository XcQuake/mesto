export default class FormValidator {
   constructor(data, form) {
     this._form = form;
     this._inputSelector = data.inputSelector;
     this._buttonSelector = data.buttonSelector;
     this._buttonInactiveClass = data.buttonInactiveClass;
     this._activeErrorClass = data.activeErrorClass;
     this._inputErrorClass = data.inputErrorClass;
     this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
     this._buttonElement = this._form.querySelector(this._buttonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._activeErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._activeErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._buttonInactiveClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._buttonInactiveClass);
      this._buttonElement.disabled = false;
    }
  }

   _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }

  resetForm() {
    this._form.reset();
    this._toggleButtonState();
  }

  cleanInput() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
 }

 