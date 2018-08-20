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