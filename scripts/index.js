const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const descriptionInput = formElement.querySelector('.popup__input_type_description');
const titleInput = formElement.querySelector('.popup__input_type_title');
const linkInput = formElement.querySelector('.poup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('.card-template').content;
const galleryList = document.querySelector('.gallery__list');


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


initialCards.forEach(function (el) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = el.title;
  cardElement.querySelector('.card__image').src = el.link;

  galleryList.append(cardElement)
});

function popupOpen() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
};

function popupClose() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose();
};

const likeButtons = document.querySelectorAll('.card__like-button')

likeButtons.forEach(function (el) {
  el.addEventListener('click', function() {
    el.classList.toggle('card__like-button_active')
  })
})

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);