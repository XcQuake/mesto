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
  likeCounter
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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

api.getFullData()
  .then(([user, cards]) => {
    userInfo.setUserInfo(user),
    userInfo.setAvatar(user),
    cards.forEach(el => insertCard(el, user))
  })
  .catch(err => console.log(err))
  
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

// Попап добавления карточки
const popupCardForm = new PopupWithForm({
  submitForm: (item) => promiseAddCard(item)
}, '.popup_type_card');
popupCardForm.setEventListener();

function promiseAddCard(item) {
  Promise.all([api.addCard(item), api.getUserInfo()])
      .then(([card, user]) => {
        insertCard(card, user, 'prepend')
        popupCardForm.close()
      })
      .catch(err => console.log(err))
}

// Попапы изменения данных профиля
const popupProfileForm = new PopupWithForm({
  submitForm: (item) => promiseChangeProfile(item)
}, '.popup_type_profile');
popupProfileForm.setEventListener();

function promiseChangeProfile(item) {
  api.changeProfile(item)
      .then(() => userInfo.setUserInfo(item))
      .then(() => popupProfileForm.close())
      .catch(err => console.log(err))
}

const popupAvatarForm = new PopupWithForm({
  submitForm: (item) => promiseChangeAvatar(item)
}, '.popup_type_avatar');
popupAvatarForm.setEventListener();

function promiseChangeAvatar(item) {
  api.changeAvatar(item)
    .then(() => userInfo.setAvatar(item))
    .then(() => popupAvatarForm.close())
    .catch(err => console.log(err))
}

// Попап удаления карточки
const popupCardDelete = new PopupWithConfirm({
  submitForm: (data) => promiseDeleteCard(data)
}, '.popup_type_card-delete');
popupCardDelete.setEventListener();

function promiseDeleteCard(data) {
  api.deleteCard(data.cardId)
      .then(() => data.card.remove())
      .then(() => popupCardDelete.close())
      .catch(err => console.log(err))
}

// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar-image'
})

// Функция добавления карточки в разметку
function insertCard(item, user, method) {
  const cardElement = createCard(item, user);
  cardList.addItem(cardElement, method);
};

// Функция создания карточки
function createCard(item, user) {
  const card = new Card({item, user},{
        handleCardClick: () => popupWithImage.open(item.link, item.name),
        handleDeleteCard: (data) => popupCardDelete.open(data),
        handlePutLike: (cardId) => api.putLikeCard(cardId),
        handleDeleteLike: (cardId) => api.deleteLikeCard(cardId)
      }, '.card-template'
  );
  const cardElement = card.generateCard();
  return cardElement;
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


