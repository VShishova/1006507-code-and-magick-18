'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomElement = function (arr) {
    var randomElement = Math.floor(Math.random() * arr.length);
    return arr[randomElement];
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomElement: getRandomElement,
    getMaxElement: function (arr) {
      var maxElement = arr[0];

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }

      return maxElement;
    },
    getMinElement: function (arr) {
      var minElement = arr[0];

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] < minElement) {
          minElement = arr[i];
        }
      }

      return minElement;
    },
    colorize: function (element, elementInput, values) {
      element.addEventListener('click', function () {
        var color = getRandomElement(values);
        if (element.tagName.toLowerCase() === 'div') {
          element.style.backgroundColor = color;
        } else {
          element.style.fill = color;
        }
        elementInput.value = color;
      });
    }
  };

})();
