const popup = document.querySelector('.popup');
const editButton = document.querySelector('.button_type_edit-profile');
const closeButton = popup.querySelector('.button_type_popup-close');
const formElement = popup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const descriptionInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const likeButton = document.querySelectorAll('.button_type_like');


function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
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

for (let i = 0; i < likeButton.length; i = i + 1) {
  likeButton[i].addEventListener('click', function() {
    likeButton[i].classList.toggle('button_type_like-active')
  })
}


editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);