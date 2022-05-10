import { Popup } from './Popup'

export class PopupWithForm extends Popup {
  protected element: HTMLElement;
  private form: HTMLFormElement;
  private inputList: NodeList;
  private submitButton: HTMLElement;
  private defaultButtonText: string;
  private submitForm: (item: object) => void;
  private data: object;

  constructor({submitForm}: {submitForm: (item: object) => void}, popupSelector: string) {
    super(popupSelector);
    this.form = this.element.querySelector('.popup__form');
    this.inputList = this.form.querySelectorAll('.popup__input');
    this.submitButton = this.element.querySelector('.popup__confirm-button')
    this.defaultButtonText = this.submitButton.textContent

    this.submitForm = submitForm;
    this.handler = this.handler.bind(this);
  }

  private getInputValues(): object {
    this.data = {};

    this.inputList.forEach((input: HTMLInputElement) => {
      this.data[input.name] = input.value;
    })

    return this.data;
  }

  private handler(evt: Event): void {
    evt.preventDefault();
    this.submitButton.append('...');
    this.submitForm(this.getInputValues());
  }

  resetButtonText(): void {
    this.submitButton.textContent = this.defaultButtonText;
  }

  setEventListener(): void {
    this.form.addEventListener('submit', this.handler);
    super.setEventListener();
  }

  close() {
    this.form.reset();
    super.close();
  }
}
