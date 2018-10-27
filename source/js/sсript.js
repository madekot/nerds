'use strict'

var modalPopup = document.querySelector('.modal');
var openPopup = document.querySelector('.map__button');
var closePopup = modalPopup.querySelector('.modal__button-close');

var formPopup = modalPopup.querySelector('.modal-form');
var formSubmitPopup = formPopup.querySelector('[type = submit]');
var namePopup = formPopup.querySelector('#name');
var emailPopup = formPopup.querySelector('#email');
var comentPopup = formPopup.querySelector('#text-modal');

var storageName = localStorage.getItem('name');
var storageEmail = localStorage.getItem('email');

openPopup.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalPopup.classList.remove('visually-hidden');
  if (storageName && storageEmail) {
    namePopup.value = storageName;
    emailPopup.value = storageEmail;
    comentPopup.focus();
  } else {
    namePopup.focus();
  }
});

closePopup.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalPopup.classList.add('visually-hidden');
});

formPopup.addEventListener('submit', function(evt) {
  if (!namePopup.value || !emailPopup.value) {
    evt.preventDefault();
    console.log('Нужно ввести пароль');
  } else {
    evt.preventDefault();
    localStorage.setItem('name', namePopup.value);
    localStorage.setItem('email', emailPopup.value);
  }
})
