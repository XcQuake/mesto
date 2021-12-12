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

const formValidate = {
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

<<<<<<< HEAD
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
=======
// Создание карточек
function createCard(title, link) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = title;

  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like-button_active');
  });

  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.card').remove();
  });

  cardImage.addEventListener('click', function() {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__image-caption');

    popupImage.src = cardImage.src; 
    popupImage.alt = cardTitle.textContent; 
    popupCaption.textContent = cardTitle.textContent;

    openPopup(popupTypeImage);
  })
  
  return (cardElement);
}

function insertCard(title, link) {
  const galleryList = document.querySelector('.gallery__list');
  galleryList.prepend(createCard(title, link))
}
>>>>>>> parent of e88126f (создать класс Card)

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
  closePopup(popupTypeCard);
};

function openPopup(popup) {
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

<<<<<<< HEAD
// Функция создания карточки
function createCard(item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  return cardElement;
}
=======
initialCards.forEach(function (el) {
  insertCard(el.title, el.link)
});
>>>>>>> parent of e88126f (создать класс Card)

// Функция вставки карточки в DOM
function insertCard(item) {
  const galleryList = document.querySelector('.gallery__list');
  galleryList.prepend(createCard(item));
}

// Функция валидации форм
function validateForms(element) {
  const formValidator = new FormValidator(element);
  formValidator.enableValidation();
}

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


initialCards.forEach((item) => {
  insertCard(item);
});

validateForms(formValidate);