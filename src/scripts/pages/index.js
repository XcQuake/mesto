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

// Попап с изображением
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListener();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    insertCard(item);
}}, '.gallery__list');

// Попапы с формой
const popupCardForm = new PopupWithForm({
  submitForm: (item) => {insertCard(item)}
}, '.popup_type_card');
popupCardForm.setEventListener();

const popupProfileForm = new PopupWithForm({
  submitForm: (item) => {userInfo.setUserInfo(item)}
}, '.popup_type_profile');
popupProfileForm.setEventListener();

// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
})

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, '.card-template', () => {
    popupWithImage.open(item.link, item.title)
  });
  const cardElement = card.generateCard();
  return cardElement;
};

// Функция добавления карточки в разметку
function insertCard(item) {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
};

// Слушатели
editButton.addEventListener('click', () => {
  profileFormValidator.cleanInput();
  profileFormValidator.resetForm();
  
  const {name, description} = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = description;

  popupProfileForm.open();
});

addButton.addEventListener('click', () =>{
  cardFormValidator.cleanInput();
  cardFormValidator.resetForm();
  popupCardForm.open();
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardList.renderItems();


