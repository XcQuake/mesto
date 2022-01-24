import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    
    this._popupImage = this._element.querySelector('.popup__image');
    this._popupImgCaption = this._element.querySelector('.popup__image-caption');
  }

  open(link, title) {
    this._popupImage.src = link;
    this._popupImage.alt = `увеличенное изображение ${title}`;
    this._popupImgCaption.textContent = title;

    super.open();
  }
}