'use strict';

var templateElement = document.querySelector('template');
var elementToClone;
if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}
var IMAGE_LOAD_TIMEOUT = 10000;
var getReviewElement = function(data) {
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
  return element;
};

var Review = function(data, container) {
  this.data = data;
  this.element = getReviewElement(this.data);

  var quizYes = this.element.querySelector('.review-quiz-answer-yes');
  var quizNo = this.element.querySelector('.review-quiz-answer-no');

  this.clickYes = function() {
    quizNo.classList.remove('review-quiz-answer-active');
    quizYes.classList.add('review-quiz-answer-active');
  };
  this.clickNo = function() {
    quizYes.classList.remove('review-quiz-answer-active');
    quizNo.classList.add('review-quiz-answer-active');
  };

  this.remove = function() {
    quizYes.removeEventListener('click', this.clickYes);
    quizNo.removeEventListener('click', this.clickNo);
    this.element.parentNode.removeChild(this.element);
  };

  quizYes.addEventListener('click', this.clickYes);
  quizNo.addEventListener('click', this.clickNo);
  container.appendChild(this.element);

};

module.exports = Review;
