'use strict'

var modalPopup = document.querySelector('.modal');
var namePopup = modalPopup.querySelector('#name');
var openPopup = document.querySelector('.map__button');
var closePopup = modalPopup.querySelector('.modal__button-close');


openPopup.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalPopup.classList.remove('visually-hidden');
  namePopup.focus();
});

closePopup.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalPopup.classList.add('visually-hidden');
});
