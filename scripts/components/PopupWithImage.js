import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image) {
    super(popupSelector);
    super._element;
    this._link = image.src;
    this._title = image.alt;

    this._image = this._element.querySelector('.popup__image');
    this._caption = this._element.querySelector('.popup__image-caption');
  }

  open() {
    this._image.src = this._link;
    this._image.alt = this._title;
    this._caption.textContent = this._title;

    super.open();
  }
}