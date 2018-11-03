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

var openPopap = function() {
  modalPopup.classList.remove('visually-hidden');
}
var closePopap = function() {
  modalPopup.classList.add('visually-hidden');
}

popupButtonOpen.addEventListener('click', function(evt) {
  evt.preventDefault();
  openPopap();
  showPopapAnimation('animation--show');

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

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    if (!modalPopup.classList.contains('visually-hidden')) {
      evt.preventDefault();
      closePopap();
      showPopapAnimation('animation--show');
    };
  };
});

var invalidSubmitHandled = function(evt) {
   console.log(evt);

  var clickedElement = evt.target;
  clickedElement.classList.add('modal-form__input--invalid');
  showPopapAnimation('animation--error');
}

formPopup.addEventListener('invalid', invalidSubmitHandled, true);
