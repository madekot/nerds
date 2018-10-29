'use strict'

var modalPopup = document.querySelector('.modal');
var openPopup = document.querySelector('.map__button');
var closePopup = modalPopup.querySelector('.modal__button-close');

var formPopup = modalPopup.querySelector('.modal-form');
var formSubmitPopup = formPopup.querySelector('[type = submit]');
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

openPopup.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalPopup.classList.remove('visually-hidden');
  modalPopup.classList.add('animation--show');
  if (storageName !== null && storageEmail !== null) {
    namePopup.value = storageName;
    emailPopup.value = storageEmail;
    comentPopup.focus();
  } else {
    namePopup.focus();
  }
});

closePopup.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalPopup.classList.remove('animation--show');
  modalPopup.classList.remove('animation--error')
  modalPopup.classList.add('visually-hidden');
});

formPopup.addEventListener('submit', function(evt) {
  if (!namePopup.value || !emailPopup.value) {
    evt.preventDefault();
    modalPopup.classList.add('animation--error')
    console.log('Нужно ввести пароль');
  } else if (isStorageSupport) {
    evt.preventDefault();
    localStorage.setItem('name', namePopup.value);
    localStorage.setItem('email', emailPopup.value);
    comentPopup.focus();
  }
})

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    if (!modalPopup.classList.contains('visually-hidden')) {
      evt.preventDefault();
      modalPopup.classList.add('visually-hidden');
      modalPopup.classList.remove('animation--show');
      modalPopup.classList.remove('animation--error')
    };
  };
})
