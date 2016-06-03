function getMessage(a, b) {
    var mes;
      if (typeof a === 'boolean') {
        if (a) {
          mes = "Я попал в " + b;
         }
        else {
          mes = "Я никуда не попал";
         }
      }

       else {
         if (typeof a === 'number') {
         mes = "Я прыгнул на " + (a * 100) + " сантиметров";
         }
         else {
           if (Array.isArray(a) && Array.isArray(b)) {
             var lengthmin=0;
             a.forEach(function(item, i){
              lengthmin += item * b[i];
             return lengthmin;
          });

          mes="Я прошёл " + lengthmin + " метров";

        } else {
            if (Array.isArray(a)) {
              var sum = a.reduce(function(c, d) {
              return c + d;
              });

                mes = "Я прошёл " + sum + " шагов";

            }
        }
    }
  }
    return mes;  
}
