const editButton = document.querySelector('.profile__edit-button') as HTMLButtonElement | null;
const addButton = document.querySelector('.profile__add-button') as HTMLButtonElement | null;
const formProfile = document.querySelector('.popup_type_profile .popup__form') as HTMLFormElement | null;
const formCard = document.querySelector('.popup_type_card .popup__form') as HTMLFormElement | null;
const formAvatar = document.querySelector('.popup_type_avatar .popup__form') as HTMLFormElement | null;
const nameInput = document.querySelector('.popup__input_type_name') as HTMLInputElement | null;
const aboutInput = document.querySelector('.popup__input_type_about') as HTMLInputElement | null;
const avatar = document.querySelector('.profile__avatar') as HTMLImageElement | null;

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
};
