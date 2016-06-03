
getMessage = function (a, b) {
  if (typeof a === 'boolean') {
    if (a === true) {
      mes="Я попал в " + b.toString();
    }
    if (a === false) {
      mes="Я никуда не попал";
    }
  }
  if (typeof a === 'number') {
    mes="Я прыгнул на " + (a*100).toString() + " сантиметров";
  }
  if (typeof a === 'object' && a.constructor === Array) {
    var sum = 0;
    var lengtha = a.length;
    var i;
    for (i=0; i<=lengtha-1; i++) {
      sum = sum + a[i];
    }
      mes="Я прошёл " + (sum).toString() + " шагов";

  }
  if ((typeof a == 'object' && a.constructor === Array) & (typeof b == 'object'  && b.constructor === Array)) {
    var lengthmin=0;
    if(a.length <= b.length)
      lengthmin=a.length;
    else
      lengthmin=b.length;
      var sum1=0;
      var i1;
      for (i1=0; i1<=lengthmin-1; i1++) {
        sum1 = sum1 + a[i1]*b[i1];
      }
        mes="Я прошёл " + (sum1).toString() + " метров";

  }
    return mes;
};
