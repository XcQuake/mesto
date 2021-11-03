const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const descriptionInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);

formElement.addEventListener('keyup', (evt) => {
  if (evt.key === 13) {
    formSubmitHandler();
  }
})


function popupOpen() {
  popup.classList.add('popup_opened');
};

function popupClose() {
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

