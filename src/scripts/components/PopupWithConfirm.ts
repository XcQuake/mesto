import { Popup } from './Popup';

export class PopupWithConfirm extends Popup {
  protected element: HTMLElement;
  private submitForm: (item: object) => void;
  private form: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private defaultButtonText: string;
  private data: object;

  constructor({submitForm}: {submitForm: (item: object) => void}, popupSelector: string) {
    super(popupSelector);

    this.submitForm = submitForm;
    this.form = this.element.querySelector('.popup__form');
    this.submitButton = this.element.querySelector('.popup__confirm-button');
    this.defaultButtonText = this.submitButton.textContent;

    this.handler = this.handler.bind(this);
  }

  handler(event: Event): void {
    event.preventDefault();
    this.submitButton.append('...');
    this.submitForm(this.data);
  }

  setEventListener(): void {
    this.form.addEventListener('submit', this.handler);
    super.setEventListener();
  }

  open(data?: object): void {
    this.data = data;
    super.open()
  }

  resetButtonText(): void {
    this.submitButton.textContent = this.defaultButtonText;
  }
}
