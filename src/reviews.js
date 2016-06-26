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

  var getReviewElement = function(data, container) {

    var element = elementToClone.cloneNode(true);
    var _picture = new Image();
    _picture.onload = function() {
      element.querySelector('.review-author').src = data.picture;
      element.querySelector('.review-author').width = '124';
      element.querySelector('.review-author').height = '124';
    };
    _picture.onerror = function() {
      element.classList.add('review-load-failure');
    };
    element.querySelector('.review-text').textContent = data.description;
    container.appendChild(element);
    return element;
  };

  window.reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
  reviewsFilter.classList.remove('invisible');
})();
