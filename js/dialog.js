'use strict';

(function () {
  var setupDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var dialogHandle = setupDialog.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    if (evt.target.nodeName !== 'INPUT') {
      window.util.onEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    var setupClose = setupDialog.querySelector('.setup-close');

    setupDialog.classList.remove('hidden');
    window.setup.fillListElement();
    setupDialog.querySelector('.setup-similar').classList.remove('hidden');

    setupClose.addEventListener('click', closePopup);
    setupClose.addEventListener('keydown', function (evt) {
      window.util.onEnterEvent(evt, closePopup);
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setupDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupDialog.style.top = '';
    setupDialog.style.left = '';
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.onEnterEvent(evt, openPopup);
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
