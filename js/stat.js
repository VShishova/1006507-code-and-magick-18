'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var TEXT_GAP = (CLOUD_HEIGHT - BAR_HEIGHT) / 6;

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
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

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var columnHeight = times[i] * BAR_HEIGHT / maxTime;
    ctx.fillRect(CLOUD_X + TEXT_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + TEXT_GAP * 4 + (BAR_HEIGHT - columnHeight), COLUMN_WIDTH, columnHeight);
    ctx.fillText(names[i], CLOUD_X + TEXT_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + TEXT_GAP * 5 + BAR_HEIGHT);
  }
};

// var CLOUD_WIDTH = 500;
// var CLOUD_HEIGHT = 200;
// var CLOUD_X = 100;
// var CLOUD_Y = 50;
// var GAP = 10;
// var FONT_GAP = 15;
// var TEXT_WIDTH = 50;
// var BAR_HEIGHT = 20;
// var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

// var renderCloud = function(ctx, x, y, color) {
//   ctx.fillStyle = color;
//   ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
// };

// var getMaxElement = function(arr) {
//   var maxElement = arr[0];

//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] > maxElement) {
//       maxElement = arr[i];
//     }
//   }

//   return maxElement;
// };

// window.renderStatistics = function(ctx, players, times) {
//   renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
//   renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

//   ctx.fillStyle = '#000';

//   var maxTime = getMaxElement(times);

//   for (var i = 0; i < players.length; i++) {
//     ctx.fillText(players[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
//     ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT);
//   }
// };
