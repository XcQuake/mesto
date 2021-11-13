const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const descriptionInput = formElement.querySelector('.popup__input_type_description');
const titleInput = formElement.querySelector('.popup__input_type_title');
const linkInput = formElement.querySelector('.poup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('.card-template').content;
const galleryList = document.querySelector('.gallery__list');
const closeButtons = document.querySelectorAll('.popup__close-button');

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

function popupOpen(i) {
  if (i === 0) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  }
  popups[i].classList.add('popup_opened');
};

function popupClose(i) {
  popups[i].classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  if (popups[0]) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popupClose(0);
  } else {
    evt.preventDefault();
    
  }
};



const likeButtons = document.querySelectorAll('.card__like-button')

likeButtons.forEach(function (el) {
  el.addEventListener('click', function() {
    el.classList.toggle('card__like-button_active')
  });
});



editButton.addEventListener('click', () => popupOpen(0));
addButton.addEventListener('click', () => popupOpen(1));
closeButtons[0].addEventListener('click', () => popupClose(0));
closeButtons[1].addEventListener('click', () => popupClose(1));
formElement.addEventListener('submit', formSubmitHandler);