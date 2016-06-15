'use strict';
(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  validform();

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();

function validform(){
  var formReview = document.forms[1];                 // переменная формы отправки отзыва
  var elemsReview = document.getElementsByName('review-mark');  // коллекция радиобаттонов с оценками
  var tName = formReview.element.review-name;         // поле с именем
  var tArea = formReview.element.review-text;         // поле с отзывом
  var divReview = document.querySelector('.review-fields');    // блок со ссылками на обязательные незаполненные поля
  var battonSubmit = document.querySelector('button'); // кнопка Добавить отзыв
  battonSubmit.setAttribute('disabled','disabled');                         // установка атрибута disabled для кнопки отправки отзыва
  divReview.innerHTML = ' ';                          // очистка блока со ссылками
  divReview.innerHTML = 'Осталось заполнить:<br\
  <label for="review-name" class="review-fields-label review-fields-name">имя</label>';  // установка ссылки на поле с именем
  var butSub = 1;                                     // признак того, что кнопка отправки имеет атрибут disabled
  var reviewRef = 1;                                  // признак того, что блок со ссылками не пуст

  var theEnd = 0; // признак нажатия кнопки отправки формы и выхода из цикла
  // событие click на кнопке отправки отзыва
   battonSubmit.onclick = function(theEnd) {
    alert("Отзыв принят");
    return (theEnd = 1);
  };


  // бесконечный цикл на случай того, что пользователь будет менять свои решения по заполнению формы, не нажимая кнопку отправки
  // Hf,jnftn kb wbrk
  while (true) {
    if (theEnd) {
      break;
    }
    theEnd = 0;

    var a = true;
    switch (a) {
      case tName.value === '' && tArea.value === '':    // оба поля не заполнены
        if (!butSub) {
          battonSubmit.setAttribute(disabled);
          butSub = 1;
        }
             // если оценка меньше 3.
        if (elemsReview[0].checked || elemsReview[1].checked) {
          if (!butSub) {
            battonSubmit.setAttribute(disabled);
            butSub = 1;
          }
             //если блок ссылок пустой
          if (!reviewRef) {
            divReview.innerHTML = 'Осталось заполнить:<br>\
            <label for="review-name" class="review-fields-label review-fields-name">имя</label>\
            <label for="review-text" class="review-fields-label review-fields-text">отзыв</label>';
            //если блок ссылок не пустой
          } else {
            divReview.innerHTML = ' ';
            divReview.innerHTML = 'Осталось заполнить:<br>\
            <label for="review-name" class="review-fields-label review-fields-name">имя</label>\
            <label for="review-text" class="review-fields-label review-fields-text">отзыв</label> ';
            // если оценка больше или равна 3.
        } else {
           If (butSub) {
             battonSubmit.removeAttribute(disabled);
             butSub = 0;
           }
           If (!reviewRef) {
             divReview.innerHTML = 'Осталось заполнить:<br>\
             <label for="review-name" class="review-fields-label review-fields-name">имя</label>';
           } else {
            divReview.innerHTML = ' ';
            divReview.innerHTML = 'Осталось заполнить:<br>\
            <label for="review-name" class="review-fields-label review-fields-name">имя</label>';
          }
        }
        reviewRef = 1;
        break;

        case tName.value === '' && tArea.value !== '': // поле имя не заполнено, а отзыва заполнено (для любой оценки один и тот же случай)
          If (!butSub) {
            battonSubmit.setAttribute(disabled);
            butSub = 1;
          }
          If (!reviewRef) {
            divReview.innerHTML = 'Осталось заполнить:<br>\
             <label for="review-name" class="review-fields-label review-fields-name">имя</label>';
          } else {
            divReview.innerHTML = ' ';
            divReview.innerHTML = 'Осталось заполнить:<br>'+
             '<label for="review-name" class="review-fields-label review-fields-name">имя</label>';
          }
          reviewRef = 1;
          break;

      case tName.value !== '' && tArea.value === '': // поле имя  заполнено, а отзыва  не заполнено
        If (elemsReview[0].checked || elemsReview[1].checked) {
          If (!butSub) {
            battonSubmit.setAttribute(disabled);
            butSub = 1;
          }
          If (!reviewRef) {
            divReview.innerHTML = 'Осталось заполнить:<br>\
             <label for="review-text" class="review-fields-label review-fields-text">отзыв</label>';
             reviewRef = 1;
          } else {
            divReview.innerHTML = ' ';
            divReview.innerHTML = 'Осталось заполнить:<br>\
            <label for="review-text" class="review-fields-label review-fields-text">отзыв</label> ';
            reviewRef = 1;
        } else {
          If (butSub) {
            battonSubmit.removeAttribute(disabled);
            butSub = 0;
          }
          If (reviewRef) {
            divReview.innerHTML = ' ';
            reviewRef = 0;
          }
        }
        break;

        case tName.value !== '' && tArea.value !== '':// поле имя  заполнено и отзыва заполнено (для любой оценки один и тот же случай)
          If (butSub) {
            battonSubmit.removeAttribute(disabled);
            butSub = 0;
          }
          If (reviewRef) {
            divReview.innerHTML = ' ';
          }
          reviewRef = 0;
          break;
    }
  }
}
