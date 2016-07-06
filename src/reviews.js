'use strict';
(function() {
  var Review = require('./review');

  var elemFilter;
  var idReview = localStorage.getItem('f');
  if (idReview !== 'undefined') {
    elemFilter = document.getElementById(idReview);
    elemFilter.setAttribute('checked', 'checked');
  } else {
    elemFilter = document.getElementById('reviews-all');
    elemFilter.setAttribute('checked', 'checked');
  }

  var reviewsSection = document.querySelector('.reviews');
  var reviewsFilter = document.querySelector('.reviews-filter');
  reviewsFilter.classList.add('invisible');
  reviewsSection.classList.add('reviews-list-loading');
  var reviewsContainer = document.querySelector('.reviews-list');
  var reviewsMore = document.querySelector('.reviews-controls-more');

  var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

  var renderedReviews = [];
  var PAGE_SIZE = 3;
  var pageNumber = 0;
  var filteredReviews = [];
  var filterPage;        // количество страниц для вывода отфильтрованного массива без округления

  var Filter = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };

  var renderReviews = function(reviews, page, replace) {
    if (replace) {
      renderedReviews.forEach(function(review) {
        review.remove();
      });
      renderedReviews = [];
    }

    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    reviews.slice(from, to).forEach(function(review) {
      renderedReviews.push(new Review(review, reviewsContainer));
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
    filteredReviews = getFilteredReviews(reviews, filter);
    filterPage = (filteredReviews.length / PAGE_SIZE);
    pageNumber = 0;
    if (filterPage > 1) {
      reviewsMore.classList.remove('invisible');
    } else {
      reviewsMore.classList.add('invisible');
    }
    renderReviews(filteredReviews, pageNumber, true);
  };

  var setFiltersEnabled = function() {
    reviewsFilter.addEventListener('click', function(evt) {
      if (evt.target.name === 'reviews') {
        localStorage.clear();
        var filterId = evt.target.id;
        localStorage.setItem('f', filterId);
        setFilterEnabled(evt.target.id);
      }
    });
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


  var isNextPageAvailable = function(reviews, page, pageSize) {
    filterPage = (reviews.length / pageSize);
    return page < Math.floor(reviews.length / pageSize);
  };

  var setScrollEnabled = function() {
    reviewsMore.addEventListener('click', function() {
      if (isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
        pageNumber++;
        if (pageNumber + 1 < filterPage) {
          reviewsMore.classList.remove('invisible');
        } else {
          reviewsMore.classList.add('invisible');
        }
        renderReviews(filteredReviews, pageNumber);
      }
    });
  };

  var reviews = [];
  getReviews(function(loadedReviews) {
    reviews = loadedReviews;
    setFiltersEnabled(true);
    setFilterEnabled('reviews-all');
    setScrollEnabled();
  });

  reviewsSection.classList.remove('reviews-list-loading');
  reviewsFilter.classList.remove('invisible');
})();
