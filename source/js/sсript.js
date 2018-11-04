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

var onNamePopupEmailPopupSubmit = function(evt) {
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

var onRequaredFildsFormInvalid = function(evt) {
  var clickedElement = evt.target;
  clickedElement.classList.add('modal-form__input--invalid');
  showPopapAnimation('animation--error');
}

var onRequaredFildsFormClick = function() {
  var requaredFildsForm = formPopup.querySelectorAll('.modal-form__input:required');
  for (var i = 0; i < requaredFildsForm.length; i++) {
    var requaredFild = requaredFildsForm[i];
    if (requaredFild.validity.valid === true) {
      if (requaredFild.classList.contains('modal-form__input--invalid')) {
        requaredFild.classList.remove('modal-form__input--invalid');
      }
    }
  }
};

var onRequaredFildsFormKeyup = function(evt) {
  if (evt.target.validity.valid) {
    if (evt.target.classList.contains('modal-form__input--invalid')) {
       evt.target.classList.remove('modal-form__input--invalid');
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
  formPopup.removeEventListener('invalid', onRequaredFildsFormInvalid, true);
}

popupButtonOpen.addEventListener('click', function(evt) {
  evt.preventDefault();
  openPopap(evt);
  console.log(modalPopup.classList.contains('visually-hidden'))
  if (modalPopup.classList.contains('visually-hidden') === false) {
    readLocalStorage();
    formPopup.addEventListener('invalid', onRequaredFildsFormInvalid, true);
    formPopup.addEventListener('submit', onNamePopupEmailPopupSubmit);
    formPopup.addEventListener('keyup', onRequaredFildsFormKeyup);
    popupButtonSubmit.addEventListener('click', onRequaredFildsFormClick);
  }
});

popupButtonClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  closePopap(evt);
  if (modalPopup.classList.contains('visually-hidden')) {
    formPopup.removeEventListener('invalid', onRequaredFildsFormInvalid, true);
    formPopup.removeEventListener('submit', onNamePopupEmailPopupSubmit);
    formPopup.removeEventListener('keyup', onRequaredFildsFormKeyup);
    popupButtonSubmit.removeEventListener('click', onRequaredFildsFormClick);
  }
});
