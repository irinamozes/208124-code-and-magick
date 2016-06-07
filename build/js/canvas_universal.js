/**
* Функция splitText разбиения текста на подстроки и отрисовки
* поля canvas'а, подходящего по высоте текста.
* Параметры:
* text- передаваемый текст.
* x- отступ в поле канваса слева и справа.
* h- отступ в поле канваса сверху и снизу и высота строки вывода текста.
* maxWidth- ширина поля канваса вместе с отступами.
*/

function splitText(text, x, h, maxWidth)
    {
        var widthMin = maxWidth - 2*x; // ширина, которая должна быть у выводимых строк.
        var lines = []; // массив, в который заносятся строки нужной ширины.
        var hMax; // высота поля канваса вместе с отступами, расчитываемая по высоте строк.
        var words = text.split(" "); // массив разбиения текста на слова.
        var countWords = words.length;
        var line = ""; //переменная, в к-ю заносятся строки нужной ширины, которая затем добавляется к массиву lines.
        var hm = h;
        for (var n = 0; n < countWords; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = ctx.measureText(testLine).width;
            if (testWidth > widthMin) {
                lines[lines.length] = line; // занесение строки в массив lines.
                line = words[n] + " "; // занесение в line последнего слова, которое не влезло в формируемую строку.
                hm = hm +h; //расчет высоты сформированных строк
            }
            else {
                line = testLine; // если ширина формируемой строки меньше или равна нужной ширине.
            }
        }
        lines[lines.length] = line; // занесение последней строки из текста в массив lines.
        hm = hm +h;
        hMax = hm + 2*h;
        return (lines, hMax);
    }

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    var text;
    var x;
    var h;
    var maxWidth;

    ctx.font ='16px PT Mono';
    ctx.textBaseline ='hanging';
    splitText(text, x, h, maxWidth);

    /** Отрисовка поля канваса нужной ширины и высоты.*/

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect = (200, 200, maxWidth, hMax);
    ctx.shadowColor = rgba(0, 0, 0, 0.7);
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;


/** Вывод строк в поле канваса из массива lines.*/
    var len = lines.length;
    for (var i = 0; i < len; i++) {
      ctx.fillText(lines[i], x, h+i*h);
    }
