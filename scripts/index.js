import {
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
  initialCards,
  validateConfig
} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileFormValidator = new FormValidator(validateConfig, formProfile);
const cardFormValidator = new FormValidator(validateConfig, formCard);

function submitFormProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeProfile);
}

function submitFormCard(event) {
  const newCard = {
    title: titleInput.value,
    link: linkInput.value
  }

  event.preventDefault();

  insertCard(newCard);
  cardFormValidator.resetForm();
  closePopup(popupTypeCard);
};

export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscape);
};

function closePopup(popup) {
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

editButton.addEventListener('click', () => {
  profileFormValidator.cleanInput();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupTypeProfile);
});

addButton.addEventListener('click', () =>{
  cardFormValidator.cleanInput();
  openPopup(popupTypeCard);
});

formProfile.addEventListener('submit', submitFormProfile);
formCard.addEventListener('submit', submitFormCard);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();


