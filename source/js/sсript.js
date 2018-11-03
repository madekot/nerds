'use strict'

var modalPopup = document.querySelector('.modal');
var popupButtonOpen = document.querySelector('.map__button');
var popupButtonClose = modalPopup.querySelector('.modal__button-close');

var formPopup = modalPopup.querySelector('.modal-form');
var namePopup = formPopup.querySelector('#modalForm-name');
var emailPopup = formPopup.querySelector('#email');
var comentPopup = formPopup.querySelector('#text-modal');

var isStorageSupport = true;
var storage = '';

try {
  storage = localStorage.getItem('name');
  storage = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
};

if (isStorageSupport) {
  var storageName = localStorage.getItem('name');
  var storageEmail = localStorage.getItem('email');
};

var showPopapAnimation = function(className) {
  modalPopup.classList.add(className);
  function deleteClassAnimationShow() {
    modalPopup.classList.remove(className);
  };
  setTimeout(deleteClassAnimationShow, 1500);
}

var onModalPopupKeydown = function(evt) {
  if (evt.keyCode === 27) {
    closePopap();
  }
}

var onFormPopupFieldInvalid = function(evt) {
  var clickedElement = evt.target;
  clickedElement.classList.add('modal-form__input--invalid');
  showPopapAnimation('animation--error');
}

var openPopap = function() {
  modalPopup.classList.remove('visually-hidden');
  showPopapAnimation('animation--show');
  document.addEventListener('keydown', onModalPopupKeydown);
  formPopup.addEventListener('invalid', onFormPopupFieldInvalid, true);
}

var closePopap = function() {
  modalPopup.classList.add('visually-hidden');
  document.removeEventListener('keydown', onModalPopupKeydown);
  formPopup.removeEventListener('invalid', onFormPopupFieldInvalid, true);
}

popupButtonOpen.addEventListener('click', function(evt) {
  evt.preventDefault();
  openPopap();

  if (storageName !== null && storageEmail !== null) {
    namePopup.value = storageName;
    emailPopup.value = storageEmail;
    comentPopup.focus();
  } else {
    namePopup.focus();
  }
});

popupButtonClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  closePopap();
});

formPopup.addEventListener('submit', function(evt) {
  if (isStorageSupport) {
    evt.preventDefault();
    localStorage.setItem('name', namePopup.value);
    localStorage.setItem('email', emailPopup.value);
  }
})
