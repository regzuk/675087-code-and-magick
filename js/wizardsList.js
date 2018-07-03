'use strict';

(function () {
  window.COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  window.EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  window.FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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
  var createWizardList = function (wizards, coat, eyes) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

    var sortingWizards = wizards.map(function (x) {
      x.rank = 0;
      if (x.colorCoat === coat) {
        x.rank += 2;
      }
      if (x.colorEyes === eyes) {
        x.rank += 1;
      }
      return x;
    }).sort(function (a, b) {
      return b.rank - a.rank;
    });

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(createSimilarWizard(sortingWizards[i], similarWizardTemplate));
    }
    return fragment;
  };
  window.createWizardList = createWizardList;
})();
