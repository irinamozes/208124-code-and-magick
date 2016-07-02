'use strict';
(function() {
  var reviewsSection = document.querySelector('.reviews');
  var reviewsFilter = document.querySelector('.reviews-filter');
  reviewsFilter.classList.add('invisible');
  reviewsSection.classList.add('reviews-list-loading');
  var templateElement = document.querySelector('template');
  var reviewsContainer = document.querySelector('.reviews-list');
  var elementToClone;
  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  var IMAGE_LOAD_TIMEOUT = 10000;
  var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

  var Filter = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };

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

  var renderReviews = function(reviews) {
    reviewsContainer.innerHTML = '';
    reviews.forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
  };

  var getFilteredReviews = function(reviews, filter) {
    var reviewsToFilter = reviews.slice(0);
    switch (filter) {
      case Filter.GOOD:
        reviewsToFilter = reviewsToFilter.filter(
          function(rat) {
            return (rat.rating > 2);
          }
        );
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return (b.rating - a.rating);
        });
        break;

      case Filter.BAD:
        reviewsToFilter = reviewsToFilter.filter(
            function(rat) {
              return (rat.rating < 3);
            }
        );
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return (a.rating - b.rating);
        });
        break;

      case Filter.RECENT:

        var _date;
        var _adate;
        var _bdate;
        reviewsToFilter = reviewsToFilter.filter(
          function(rat) {
            _date = new Date(rat.date);
            return (_date.valueOf() <= Date.now() && _date.valueOf() > Date.now() - 20 * 24 * 60 * 60 * 1000);
          }

        );

        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          _adate = new Date(a.date);
          _bdate = new Date(b.date);
          return (_bdate.valueOf() - _adate.valueOf());
        });

        break;

      case Filter.POPULAR:
        reviewsToFilter = reviewsToFilter.sort(function(a, b) {
          return (b.review_usefulness - a.review_usefulness);
        });
        break;

    }
    return reviewsToFilter;
  };

  var setFilterEnabled = function(filter) {
    var filteredReviews = getFilteredReviews(reviews, filter);
    renderReviews(filteredReviews);
  };

  var setFiltersEnabled = function(enabled) {
    var filters = reviewsFilter.querySelectorAll('input[name="reviews"]');
    for (var i = 0; i < filters.length; i++) {
      filters[i].onclick = enabled ? function() {
        setFilterEnabled(this.id);
      } : null;
    }
  };

  var getReviews = function(callback) {
    var xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };

    xhr.onerror = function() {
      reviewsSection.classList.remove('reviews-list-loading');
      reviewsSection.classList.add('review-load-failure');
    };

    xhr.ontimeout = function() {
      reviewsSection.classList.remove('reviews-list-loading');
      reviewsSection.classList.add('review-load-failure');
    };

    xhr.open('GET', REVIEWS_LOAD_URL);
    xhr.send();
  };

  var reviews = [];
  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltersEnabled(true);
    setFilterEnabled('reviews-all');
  });

  reviewsSection.classList.remove('reviews-list-loading');
  reviewsFilter.classList.remove('invisible');
})();
