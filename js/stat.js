'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_SHIFT = 10;
var MAX_COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var TITLE_X = 170;
var TITLE_Y = 30;
var LINE_HEIGHT = 20;
var BAR_CHART_X = 150;
var BAR_CHART_Y = 70;
var PLAYER_NAME = 'Вы';
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getMaxElement = function(arr) {
  var max = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}

var getColumnColor = function() {
  return 'rgba(0, 0, 255, ' + Math.random() + ')';
}

window.renderStatistics = function(ctx, names, times) {
  renderCloud (ctx, CLOUD_X + SHADOW_SHIFT, CLOUD_Y + SHADOW_SHIFT, 'rgba(0, 0, 0, 0.7)');
  renderCloud (ctx, CLOUD_X, CLOUD_Y, 'white');

  ctx.font = '16px PT Mono';
  ctx.textBaseline="top";
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', TITLE_X, TITLE_Y);
  ctx.fillText('Список результатов:', TITLE_X, TITLE_Y + LINE_HEIGHT);

  var maxTime = Math.round(getMaxElement(times));
  for (var i = 0; i < times.length; i++) {
    var x = BAR_CHART_X + i * (COLUMN_WIDTH + COLUMN_GAP);
    var time = Math.round(times[i]);
    var name = names[i];
    var columnHeight = Math.round(MAX_COLUMN_HEIGHT * time / maxTime);
    var yTime = BAR_CHART_Y + (MAX_COLUMN_HEIGHT - columnHeight);
    var yColumn = yTime + LINE_HEIGHT;
    var yName = yColumn + columnHeight;

    ctx.fillStyle = 'black';
    ctx.fillText(time, x, yTime);
    ctx.fillText(name, x, yName);

    ctx.fillStyle = (name === PLAYER_NAME) ? PLAYER_COLOR : getColumnColor();
    ctx.fillRect(x, yColumn, COLUMN_WIDTH, columnHeight);
  }
};
