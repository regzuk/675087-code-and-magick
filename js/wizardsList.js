'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  document.COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  document.EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  document.FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  var getRandomArrayElement = function (arr) {
    return arr[Math.floor(arr.length * Math.random())];
  };
  document.getRandomArrayElement = getRandomArrayElement;
  var createSimilarWizard = function (wizardOption, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardOption.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardOption.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardOption.colorEyes;

    return wizardElement;
  };
  var createWizardList = function (wizards) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(createSimilarWizard(wizards[i], similarWizardTemplate));
    }
    return fragment;
  };
  window.createWizardList = createWizardList;
})();
