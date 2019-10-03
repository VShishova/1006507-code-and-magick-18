'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_NUMBERS = 4;

  var setupDialog = document.querySelector('.setup');
  var SimilarListElement = setupDialog.querySelector('.setup-similar-list');
  var SimilarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizzardsArray = function () {
    var wizzardArray = [];

    for (var i = 1; i <= WIZARD_NUMBERS; i++) {
      var wizzardElement = {
        name: window.util.getRandomElement(WIZARD_NAMES) + ' ' + window.util.getRandomElement(WIZARD_SURNAMES),
        coatColor: window.util.getRandomElement(WIZARD_COAT_COLORS),
        eyesColor: window.util.getRandomElement(WIZARD_EYES_COLORS)
      };
      wizzardArray.push(wizzardElement);
    }
    return wizzardArray;
  };

  var renderWizard = function (wizard, WizardTemplate) {
    var wizardElement = WizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  window.setup = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    fillListElement: function () {
      var wizards = renderWizzardsArray();
      var fragment = document.createDocumentFragment();

      while (SimilarListElement.firstChild) {
        SimilarListElement.removeChild(SimilarListElement.firstChild);
      }
      for (var i = 0; i < wizards.length; i++) {
        fragment.appendChild(renderWizard(wizards[i], SimilarWizardTemplate));
      }
      SimilarListElement.appendChild(fragment);
    }
  };
})();
