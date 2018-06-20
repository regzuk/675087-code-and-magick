'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  document.COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  document.EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  document.FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_COUNT = 4;
  debugger;

  var getRandomArrayElement = function (arr) {
    return arr[Math.floor(arr.length * Math.random())];
  };
  document.getRandomArrayElement = getRandomArrayElement;
  var generateWizard = function () {
    return {
      name: getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES),
      coatColor: getRandomArrayElement(document.COAT_COLORS),
      eyesColor: getRandomArrayElement(document.EYES_COLORS)
    };
  };
  var createSimilarWizard = function (wizardOption, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardOption.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardOption.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardOption.eyesColor;

    return wizardElement;
  };
  var createWizardList = function () {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(createSimilarWizard(generateWizard(), similarWizardTemplate));
    }

    return fragment;
  };
  document.createWizardList = createWizardList;
})();
