const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.popup_type_profile .popup__form');
const formCard = document.querySelector('.popup_type_card .popup__form');
const formAvatar = document.querySelector('.popup_type_avatar .popup__form')
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const avatar = document.querySelector('.profile__avatar');
const likeCounter = document.querySelector('.card__like-counter')

const validateConfig = {
  form: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__confirm-button',
  buttonInactiveClass: 'popup__confirm-button_inactive',
  activeErrorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_error'
};

export {
  editButton,
  addButton,
  formProfile,
  formCard,
  nameInput,
  aboutInput,
  validateConfig,
  avatar,
  formAvatar,
  likeCounter
};