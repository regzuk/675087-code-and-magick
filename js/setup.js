'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_COUNT = 4;

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArrayElement = function (arr) {
    return arr[Math.floor(arr.length * Math.random())];
  };
  var generateWizard = function () {
    return {
      name: getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES),
      coatColor: getRandomArrayElement(COAT_COLORS),
      eyesColor: getRandomArrayElement(EYES_COLORS)
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

  var rgbToHex = function (rgbString) {
    if (rgbString.length > 0 && rgbString.charAt(0) === 'r') {
      rgbString = rgbString.replace('rgb(', '').replace(')', '').split(',');
      var r = parseInt(rgbString[0], 10).toString(16);
      var g = parseInt(rgbString[1], 10).toString(16);
      var b = parseInt(rgbString[2], 10).toString(16);
      r = r.length === 1 ? '0' + r : r;
      g = g.length === 1 ? '0' + g : g;
      b = b.length === 1 ? '0' + b : b;
      var colHex='#' + r + g + b;
      return colHex;
    }
    return rgbString;
  };

  var userSetupDialog = document.querySelector('.setup');
  var similarListElement = userSetupDialog.querySelector('.setup-similar-list');
  similarListElement.appendChild(createWizardList());
  userSetupDialog.querySelector('.setup-similar').classList.remove('hidden');

  var setupDialogEscPressHandler = function (evt) {
    var setupUserName = userSetupDialog.querySelector('.setup-user-name');
    if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
      closeSetupDialog();
    }
  };

  var openSetupDialog = function () {
    userSetupDialog.classList.remove('hidden');
    document.addEventListener('keydown', setupDialogEscPressHandler);
  };
  var closeSetupDialog = function () {
    userSetupDialog.classList.add('hidden');
    document.removeEventListener('keydown', setupDialogEscPressHandler);
  };

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  setupOpen.addEventListener('click', function () {
    openSetupDialog();
  });
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openSetupDialog();
    }
  });
  setupClose.addEventListener('click', function () {
    closeSetupDialog();
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeSetupDialog();
    }
  });

  var wizardCoat = userSetupDialog.querySelector('.setup-wizard .wizard-coat');
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = COAT_COLORS[(COAT_COLORS.indexOf(wizardCoat.style.fill) + 1) % COAT_COLORS.length];
    userSetupDialog.querySelector('input[name=coat-color]').value = wizardCoat.style.fill;
  });
  var wizardEyes = userSetupDialog.querySelector('.setup-wizard .wizard-eyes');
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = EYES_COLORS[(EYES_COLORS.indexOf(wizardEyes.style.fill) + 1) % EYES_COLORS.length];
    userSetupDialog.querySelector('input[name=eyes-color]').value = wizardEyes.style.fill;
  });
  var fireball = userSetupDialog.querySelector('.setup-fireball-wrap');
  fireball.addEventListener('click', function () {
    var color = rgbToHex(fireball.style.backgroundColor);
    var newColor = color;
    do {
      newColor = getRandomArrayElement(FIREBALL_COLORS);
    } while (newColor === color);
    userSetupDialog.querySelector('input[name=fireball-color]').value = newColor;
    fireball.style.backgroundColor = newColor;
  });
  userSetupDialog.querySelector('.setup-submit').addEventListener('click', function () {
    userSetupDialog.querySelector('.setup-wizard-form').submit();
  });
})();
