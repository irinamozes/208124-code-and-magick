
'use strict';

var overlayGallery = document.querySelector('.overlay-gallery');
var photogallerySection = document.querySelector('.photogallery');
var photogalleryImage = photogallerySection.querySelectorAll('img');
var overlayPreview = overlayGallery.querySelector('.overlay-gallery-preview');
var currentNumber = overlayGallery.querySelector('.preview-number-current');

var _numberImage;
var srcPfoto = [];
var savePfoto = function(srcList) {
  for ( var i = 0; i < photogalleryImage.length; i++) {
    srcList[i] = photogalleryImage.item(i).src;
  }
  return srcList;
};
savePfoto(srcPfoto);

var showGallery = function(numberImage) {
  overlayGallery.classList.remove('invisible');
  showPhoto(numberImage);
  return(numberImage);
};

var showPhoto = function(numberImage) {
  if (overlayPreview.childNodes.length > 3) {
    var largeImage = overlayPreview.querySelector('.imageLarge');
    overlayPreview.removeChild(largeImage);
  }
  var preview = new Image();
  overlayPreview.appendChild(preview);
  preview.src = srcPfoto[numberImage];
  preview.classList.add('imageLarge');
  currentNumber.textContent = numberImage + 1;
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

var movePhotoLeft = function() {
  var controlLeft = overlayGallery.querySelector('.overlay-gallery-control-left');
  controlLeft.onclick = function() {
    if (_numberImage > 0) {
      _numberImage = _numberImage - 1;
      showPhoto(_numberImage);
    } else {
      showPhoto(_numberImage);
    }
  };
};

var movePhotoRight = function() {
  var controlLeft = overlayGallery.querySelector('.overlay-gallery-control-right');
  controlLeft.onclick = function() {
    if (_numberImage < 5) {
      _numberImage = _numberImage + 1;
      showPhoto(_numberImage);
    } else {
      showPhoto(_numberImage);
    }
  };
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
      showGallery(_numberImage);
      movePhotoLeft();
      movePhotoRight();
    }
  });
};

clickPreview();

module.exports = savePfoto;
module.exports = showGallery;
