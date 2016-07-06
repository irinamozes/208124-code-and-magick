'use strict';

var overlayGallery = document.querySelector('.overlay-gallery');
var photogallerySection = document.querySelector('.photogallery');
var photogalleryImage = photogallerySection.querySelectorAll('img');
var overlayPreview = overlayGallery.querySelector('.overlay-gallery-preview');
var currentNumber = overlayGallery.querySelector('.preview-number-current');

var _numberImage;
var srcPfoto = [];
var _data;

var savePfoto = function(srcList) {
  for ( var i = 0; i < photogalleryImage.length; i++) {
    srcList[i] = photogalleryImage.item(i).src;
  }
  return srcList;
};
savePfoto(srcPfoto);

var showPhoto = function(data, numberImage) {
  var element = new Image();
  element.src = data;
  element.classList.add('imageLarge');
  currentNumber.textContent = numberImage + 1;
  return (element);
};

var Gallery = function(data, container, numberImage) {
  this.data = data;
  this.element = showPhoto(this.data, numberImage);
  container.appendChild(this.element);

  this.controlLeft = overlayGallery.querySelector('.overlay-gallery-control-left');
  this.controlLeft.onclick = function() {
    if (_numberImage > 0) {
      _numberImage = _numberImage - 1;
      _data = srcPfoto[_numberImage];
      showGallery(_data, overlayPreview, _numberImage);
    } else {
      _data = srcPfoto[_numberImage];
      showGallery(_data, overlayPreview, _numberImage);
    }
  };

  this.controlRight = overlayGallery.querySelector('.overlay-gallery-control-right');
  this.controlRight.onclick = function() {
    if (_numberImage < 5) {
      _numberImage = _numberImage + 1;
      _data = srcPfoto[_numberImage];
      showGallery(_data, overlayPreview, _numberImage);
    } else {
      _data = srcPfoto[_numberImage];
      showGallery(_data, overlayPreview, _numberImage);
    }
  };

};

var showGallery = function(data, container, numberImage) {
  var shownPhoto = [];
  overlayGallery.classList.remove('invisible');
  if (container.childNodes.length > 3) {
    var largeImage = container.querySelector('.imageLarge');
    container.removeChild(largeImage);
    shownPhoto.splice(0, 1);
  }
  shownPhoto.push(new Gallery(data, container, numberImage));
};


var onDocumentKeyDown = function() {
  window.addEventListener('keydown', hidePhoto);
};

var overlaygallerycloseOnCloseClick = function() {
  overlayGallery.addEventListener('click', hidePhoto);
};

var hidePhoto = function(evt) {
  if (evt.keyCode === 27 || evt.target.className === 'overlay-gallery-close') {
    overlayGallery.classList.add('invisible');
    window.removeEventListener('keydown', hidePhoto);
    overlayGallery.removeEventListener('click', hidePhoto);
  } else {
    return;
  }
};

var clickPreview = function() {
  photogallerySection.addEventListener('click', function(evt) {
    var target = evt.target;
    if (target.tagName !== 'IMG') {
      return;
    } else {
      var _src = target.src;
      _numberImage = srcPfoto.indexOf(_src);
      onDocumentKeyDown();
      overlaygallerycloseOnCloseClick();
      _data = srcPfoto[_numberImage];
      showGallery(_data, overlayPreview, _numberImage);
    }
  });
};

clickPreview();

module.exports = savePfoto;
module.exports = showGallery;
