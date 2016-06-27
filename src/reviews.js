'use strict';
(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  reviewsFilter.classList.add('invisible');
  var templateElement = document.querySelector('template');
  var reviewsContainer = document.querySelector('.reviews-list');
  var elementToClone;
  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  var IMAGE_LOAD_TIMEOUT = 10000;

  var getReviewElement = function(data, container) {
    var element = elementToClone.cloneNode(true);
    var _picture = new Image();
    var _pictureTimeout;
    _picture.onload = function(evt) {
      clearTimeout(_pictureTimeout);
      element.querySelector('.review-author').src = evt.target.src;
      _picture.width = '124';
      _picture.height = '124';
    };
    _picture.onerror = function() {
      element.classList.add('review-load-failure');
    };
    _picture.src = data.author.picture;
    _pictureTimeout = setTimeout(function() {
      _picture.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);
    element.querySelector('.review-text').textContent = data.description;
    container.appendChild(element);
    return element;
  };

  window.reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
  reviewsFilter.classList.remove('invisible');
})();
