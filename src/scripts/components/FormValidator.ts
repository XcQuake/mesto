import { ValidateConfig } from "../models/Interfaces";

export class FormValidator {
  private form: HTMLFormElement;
  private inputSelector: string;
  private buttonSelector: string;
  private buttonInactiveClass: string;
  private activeErrorClass: string;
  private inputErrorClass: string;
  private inputList: HTMLInputElement[];
  private buttonElement: HTMLButtonElement;

  constructor(config: ValidateConfig, form: HTMLFormElement) {
     this.form = form;
     this.inputSelector = config.inputSelector;
     this.buttonSelector = config.buttonSelector;
     this.buttonInactiveClass = config.buttonInactiveClass;
     this.activeErrorClass = config.activeErrorClass;
     this.inputErrorClass = config.inputErrorClass;
     this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector))
     this.buttonElement = this.form.querySelector(this.buttonSelector);
  }

  private showInputError(inputElement: HTMLInputElement, errorMessage: string): void {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.activeErrorClass);
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.activeErrorClass);
    errorElement.textContent = '';
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  private hasInvalidInput(): Boolean {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.buttonElement.classList.add(this.buttonInactiveClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.buttonInactiveClass);
      this.buttonElement.disabled = false;
    }
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      })
    })
  }

  enableValidation(): void {
    this.setEventListeners()
  }

  resetForm(): void {
    this.form.reset();
    this.toggleButtonState();
  }

  cleanInput(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
  }
 }

