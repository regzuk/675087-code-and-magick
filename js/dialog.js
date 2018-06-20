'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var userSetupDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userSetupDialog.querySelector('.setup-close');
  var setupUserPic = userSetupDialog.querySelector('.upload');

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
    userSetupDialog.style.left = '';
    userSetupDialog.style.top = '';
  };

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

  setupUserPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var coords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: coords.x - moveEvt.clientX,
        y: coords.y - moveEvt.clientY
      };
      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userSetupDialog.style.left = (userSetupDialog.offsetLeft - shift.x) + 'px';
      userSetupDialog.style.top = (userSetupDialog.offsetTop - shift.y) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          setupUserPic.removeEventListener('click', clickPreventDefaultHandler);
        };
        setupUserPic.addEventListener('click', clickPreventDefaultHandler);
      }

    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
