'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_MIN_HEIGHT = 10;
var COLUMN_GAP = 50;
var TEXT_GAP = (CLOUD_HEIGHT - BAR_HEIGHT) / 7;
var MAX_COLUMNS = Math.trunc(CLOUD_WIDTH / (COLUMN_WIDTH + COLUMN_GAP));
var BAR_GAP = Math.round((CLOUD_WIDTH - MAX_COLUMNS * (COLUMN_WIDTH + COLUMN_GAP) + COLUMN_GAP) / 2);

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getMinElement = function (arr) {
  var minElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < minElement) {
      minElement = arr[i];
    }
  }

  return minElement;
};

var getItemColor = function (item) {
  return item === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.random() * 100 + '%, 50%';
};

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = 'white';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 2);

  var minTime = getMinElement(times);
  var maxTime = getMaxElement(times);

  ctx.textBaseline = 'alphabetic';
  ctx.strokeStyle = 'black';

  for (var i = 0; i < Math.min(names.length, MAX_COLUMNS); i++) {
    var columnHeight = (times[i] - minTime) * (BAR_HEIGHT - COLUMN_MIN_HEIGHT) / (maxTime - minTime) + COLUMN_MIN_HEIGHT;

    ctx.fillStyle = getItemColor(names[i]);
    ctx.strokeText(Math.round(times[i]), CLOUD_X + BAR_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + TEXT_GAP * 4);
    ctx.fillRect(CLOUD_X + BAR_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + TEXT_GAP * 5 + (BAR_HEIGHT - columnHeight), COLUMN_WIDTH, columnHeight);
    ctx.strokeText(names[i], CLOUD_X + BAR_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + TEXT_GAP * 6 + BAR_HEIGHT);
  }
};
