import {
  editButton,
  addButton,
  formProfile,
  formCard,
  nameInput,
  aboutInput,
  validateConfig,
  avatar,
  formAvatar,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../../pages/index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'cdf51df7-343c-4e9d-927b-02e53e8e2930',
    'Content-Type': 'application/json'
  }
})

// Информация о пользователе с сервера
api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res),
    userInfo.setAvatar(res)
  })

api.getInitialCards()
  .then(res => {
    res.forEach(el => insertCard(el))
  })

// Валидаторы форм
const profileFormValidator = new FormValidator(validateConfig, formProfile);
const cardFormValidator = new FormValidator(validateConfig, formCard);
const avatarFormValidator = new FormValidator(validateConfig, formAvatar);

// Попап с изображением
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListener();

const cardList = new Section({
  items: [],
  renderer: (item) => {
    insertCard(item);
}}, '.gallery__list');

// Попапы с формой
const popupCardForm = new PopupWithForm({
  submitForm: (item) => {
    insertCard(item),
    api.addCard(item)
  }
}, '.popup_type_card');
popupCardForm.setEventListener();

const popupProfileForm = new PopupWithForm({
  submitForm: (item) => {
    userInfo.setUserInfo(item), 
    api.changeProfile(item)
  }
}, '.popup_type_profile');
popupProfileForm.setEventListener();

const popupAvatarForm = new PopupWithForm({
  submitForm: (item) => {
    userInfo.setAvatar(item),
    api.changeAvatar(item)
  }
}, '.popup_type_avatar');
popupAvatarForm.setEventListener();

// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar-image'
})

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, '.card-template', () => {
    popupWithImage.open(item.link, item.name)
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

  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;

  popupProfileForm.open();
});

addButton.addEventListener('click', () =>{
  cardFormValidator.cleanInput();
  cardFormValidator.resetForm();
  popupCardForm.open();
});

avatar.addEventListener('click', () => {
  avatarFormValidator.cleanInput();
  avatarFormValidator.resetForm();
  popupAvatarForm.open()
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
cardList.renderItems();


