'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupDialog = document.querySelector('.setup');
  var form = setupDialog.querySelector('.setup-wizard-form');

  var wizardCoatElement = setupDialog.querySelector('.wizard-coat');
  var wizardEyesElement = setupDialog.querySelector('.wizard-eyes');
  var firebalElement = setupDialog.querySelector('.setup-fireball-wrap');

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render.renderWizardsList(wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successLoadHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var fillListElement = function () {
    window.backend.load(successLoadHandler, errorHandler);
  };

  wizardCoatElement.addEventListener('click', function () {
    coatColor = window.util.colorize(wizardCoatElement, setupDialog.querySelector('input[name = "coat-color"]'), WIZARD_COAT_COLORS);
    updateWizards();
  });
  wizardEyesElement.addEventListener('click', function () {
    eyesColor = window.util.colorize(wizardEyesElement, setupDialog.querySelector('input[name = "eyes-color"]'), WIZARD_EYES_COLORS);
    updateWizards();
  });
  firebalElement.addEventListener('click', function () {
    window.util.colorize(firebalElement, setupDialog.querySelector('input[name = "fireball-color"]'), FIREBALL_COLORS);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      setupDialog.classList.add('hidden');
    }, errorHandler);
  });

  window.setup = {
    fillListElement: fillListElement
  };
})();
