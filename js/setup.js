'use strict';

(function () {
  // var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_NUMBERS = 4;

  var setupDialog = document.querySelector('.setup');
  var similarListElement = setupDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var form = setupDialog.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setupDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

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

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    while (similarListElement.firstChild) {
      similarListElement.removeChild(similarListElement.firstChild);
    }

    for (var i = 0; i < WIZARD_NUMBERS; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomElement(wizards), similarWizardTemplate));
    }
    similarListElement.appendChild(fragment);
  };

  // var renderWizzardsArray = function () {
  //   var wizzardArray = [];

  //   for (var i = 1; i <= WIZARD_NUMBERS; i++) {
  //     var wizzardElement = {
  //       name: window.util.getRandomElement(WIZARD_NAMES) + ' ' + window.util.getRandomElement(WIZARD_SURNAMES),
  //       coatColor: window.util.getRandomElement(WIZARD_COAT_COLORS),
  //       eyesColor: window.util.getRandomElement(WIZARD_EYES_COLORS)
  //     };
  //     wizzardArray.push(wizzardElement);
  //   }
  //   return wizzardArray;
  // };

  var renderWizard = function (wizard, WizardTemplate) {
    var wizardElement = WizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.setup = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    fillListElement: function () {
      window.backend.load(successHandler, errorHandler);
    }
  };
})();
