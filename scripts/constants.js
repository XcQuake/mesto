const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeCard = document.querySelector('.popup_type_card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.popup_type_profile .popup__form');
const formCard = document.querySelector('.popup_type_card .popup__form')
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validateConfig = {
  form: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  buttonInactiveClass: 'popup__save-button_inactive',
  activeErrorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_error'
};

export {
  popupTypeProfile, 
  popupTypeCard,
  editButton,
  addButton,
  formProfile,
  formCard,
  nameInput,
  descriptionInput,
  titleInput,
  linkInput,
  profileName,
  profileDescription,
  popups,
  popupTypeImage,
  popupImage,
  popupCaption,
  initialCards,
  validateConfig
};