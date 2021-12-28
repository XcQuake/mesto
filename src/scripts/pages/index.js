import {
  editButton,
  addButton,
  formProfile,
  formCard,
  nameInput,
  descriptionInput,
  initialCards,
  validateConfig,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../../pages/index.css';

// Валидаторы форм
const profileFormValidator = new FormValidator(validateConfig, formProfile);
const cardFormValidator = new FormValidator(validateConfig, formCard);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item);
}}, '.gallery__list');

// Попапы с формой
const popupCardForm = new PopupWithForm({
  submitForm: (item) => {createCard(item)}, 
  resetForm: () => {cardFormValidator.resetForm()}
}, '.popup_type_card');

const popupProfileForm = new PopupWithForm({
  submitForm: (item) => {userInfo.setUserInfo(item)}, 
  resetForm: () => {profileFormValidator.resetForm()}
}, '.popup_type_profile');

// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
})

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, handleCardClick, '.card-template');
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

// Функция открытия попапа с изображением
const handleCardClick = (item) => {
  const popupImage = new PopupWithImage('.popup_type_image', item);
  popupImage.open();
  popupImage.setEventListener();
}

// Слушатели
editButton.addEventListener('click', () => {
  profileFormValidator.cleanInput();
  nameInput.value = userInfo.getUserInfo().name;
  descriptionInput.value = userInfo.getUserInfo().description;
  popupProfileForm.open();
  popupProfileForm.setEventListener();
});

addButton.addEventListener('click', () =>{
  cardFormValidator.cleanInput();
  popupCardForm.open();
  popupCardForm.setEventListener();
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardList.renderItems();


