'use strict';
(function() {
  var browserCookies = require('browser-cookies');
  var reviewSubmit = document.querySelector('.review-submit');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var voteElements = document.querySelectorAll('input[name="review-mark"]');
  var fieldName = document.querySelector('.review-form-field-name');
  var fieldText = document.querySelector('.review-form-field-text');

  //  Вычисление даты ближайшего дня рождения в милисекундах
  var today = new Date();
  var myBirthday = new Date(today.getFullYear() + '-01' + '-20');
  if ((myBirthday.valueOf()) >= Date.now()) {
    myBirthday = new Date((today.getFullYear() - 1) + '-01' + '-20');
  }
  // Вычисление срока жизни cookie в днях
  var expiresDate = Math.round(((Date.now() - myBirthday.valueOf())) / 1000 / 60 / 60 / 24);

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  function validform() {
    var checkedElement = document.querySelector('input[name="review-mark"]:checked').value;

    var reviewName = document.querySelector('.review-fields-name');
    var reviewText = document.querySelector('.review-fields-text');
    var reviewDiv = document.querySelector('.review-fields'); // элемент для всего блока ссылок
    reviewDiv.classList.remove('invisible');
    var isDisabled = true;
    var isDisabledN = true;
    var isDisabledT = true;

    if ( checkedElement < 3 ) {
      if(fieldName.value === '') {
        reviewName.classList.remove('invisible');
        isDisabledN = true;
      } else {
        reviewName.classList.add('invisible');
        isDisabledN = false;
      }

      if (fieldText.value === '') {
        reviewText.classList.remove('invisible');
        isDisabledT = true;
      } else {
        reviewText.classList.add('invisible');
        isDisabledT = false;
      }
    } else {
      isDisabledT = false;
      if(fieldName.value === '') {
        reviewName.classList.remove('invisible');
        isDisabledN = true;
      } else {
        reviewName.classList.add('invisible');
        isDisabledN = false;
      }
      reviewText.classList.add('invisible');
    }
    isDisabled = isDisabledN || isDisabledT;
    if(!isDisabled) {
      reviewDiv.classList.add('invisible');
    }
    reviewSubmit.disabled = isDisabled;
  }

  for (var i = 0; i < voteElements.length; i++) {
    voteElements[i].onchange = function() {
      validform();
    };
  }

  fieldName.oninput = function() {
    validform();
  };

  fieldText.oninput = function() {
    validform();
  };

  fieldName.value = browserCookies.get('fieldName') || '';
  var checkedValue = browserCookies.get('checkedLast') || 3;
  voteElements[2].removeAttribute('checked');
  voteElements[checkedValue - 1].setAttribute('checked', 'checked');

  validform();
  // Создание Cookies
  reviewSubmit.onclick = function(evt) {
    evt.preventDefault();
    var checkedLast = document.querySelector('input[name="review-mark"]:checked');
    browserCookies.set('checkedLast', checkedLast.value, {expires: expiresDate });
    browserCookies.set('fieldName', fieldName.value, {expires: expiresDate });
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

})();
