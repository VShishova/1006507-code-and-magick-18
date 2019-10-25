'use strict';

(function () {
  var WIZARD_NUMBERS = 4;

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizardsList = function (wizards) {
    var fragment = document.createDocumentFragment();

    while (similarListElement.firstChild) {
      similarListElement.removeChild(similarListElement.firstChild);
    }

    for (var i = 0; i < WIZARD_NUMBERS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.render = {
    renderWizardsList: renderWizardsList
  };
})();
