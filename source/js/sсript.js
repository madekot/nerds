'use strict'

var ESC_KEYCODE = 27;
var TIME_DELETE_CLASS = 1500;

var popupButtonOpen = document.querySelector('.map__button');
var modalPopup = document.querySelector('.modal');
var popupButtonClose = modalPopup.querySelector('.modal__button-close');

var formPopup = modalPopup.querySelector('.modal-form');
var namePopup = formPopup.querySelector('#modalForm-name');
var emailPopup = formPopup.querySelector('#email');
var comentPopup = formPopup.querySelector('#text-modal');
var popupButtonSubmit = formPopup.querySelector('.modal-form__button');


var toCheckIsStorageSupport = function () {
  var isStorageSupport = true;
  var storage = '';
  try {
    storage = localStorage.getItem('name');
    storage = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  };
  return isStorageSupport;
};

var readLocalStorage = function() {
  if (toCheckIsStorageSupport()) {
    var storageName = localStorage.getItem('name');
    var storageEmail = localStorage.getItem('email');

    if (storageName !== null && storageEmail !== null) {
      namePopup.value = storageName;
      emailPopup.value = storageEmail;
      comentPopup.focus();
    } else {
      namePopup.focus();
    }
  }
}

var onPopupButtonSubmitSubmit = function(evt) {
  evt.preventDefault();
  if (toCheckIsStorageSupport()) {
    localStorage.setItem('name', namePopup.value);
    localStorage.setItem('email', emailPopup.value);
  }
}

var onModalPopupKeydown = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopap(evt);
  }
}

var onFormPopupInvalid = function(evt) {
  var clickedElement = evt.target;
  clickedElement.classList.add('modal-form__input--invalid');
  showPopapAnimation('animation--error');
}

var onPopupButtonSubmitClick = function() {
  var inputsForm = formPopup.querySelectorAll('.modal-form__input');
  for (var i = 0; i < inputsForm.length; i++) {
    var input = inputsForm[i];
    if (input.checkValidity() === true) {
      if (input.classList.contains('modal-form__input--invalid')) {
        input.classList.remove('modal-form__input--invalid');
      }
    }
  }
};

var showPopapAnimation = function(className) {
  modalPopup.classList.add(className);
  function deleteClassAnimationShow() {
    modalPopup.classList.remove(className);
  };
  setTimeout(deleteClassAnimationShow, TIME_DELETE_CLASS);
}

var openPopap = function(evt) {
  modalPopup.classList.remove('visually-hidden');
  showPopapAnimation('animation--show');
  document.addEventListener('keydown', onModalPopupKeydown);
}

var closePopap = function(evt) {
  evt.preventDefault();
  modalPopup.classList.add('visually-hidden');
  document.removeEventListener('keydown', onModalPopupKeydown);
  formPopup.removeEventListener('invalid', onFormPopupInvalid, true);
}

popupButtonOpen.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (modalPopup.classList.contains('visually-hidden')) {
    openPopap(evt);
    readLocalStorage();
    formPopup.addEventListener('invalid', onFormPopupInvalid, true);
    formPopup.addEventListener('submit', onPopupButtonSubmitSubmit);
    popupButtonSubmit.addEventListener('click', onPopupButtonSubmitClick);
  }
});

popupButtonClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (!(modalPopup.classList.contains('visually-hidden'))) {
    closePopap(evt);
    formPopup.removeEventListener('invalid', onFormPopupInvalid, true);
    formPopup.removeEventListener('submit', onPopupButtonSubmitSubmit);
    popupButtonSubmit.removeEventListener('click', onPopupButtonSubmitClick);
  }
});
