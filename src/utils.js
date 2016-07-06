'use strict';
//  Вычисление даты ближайшего дня рождения в милисекундах
var _expiresDate = function() {
  var today = new Date();
  var myBirthday = new Date(today.getFullYear() + '-01' + '-20');
  if ((myBirthday.valueOf()) >= Date.now()) {
    myBirthday = new Date((today.getFullYear() - 1) + '-01' + '-20');
  }
  var expiresDate = ((Date.now() - myBirthday.valueOf())) / 1000 / 60 / 60 / 24;  // Срок жизни cookie
  return (expiresDate);
};
module.exports = _expiresDate;
