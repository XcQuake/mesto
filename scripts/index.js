const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formElements = document.querySelectorAll('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('.card-template').content;
const galleryList = document.querySelector('.gallery__list');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

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


function formSubmitHandler(i) {
  window.event.preventDefault();

  if (i === 0) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    popupClose(0);
    
  } if (i === 1) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = titleInput.value;
    cardElement.querySelector('.card__image').src = linkInput.value;

    cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle('card__like-button_active');
    });

    cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
      const eventTarget = evt.target;
      const cardElement = eventTarget.closest('.card')

      cardElement.remove();
    });

    cardElement.querySelector('.card__image').addEventListener('click', function(evt) {
      const eventTarget = evt.target;
      const cardTitle = cardElement.querySelector('.card__title');

      popupImage.src = eventTarget.src;
      popupCaption.textContent = cardTitle.textContent;

      popups[2].classList.add('popup_opened')
    })

    titleInput.value = '';
    linkInput.value = '';
    
    galleryList.prepend(cardElement);
  
    popupClose(1);
  }
};

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


const likeButtons = document.querySelectorAll('.card__like-button');

likeButtons.forEach(function (el) {
  el.addEventListener('click', function() {
    el.classList.toggle('card__like-button_active')
  });
});

const deleteButtons = document.querySelectorAll('.card__delete-button')

deleteButtons.forEach(function (el) {
  el.addEventListener('click', function() {
    cardElement = el.closest('.card');
    cardElement.remove();
  })
})

const images = galleryList.querySelectorAll('.card__image');

images.forEach(function (el) {
  el.addEventListener('click', function() {
    popups[2].classList.add('popup_opened')

    const cardElement = el.closest('.card');
    const cardTitle = cardElement.querySelector('.card__title')

    popupImage.src = el.src;
    popupCaption.textContent = cardTitle.textContent;
  })
})

editButton.addEventListener('click', () => popupOpen(0));
addButton.addEventListener('click', () => popupOpen(1));
closeButtons[0].addEventListener('click', () => popupClose(0));
closeButtons[1].addEventListener('click', () => popupClose(1));
closeButtons[2].addEventListener('click', () => popupClose(2));
formElements[0].addEventListener('submit', () => formSubmitHandler(0));
formElements[1].addEventListener('submit', () => formSubmitHandler(1));
