'use strict';

(function () {
  var rgbToHex = function (rgbString) {
    if (rgbString.length > 0 && rgbString.charAt(0) === 'r') {
      rgbString = rgbString.replace('rgb(', '').replace(')', '').split(',');
      var r = parseInt(rgbString[0], 10).toString(16);
      var g = parseInt(rgbString[1], 10).toString(16);
      var b = parseInt(rgbString[2], 10).toString(16);
      r = r.length === 1 ? '0' + r : r;
      g = g.length === 1 ? '0' + g : g;
      b = b.length === 1 ? '0' + b : b;
      var colHex = '#' + r + g + b;
      return colHex;
    }
    return rgbString;
  };

  var userSetupDialog = document.querySelector('.setup');
  var similarListElement = userSetupDialog.querySelector('.setup-similar-list');
  window.loadWizardsHandler = function (wizards) {
    similarListElement.appendChild(window.createWizardList(wizards));
    userSetupDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var COAT_COLORS = document.COAT_COLORS;
  var EYES_COLORS = document.EYES_COLORS;
  var FIREBALL_COLORS = document.FIREBALL_COLORS;
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
      newColor = document.getRandomArrayElement(FIREBALL_COLORS);
    } while (newColor === color);
    userSetupDialog.querySelector('input[name=fireball-color]').value = newColor;
    fireball.style.backgroundColor = newColor;
  });
  userSetupDialog.querySelector('.setup-submit').addEventListener('click', function () {
    userSetupDialog.querySelector('.setup-wizard-form').submit();
  });
})();
