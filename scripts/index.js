const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeCard = document.querySelector('.popup_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileCloseButton = popupTypeProfile.querySelector('.popup__close-button');
const cardCloseButton = popupTypeCard.querySelector('.popup__close-button');
const imageCloseButton = popupTypeImage.querySelector('.popup__close-button');
const formProfile = document.querySelector('.popup_type_profile .popup__form');
const formCard = document.querySelector('.popup_type_card .popup__form')
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popups = Array.from(document.querySelectorAll('.popup'));

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

// Создание карточек
function createCard(title, link) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const galleryList = document.querySelector('.gallery__list');

  cardTitle.textContent = title;
  cardImage.src = link;

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
  
  galleryList.prepend(cardElement);
}

function formSubmitProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeProfile);
}

function formSubmitCard(event) {
  event.preventDefault();
  createCard(titleInput.value, linkInput.value);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(popupTypeCard);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

initialCards.forEach(function (el) {
  createCard(el.title, el.link)
});


// Закрытие попапа кликом на оверлею
const overlayClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
}}

popups.forEach(function(popup) {
  popup.addEventListener('click', overlayClick);
})


// Валидация форм

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();


// Слушатели

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupTypeProfile)});
addButton.addEventListener('click', () => openPopup(popupTypeCard));
profileCloseButton.addEventListener('click', () => closePopup(popupTypeProfile));
cardCloseButton.addEventListener('click', () => closePopup(popupTypeCard))
imageCloseButton.addEventListener('click', () => closePopup(popupTypeImage));
formProfile.addEventListener('submit', formSubmitProfile);
formCard.addEventListener('submit', formSubmitCard);
document.addEventListener('keydown', (evt) => keyHandler(evt));

