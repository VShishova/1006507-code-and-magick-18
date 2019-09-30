'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_NUMBERS = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomElement = function (arr) {
  var randomElement = Math.floor(Math.random() * arr.length);
  return arr[randomElement];
};

var renderWizzardsArray = function () {
  var wizzardArray = [];

  for (var i = 1; i <= WIZARD_NUMBERS; i++) {
    var wizzardElement = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS)
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

var fillListElement = function (arr, ListElement, WizardTemplate) {
  var fragment = document.createDocumentFragment();
  while (ListElement.firstChild) {
    ListElement.removeChild(ListElement.firstChild);
  }
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i], WizardTemplate));
  }
  ListElement.appendChild(fragment);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target.nodeName !== 'INPUT') {
    closePopup();
  }
};

var openPopup = function () {
  setupDialog.classList.remove('hidden');

  var setupClose = setupDialog.querySelector('.setup-close');
  var wizardCoat = setupDialog.querySelector('.wizard-coat');
  var wizardEyes = setupDialog.querySelector('.wizard-eyes');
  var fireball = setupDialog.querySelector('.setup-fireball-wrap');

  fillListElement(renderWizzardsArray(), setupDialog.querySelector('.setup-similar-list'), document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'));
  setupDialog.querySelector('.setup-similar').classList.remove('hidden');

  wizardCoat.addEventListener('click', function () {
    changeWizardElementColor(wizardCoat, setupDialog.querySelector('input[name = "coat-color"]'), WIZARD_COAT_COLORS);
  });
  wizardEyes.addEventListener('click', function () {
    changeWizardElementColor(wizardEyes, setupDialog.querySelector('input[name = "eyes-color"]'), WIZARD_EYES_COLORS);
  });
  fireball.addEventListener('click', function () {
    changeFireballColor(fireball, setupDialog.querySelector('input[name = "fireball-color"]'));
  });
  setupClose.addEventListener('click', function () {
    closePopup();
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var changeWizardElementColor = function (wizardElement, elementInput, values) {
  var elementColor = getRandomElement(values);
  wizardElement.style.fill = elementColor;
  elementInput.value = elementColor;
};

var changeFireballColor = function (fireballElement, elementInput) {
  var elementColor = getRandomElement(FIREBALL_COLORS);
  fireballElement.style = 'background-color: ' + elementColor;
  elementInput.value = elementColor;
};

var setupDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
