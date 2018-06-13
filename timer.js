var splits;
var startedAt;
var pausedTime;
var pausedAt;

function init() {
  splits = [];
  startedAt = Date.now();
  pausedTime = 0;
  pausedAt = undefined;
  redraw();
}

function runtime() {
  return (isPaused() ? pausedAt : Date.now()) - startedAt - pausedTime;
}

function redraw() {
  console.log(splits);
  document.getElementById('counter').innerHTML = (isPaused() ? "Paused - " : "") + splits.length;
}

function add() {
  splits.push(runtime());
  redraw();
}

function remove() {
  splits.pop();
  redraw();
}

function isPaused() {
  return pausedAt !== undefined
}

function pause() {
  if (isPaused()) { return; }
  pausedAt = Date.now();
  redraw();
}

function resume() {
  if (!isPaused()) { return; }
  pausedTime += Date.now() - pausedAt;
  pausedAt = undefined;
  redraw();
}
