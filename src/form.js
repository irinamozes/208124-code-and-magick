'use strict';
(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var voteElements = document.querySelectorAll('input[name="review-mark"]');
  var fieldName = document.querySelector('.review-form-field-name');
  var fieldText = document.querySelector('.review-form-field-text');


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
    var reviewSubmit = document.querySelector('.review-submit');
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

  validform();

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

})();
