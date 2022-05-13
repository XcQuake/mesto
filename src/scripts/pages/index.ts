import {
  editButton,
  addButton,
  formProfile,
  formCard,
  nameInput,
  aboutInput,
  validateConfig,
  avatar,
  formAvatar
} from '../utils/constants';
import { Card }from '../components/Card';
import { FormValidator } from '../components/FormValidator';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithConfirm } from '../components/PopupWithConfirm';
import { UserInfo } from '../components/UserInfo';
import { Api } from '../components/Api';
import '../../pages/index.css';
import { IUserData, ICardData } from '../models/Interfaces';
let userId: string;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'cdf51df7-343c-4e9d-927b-02e53e8e2930',
    'Content-Type': 'application/json'
  }
})

api.getFullData()
  .then(([user, cards]: [IUserData, ICardData[]]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user);
    cards.forEach(el => insertCard(el));
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
  renderer: (item: ICardData) => {insertCard(item)},
  containerSelector: '.gallery__list',
});

// Попап добавления карточки
const popupCardForm = new PopupWithForm({
  submitForm: (card: {name: string, link: string}) => promiseAddCard(card)
}, '.popup_type_card');
popupCardForm.setEventListener();

function promiseAddCard(card: {name: string, link: string}) {
  api.addCard(card)
      .then((card: ICardData) => {
        insertCard(card, 'prepend')
        popupCardForm.close()
      })
      .catch((err: Error) => console.log(err))
      .finally(() => popupCardForm.resetButtonText())
}

// Попапы изменения данных профиля
const popupProfileForm = new PopupWithForm({
  submitForm: (user: IUserData) => promiseChangeProfile(user)
}, '.popup_type_profile');
popupProfileForm.setEventListener();

function promiseChangeProfile(user: IUserData) {
  api.changeProfile(user)
      .then((user: IUserData) => {
        userInfo.setUserInfo(user);
        popupProfileForm.close();
      })
      .catch((err: Error) => console.log(err))
      .finally(() => popupProfileForm.resetButtonText())
}

const popupAvatarForm = new PopupWithForm({
  submitForm: (user: IUserData) => promiseChangeAvatar(user)
}, '.popup_type_avatar');
popupAvatarForm.setEventListener();

function promiseChangeAvatar(user: IUserData) {
  api.changeAvatar(user)
    .then((user: IUserData) => {
      userInfo.setAvatar(user);
      popupAvatarForm.close();
    })
    .catch((err: Error) => console.log(err))
    .finally(() => popupAvatarForm.resetButtonText())
}

// Попап удаления карточки
const popupCardDelete = new PopupWithConfirm({
  submitForm: (data: {card: HTMLElement, cardId: string}) => {
    promiseDeleteCard(data)
  }
}, '.popup_type_card-delete');
popupCardDelete.setEventListener();

function promiseDeleteCard(data: {card: HTMLElement, cardId: string}) {
  api.deleteCard(data.cardId)
      .then(() => {
        data.card.remove()
        popupCardDelete.close()
      })
      .catch((err: Error) => console.log(err))
      .finally(() => popupCardDelete.resetButtonText())
}

// Информация о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar-image',
})

// Функция добавления карточки в разметку
function insertCard(card: ICardData, method: string = 'append') {
  const cardElement = createCard(card);
  cardList.addItem(cardElement, method);
};

// Функция создания карточки
function createCard(item: ICardData) {
  const card = new Card({item, userId},{
        handleCardClick: () => popupWithImage.open(item.link, item.name),
        handleDeleteCard: (data) => popupCardDelete.open(data),
        handlePutLike: () => handleLikeCard(),
        handleDeleteLike: () => handleDeleteLike()
      }, '.card-template'
  );

  function handleLikeCard() {
    api.putLikeCard(card.id)
      .then((data) => card.setLikesInfo(data))
      .catch((err: Error) => console.log(err));
  }

  function handleDeleteLike() {
    api.deleteLikeCard(card.id)
      .then((data) => card.setLikesInfo(data))
      .catch((err: Error) => console.log(err));
  }

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
