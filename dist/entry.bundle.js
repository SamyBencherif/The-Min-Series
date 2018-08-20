/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var energy_1 = __webpack_require__(7);
var radio_1 = __webpack_require__(6);
var rainball_1 = __webpack_require__(8);
var tictacy_1 = __webpack_require__(9);
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
var collection = [new energy_1.EnergyAnimation, new radio_1.Radio, new rainball_1.Rainball, new tictacy_1.TicTacy];
loadActionSet(collection[0]);
collection.forEach(function (sketch) {
    addCard(sketch);
});
//# sourceMappingURL=manager.js.map

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var random = Math.random;
var r = function () { return Math.random() - .5; };
var rComp = function () { return Math.floor(256 * Math.random()); };
var Radio = (function () {
    function Radio() {
        this.title = "radio";
    }
    Radio.prototype.setup = function (size) {
        this.lines = [];
        this.mouseCursor = { x: size.w / 2, y: size.h / 2 };
    };
    Radio.prototype.update = function (ctx, size, t, dt) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, size.w, size.h);
        var ox = this.mouseCursor.x;
        var oy = this.mouseCursor.y;
        this.lines.push({ x1: ox + 46 * r(), y1: oy + 46 * r(), x2: ox + 46 * r(), y2: oy + 46 * r() });
        this.lines.forEach(function (line) {
            line.x1 -= ox;
            line.y1 -= oy;
            line.x2 -= ox;
            line.y2 -= oy;
            line.x1 *= 1 + random() / 10;
            line.y1 *= 1 + random() / 10;
            line.x2 *= 1 + random() / 10;
            line.y2 *= 1 + random() / 10;
            line.x1 += ox;
            line.y1 += oy;
            line.x2 += ox;
            line.y2 += oy;
            ctx.strokeStyle = "rgb(" + rComp() + "," + rComp() + "," + rComp() + ")";
            ctx.lineWidth + 3;
            ctx.beginPath();
            ctx.lineTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.stroke();
        });
        this.lines = this.lines.slice(this.lines.length - 500, this.lines.length);
    };
    Radio.prototype.keydown = function (ev) { };
    Radio.prototype.keyup = function (ev) { };
    Radio.prototype.mousedown = function (ev) { };
    Radio.prototype.mouseup = function (ev) { };
    Radio.prototype.mousemove = function (ev) {
        this.mouseCursor = { x: ev.clientX, y: ev.clientY };
    };
    Radio.prototype.mousewheel = function (ev) { };
    return Radio;
}());
exports.Radio = Radio;
//# sourceMappingURL=radio.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cos = Math.cos;
var sin = Math.sin;
var pi = Math.PI;
var random = Math.random;
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.mul = function (factor) {
        return new Point(factor * this.x, factor * this.y);
    };
    Point.prototype.add = function (other) {
        return new Point(this.x + other.x, this.y + other.y);
    };
    return Point;
}());
var EnergyAnimation = (function () {
    function EnergyAnimation() {
        this.title = "energy";
    }
    EnergyAnimation.prototype.reset = function () {
        this.p = [];
        this.f = [];
        this.g = [];
        this.v = [];
        this.c = 0;
        var k = 300;
        for (var i = 0; i < k; i++) {
            this.p.push(new Point(cos(i * 2 * pi / k), sin(i * 2 * pi / k)).mul(100));
            this.f.push(50 + 50 * random());
            this.g.push(-20 - 20 * random());
            this.v.push(new Point(0, 0));
        }
    };
    EnergyAnimation.prototype.setup = function (size) {
        this.reset();
    };
    EnergyAnimation.prototype.update = function (ctx, size, t, dt) {
        ctx.fillStyle = '#ebfffc';
        ctx.fillRect(0, 0, size.w, size.h);
        for (var i = 0; i < this.p.length; i++) {
            this.v[i] = this.v[i].add(this.p[i].mul(this.g[i] * dt));
            this.p[i] = this.p[i].add(this.v[i].mul(dt));
            ctx.strokeStyle = '#4545ff';
            ctx.lineWidth = 1;
            var p1 = this.p[i];
            var p2 = this.p[(i + 1) % this.p.length];
            ctx.beginPath();
            ctx.moveTo(size.w / 2 + p1.x, size.h / 2 + p1.y);
            ctx.lineTo(size.w / 2 + p2.x, size.h / 2 + p2.y);
            ctx.stroke();
        }
    };
    EnergyAnimation.prototype.keydown = function (ev) {
    };
    EnergyAnimation.prototype.keyup = function (ev) { };
    EnergyAnimation.prototype.mousedown = function (ev) {
        this.c += 1;
        for (var i = 0; i < this.p.length; i++) {
            this.v[i] = this.v[i].add(this.p[i].mul(this.f[i]));
            this.f[i] = 50 + 50 * random();
            this.g[i] = -20 - 20 * random();
        }
        if (this.c > 5) {
            this.reset();
        }
    };
    EnergyAnimation.prototype.mouseup = function (ev) { };
    EnergyAnimation.prototype.mousemove = function (ev) { };
    EnergyAnimation.prototype.mousewheel = function (ev) { };
    return EnergyAnimation;
}());
exports.EnergyAnimation = EnergyAnimation;
//# sourceMappingURL=Energy.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rainball = (function () {
    function Rainball() {
        this.title = "rainball";
        this.followRate = 1;
        this.centerFactor = .99;
        this.cursor = [0, 0];
        this.lockedInCenter = false;
    }
    Rainball.prototype.setup = function (size) {
        this.distanceSinceDrop = 0;
        this.trail = [];
        this.position = { x: size.w / 2, y: size.h / 2 };
        this.velocity = { x: 0, y: 0 };
        this.acceleration = { x: 0, y: 0 };
    };
    Rainball.prototype.update = function (ctx, size, t, dt) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, size.w, size.h);
        if (this.lockedInCenter) {
            this.position = {
                x: size.w / 2 + this.centerFactor * (this.position.x - size.w / 2),
                y: size.h / 2 + this.centerFactor * (this.position.y - size.h / 2)
            };
            this.velocity = { x: 0, y: 0 };
            this.acceleration = { x: 0, y: 0 };
        }
        else {
            this.velocity = {
                x: this.velocity.x + this.acceleration.x * dt,
                y: this.velocity.y + this.acceleration.y * dt
            };
            if (this.position.x > size.w - 40)
                this.velocity.x = -Math.abs(this.velocity.x);
            if (this.position.x < 40)
                this.velocity.x = Math.abs(this.velocity.x);
            if (this.position.y > size.h - 40)
                this.velocity.y = -Math.abs(this.velocity.y);
            if (this.position.y < 40)
                this.velocity.y = Math.abs(this.velocity.y);
            this.position = {
                x: this.position.x + this.velocity.x * dt,
                y: this.position.y + this.velocity.y * dt
            };
        }
        this.trail.push(this.position);
        var count = 0;
        this.trail.forEach(function (pos) {
            ctx.fillStyle = "hsl(" + (10 * count) + ", 100%, 50%)";
            count += 1;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 20 + .4 * count, 0, 2 * Math.PI);
            ctx.fill();
        });
        this.trail = this.trail.slice(this.trail.length - 100, this.trail.length);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 40, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#ccc";
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.cursor.x, this.cursor.y);
        ctx.stroke();
    };
    Rainball.prototype.keydown = function (ev) { };
    Rainball.prototype.keyup = function (ev) { };
    Rainball.prototype.mousedown = function (ev) {
        this.lockedInCenter = !this.lockedInCenter;
    };
    Rainball.prototype.mouseup = function (ev) { };
    Rainball.prototype.mousemove = function (ev) {
        this.cursor = { x: ev.clientX, y: ev.clientY };
        this.acceleration = {
            x: this.followRate * (ev.clientX - this.position.x),
            y: this.followRate * (ev.clientY - this.position.y)
        };
    };
    Rainball.prototype.mousewheel = function (ev) { };
    return Rainball;
}());
exports.Rainball = Rainball;
//# sourceMappingURL=rainball.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.mag = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector2.prototype.mul = function (factor) {
        return new Vector2(factor * this.x, factor * this.y);
    };
    Vector2.prototype.add = function (other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    };
    return Vector2;
}());
function dist(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}
var TicTacy = (function () {
    function TicTacy() {
        this.title = "tictacy";
        this.mouseIsDown = false;
    }
    TicTacy.prototype.setup = function (size) {
        var _this = this;
        this.marks = [];
        var hh = size.h / 2;
        var wh = size.w / 2;
        var spc = 65;
        var bsz = 200;
        var bx0 = wh - bsz / 2;
        var bxf = wh + bsz / 2;
        var by0 = hh - bsz / 2;
        var byf = hh + bsz / 2;
        [hh - spc / 2, hh + spc / 2].forEach(function (y) {
            var bar = [];
            for (var x = bx0; x < bxf; x += .1)
                bar.push(new Vector2(x, y));
            _this.marks.push(bar);
        });
        [wh - spc / 2, wh + spc / 2].forEach(function (x) {
            var bar = [];
            for (var y = by0; y < byf; y += .1)
                bar.push(new Vector2(x, y));
            _this.marks.push(bar);
        });
    };
    TicTacy.prototype.update = function (ctx, size, t, dt) {
        ctx.fillStyle = "rgb(255, 252, 245)";
        ctx.fillRect(0, 0, size.w, size.h);
        ctx.strokeStyle = "rgb(23, 51, 122)";
        ctx.lineWidth = 3;
        this.marks.forEach(function (mark) {
            ctx.beginPath();
            for (var i = 0; i < mark.length - 1; i++) {
                ctx.lineTo(mark[i].x, mark[i].y);
                ctx.lineTo(mark[i + 1].x, mark[i + 1].y);
            }
            ctx.stroke();
        });
    };
    TicTacy.prototype.keydown = function (ev) {
    };
    TicTacy.prototype.keyup = function (ev) {
    };
    TicTacy.prototype.mousedown = function (ev) {
        this.mouseIsDown = true;
    };
    TicTacy.prototype.mouseup = function (ev) {
        this.mouseIsDown = false;
    };
    TicTacy.prototype.mousemove = function (ev) {
        if (this.mouseIsDown) {
            ev.movementX;
            ev.movementY;
            this.marks.forEach(function (mark) {
                for (var i = 0; i < mark.length; i++) {
                    var d = dist(mark[i], { x: ev.clientX, y: ev.clientY });
                    var influence = 1 / (1 + Math.pow(d / 60, 2));
                    mark[i].x += influence * ev.movementX;
                    mark[i].y += influence * ev.movementY;
                }
            });
        }
    };
    TicTacy.prototype.mousewheel = function (ev) {
    };
    return TicTacy;
}());
exports.TicTacy = TicTacy;
//# sourceMappingURL=tictacy.js.map

/***/ })
/******/ ]);