const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__close-button')

function popupOpen() {
  popup.classList.add('popup__opened')
}

function popupClose() {
  popup.classList.remove('popup__opened')
}



editButton.addEventListener('click', popupOpen)
closeButton.addEventListener('click', popupClose)