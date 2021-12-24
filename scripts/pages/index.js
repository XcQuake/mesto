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
  validateConfig,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

const profileFormValidator = new FormValidator(validateConfig, formProfile);
const cardFormValidator = new FormValidator(validateConfig, formCard);
const popupCard = new Popup('.popup_type_card');
const popupProfile = new Popup('.popup_type_profile');


function submitFormProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeProfile);
}

function submitFormCard(event) {
  const item = {
    title: titleInput.value,
    link: linkInput.value
  }

  event.preventDefault();
  
  insertCard(item);
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

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    insertCard(item);
  }}, '.gallery__list'
)

// Функция создания карточки
function insertCard(item) {
  const card = new Card(item, handleCardClick, '.card-template');
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

//  Закрытие попапа по нажатию на escape
const pressEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup)
  }
};

const handleCardClick = (item) => {
  const popupImage = new PopupWithImage('.popup_type_image', item)
  popupImage.open();
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

editButton.addEventListener('click', () => {
  profileFormValidator.cleanInput();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupProfile.open();
});

addButton.addEventListener('click', () =>{
  cardFormValidator.cleanInput();
  popupCard.open();
});

formProfile.addEventListener('submit', submitFormProfile);
formCard.addEventListener('submit', submitFormCard);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardList.renderItems();


