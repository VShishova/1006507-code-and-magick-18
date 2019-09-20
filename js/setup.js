'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupDialog = document.querySelector('.setup');
setupDialog.classList.remove('hidden');

var similarListElement = setupDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (arr) {
  var randomElement = Math.floor(Math.random() * arr.length);
  return arr[randomElement];
};

var renderWizzardsArray = function (num) {
  var wizzardArray = [];

  for (var i = 1; i <= num; i++) {
    var wizzardElement = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS)
    };
    wizzardArray.push(wizzardElement);
  }
  return wizzardArray;
};

// var wizards = [
//   {
//     name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
//     coatColor: getRandomElement(WIZARD_COAT_COLORS),
//     eyesColor: getRandomElement(WIZARD_EYES_COLORS)
//   },
//   {
//     name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
//     coatColor: getRandomElement(WIZARD_COAT_COLORS),
//     eyesColor: getRandomElement(WIZARD_EYES_COLORS)
//   },
//   {
//     name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
//     coatColor: getRandomElement(WIZARD_COAT_COLORS),
//     eyesColor: getRandomElement(WIZARD_EYES_COLORS)
//   },
//   {
//     name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
//     coatColor: getRandomElement(WIZARD_COAT_COLORS),
//     eyesColor: getRandomElement(WIZARD_EYES_COLORS)
//   }
// ];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillListElement = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);
};

fillListElement(renderWizzardsArray(4));
setupDialog.querySelector('.setup-similar').classList.remove('hidden');
