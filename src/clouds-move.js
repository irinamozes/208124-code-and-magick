'use strict';
var headerClouds = document.querySelector('.header-clouds');
var headerCloudsPosition = headerClouds.getBoundingClientRect();
var _posClouds = [];
_posClouds[0] = headerCloudsPosition.left;
_posClouds[1] = headerCloudsPosition.right;
var _demo = document.querySelector('.demo');
var demoPosition = _demo.getBoundingClientRect();
var _posDemo;
_posDemo = demoPosition.bottom;
var THROTTLE_DELAY = 100;

var _setScrollClouds = function() {
  var lastCall = Date.now();
  var lastPageY = window.pageYOffset;
  window.addEventListener('scroll', function() {
    var pageY = window.pageYOffset;
    if (Date.now() - lastCall >= THROTTLE_DELAY) {

      if (window.pageYOffset > _posDemo) {
        game.setGameStatus(window.Game.Verdict.PAUSE);
      }

      if (lastPageY - pageY > 0) {
        _posClouds[0] = _posClouds[0] + 55;
      } else {
        _posClouds[0] = _posClouds[0] - 10;
      }
      lastCall = Date.now();
    }

    headerClouds.style.backgroundPositionX = _posClouds[0] + 'px';
    lastPageY = window.pageYOffset;
  });
};

module.exports = _setScrollClouds;
