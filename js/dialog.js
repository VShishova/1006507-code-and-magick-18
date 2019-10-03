'use strict';

(function () {
  var onPopupEscPress = function (evt) {
    if (evt.target.nodeName !== 'INPUT') {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    var setupClose = setupDialog.querySelector('.setup-close');
    setupDialog.classList.remove('hidden');
    window.setup.fillListElement();
    setupDialog.querySelector('.setup-similar').classList.remove('hidden');

    window.util.colorize(setupDialog.querySelector('.wizard-coat'), setupDialog.querySelector('input[name = "coat-color"]'), window.setup.WIZARD_COAT_COLORS);
    window.util.colorize(setupDialog.querySelector('.wizard-eyes'), setupDialog.querySelector('input[name = "eyes-color"]'), window.setup.WIZARD_EYES_COLORS);
    window.util.colorize(setupDialog.querySelector('.setup-fireball-wrap'), setupDialog.querySelector('input[name = "fireball-color"]'), window.setup.WIZARD_EYES_COLORS);

    setupClose.addEventListener('click', function () {
      closePopup();
    });
    setupClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupDialog.style.top = '';
    setupDialog.style.left = '';
  };

  var setupDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var dialogHandle = setupDialog.querySelector('.upload');

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialog.style.top = (setupDialog.offsetTop - shift.y) + 'px';
      setupDialog.style.left = (setupDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);

      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
