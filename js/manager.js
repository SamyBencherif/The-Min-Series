"use strict";
exports.__esModule = true;
var introduction_1 = require("./sketches/introduction");
var energy_1 = require("./sketches/energy");
var radio_1 = require("./sketches/radio");
var rainball_1 = require("./sketches/rainball");
var tictacy_1 = require("./sketches/tictacy");
var spiral_1 = require("./sketches/spiral");
var canvas = document.getElementById('mainCanvas');
var res = 2.4;
function setCanvasDimensions() {
    canvas.width = res * document.body.clientWidth;
    canvas.height = res * (document.body.clientHeight - 50);
}
window.addEventListener('resize', setCanvasDimensions);
setCanvasDimensions();
var ctx = canvas.getContext('2d');
var currentSketch = undefined;
var initTime = Date.now();
var prevTime = Date.now();
function anim() {
    ctx.save();
    ctx.scale(res, res);
    var currTime = (Date.now() - initTime) / 1000;
    var deltaTime = (Date.now() - prevTime) / 1000;
    if (currentSketch != undefined)
        currentSketch.update(ctx, { w: canvas.width / res, h: canvas.height / res }, currTime, deltaTime);
    ctx.restore();
    prevTime = Date.now();
    window.requestAnimationFrame(anim);
}
window.requestAnimationFrame(anim);
canvas.addEventListener('keydown', function (ev) {
    currentSketch.keydown(ev);
});
canvas.addEventListener('keyup', function (ev) {
    currentSketch.keyup(ev);
});
canvas.addEventListener('mousedown', function (ev) {
    currentSketch.mousedown(ev);
});
canvas.addEventListener('mouseup', function (ev) {
    currentSketch.mouseup(ev);
});
canvas.addEventListener('mousemove', function (ev) {
    currentSketch.mousemove(ev);
});
canvas.addEventListener('mousewheel', function (ev) {
    currentSketch.mousewheel(ev);
});
function loadActionSet(sketch) {
    currentSketch = sketch;
    currentSketch.setup({ w: canvas.width / res, h: canvas.height / res });
}
function addCard(sketch) {
    var cardsElement = document.querySelector("#cards");
    var newCardElement = document.createElement("div");
    newCardElement.className = "card";
    var ico = document.createElement("img");
    ico.src = "icons/" + sketch.title + ".png";
    ico.style.width = "34px";
    ico.style.height = "34px";
    newCardElement.appendChild(ico);
    cardsElement.appendChild(newCardElement);
    newCardElement.addEventListener("mousedown", function () { loadActionSet(sketch); });
}
var collection = [new introduction_1.Introduction, new energy_1.EnergyAnimation, new radio_1.Radio, new rainball_1.Rainball, new tictacy_1.TicTacy];
loadActionSet(collection[0]);
collection.forEach(function (sketch) {
    if (sketch.title != "introduction")
        addCard(sketch);
});
//# sourceMappingURL=manager.js.map
