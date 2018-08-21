
import { Sketch } from "./sketch";

import { Introduction } from "./sketches/introduction"
import { EnergyAnimation } from "./sketches/energy";
import { Radio } from "./sketches/radio";
import { Rainball } from "./sketches/rainball";
import { TicTacy } from "./sketches/tictacy";
import { Spiral } from "./sketches/spiral";

let canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;

let res = 2.4;

function setCanvasDimensions() {
	canvas.width = res * document.body.clientWidth;
	canvas.height = res * (document.body.clientHeight - 50);
}
window.addEventListener('resize', setCanvasDimensions);
setCanvasDimensions();

let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

let currentSketch: Sketch = undefined;

let initTime: number = Date.now();
let prevTime: number = Date.now();

function anim() {
	ctx.save();
	ctx.scale(res, res);
	let currTime = (Date.now() - initTime) / 1000;
	let deltaTime = (Date.now() - prevTime) / 1000;
	if (currentSketch != undefined)
		currentSketch.update(ctx, { w: canvas.width / res, h: canvas.height / res }, currTime, deltaTime);
	ctx.restore();
	prevTime = Date.now();
	window.requestAnimationFrame(anim);
}

window.requestAnimationFrame(anim);

// keyboard
canvas.addEventListener('keydown',
	function (ev: KeyboardEvent) {
		currentSketch.keydown(ev)
	}
);

canvas.addEventListener('keyup',
	function (ev: KeyboardEvent) {
		currentSketch.keyup(ev)
	}
);

// mouse buttons
canvas.addEventListener('mousedown',
	function (ev: MouseEvent) {
		currentSketch.mousedown(ev);
	}
);

canvas.addEventListener('mouseup',
	function (ev: MouseEvent) {
		currentSketch.mouseup(ev)
	}
);

// mouse movements
canvas.addEventListener('mousemove',
	function (ev: MouseEvent) {
		currentSketch.mousemove(ev)
	}
);

canvas.addEventListener('mousewheel',
	function (ev: MouseEvent) {
		currentSketch.mousewheel(ev)
	}
);

function loadActionSet(sketch: Sketch) {
	currentSketch = sketch;
	currentSketch.setup({ w: canvas.width / res, h: canvas.height / res });
}

function addCard(sketch: Sketch) {

	let cardsElement = document.querySelector("#cards");

	let newCardElement = document.createElement("div");
	newCardElement.className = "card"

	let ico = document.createElement("img");
	ico.src = "icons/" + sketch.title + ".png";
	ico.style.width = "34px";
	ico.style.height = "34px";

	newCardElement.appendChild(ico);

	cardsElement.appendChild(newCardElement);

	newCardElement.addEventListener("mousedown", function () { loadActionSet(sketch) });
}

let collection = [new Introduction, new EnergyAnimation, new Radio, new Rainball, new TicTacy, new Spiral];

loadActionSet(collection[0]);

collection.forEach(sketch => {
	if (sketch.title != "introduction")
		addCard(sketch);
});