import { Popup } from './Popup'

export class PopupWithImage extends Popup {
  private popupImage: HTMLImageElement;
  private popupImgCaption: HTMLElement;
  protected element: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);

    this.popupImage = this.element.querySelector('.popup__image');
    this.popupImgCaption = this.element.querySelector('.popup__image-caption');
  }

  open(link?: string, title?: string): void {
    this.popupImage.src = link;
    this.popupImage.alt = `увеличенное изображение ${title}`;
    this.popupImgCaption.textContent = title;

    super.open();
  }
}
