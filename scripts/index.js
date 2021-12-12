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
const forms = Array.from(document.querySelectorAll('.popup__form'));

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  buttonInactiveClass: 'popup__save-button_inactive',
  activeErrorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_error'
}

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

import Card from './Card.js'
import FormValidator from './FormValidator.js'

function submitFormProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeProfile);
}

function submitFormCard(event) {
  const saveButton = document.querySelector('.popup_type_card .popup__save-button');
  const newCard = {
    title: titleInput.value,
    link: linkInput.value
  }

  event.preventDefault();

  insertCard(newCard);
  titleInput.value = '';
  linkInput.value = '';
  saveButton.classList.add('popup__save-button_inactive');
  saveButton.disabled = true;
  closePopup(popupTypeCard);
};

export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscape);
};

function closePopup(popup) {
  cleanInput(popup);
  document.removeEventListener('keydown', pressEscape);
  popup.classList.remove('popup_opened');
};

//  Закрытие попапа по нажатию на escape
const pressEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup)
  }
}

// Функция очищения ошибок инпутов
function cleanInput(popup) {
  const errorElements = popup.querySelectorAll('.popup__input-error');
  const inputElements = popup.querySelectorAll('.popup__input')

  errorElements.forEach((errorElement) => {
    errorElement.classList.remove('popup__input-error_active')
  })

  inputElements.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_error')
    inputElement.value = '';
  })
}

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  return cardElement;
}

// Функция вставки карточки в DOM
function insertCard(item) {
  const galleryList = document.querySelector('.gallery__list');
  galleryList.prepend(createCard(item));
}

initialCards.forEach((item) => {
  insertCard(item);
});

// Функция валидации форм
function validateForm(element, formSelector) {
  const formValidator = new FormValidator(element, formSelector);
  formValidator.enableValidation();
}

forms.forEach((form) => {
  validateForm(validateConfig, form);
})

// Слушатели
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });

  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupTypeProfile)});
addButton.addEventListener('click', () => openPopup(popupTypeCard));
formProfile.addEventListener('submit', submitFormProfile);
formCard.addEventListener('submit', submitFormCard);




