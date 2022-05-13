export class Popup {
  protected element: HTMLElement;

  constructor(popupSelector: string) {
    this.element = document.querySelector(popupSelector);

    this.handleMousedownClose = this.handleMousedownClose.bind(this);
    this.handleEscClose = this.handleEscClose.bind(this);
  }

  private handleMousedownClose(evt: Event): void {
    const target = evt.target as HTMLElement;
    if (target.classList.contains('popup__close-button')
    || target.classList.contains('popup_opened')) {
      this.close();
    }
  };

  private handleEscClose(evt: KeyboardEvent): void {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListener(): void {
    this.element.addEventListener('mousedown', this.handleMousedownClose);
  };

  open(): void {
    this.element.classList.add('popup_opened');
    document.addEventListener('keydown', this.handleEscClose);
  };

  close(): void {
    this.element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.handleEscClose);
  };
}
