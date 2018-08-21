"use strict";
exports.__esModule = true;
var Spiral = (function () {
    function Spiral() {
        this.title = "spiral";
        this.points = [];
    }
    Spiral.prototype.setup = function (size) {
        this.CTime = 0;
        this.a = 0;
        this.i = 1;
        this.radiusSUga = 0;
        this.offsetSUga = { x: 0, y: 0 };
        this.attractionPoint = { x: size.w / 2 - 67, y: size.h / 2 };
    };
    Spiral.prototype.update = function (ctx, size, t, dt) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, size.w, size.h);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        this.points.splice(0, this.points.length - 500);
        var WMAX = Math.max(size.w, size.h);
        this.CTime += dt;
        if (this.CTime / 1000 > 10) {
            this.CTime = 0;
            this.i = -10 + 20 * Math.random();
            this.radiusSUga = Math.random();
            this.offsetSUga = { x: Math.random(), y: Math.random() };
        }
        this.points.push({ x: size.w / 2 + WMAX * Math.sin(this.a), y: size.h / 2 + WMAX * Math.cos(this.a) });
        this.a += this.i;
        ctx.beginPath();
        if (this.points.length)
            ctx.moveTo(this.points[0].x, this.points[0].y);
        for (var p in this.points) {
            this.points[p].x = (this.points[p].x - this.attractionPoint.x) * .99 + this.attractionPoint.x;
            this.points[p].y = (this.points[p].y - this.attractionPoint.y) * .99 + this.attractionPoint.y;
            ctx.lineTo(this.points[p].x, this.points[p].y);
        }
        ctx.stroke();
    };
    Spiral.prototype.keydown = function (ev) { };
    Spiral.prototype.keyup = function (ev) { };
    Spiral.prototype.mousedown = function (ev) { };
    Spiral.prototype.mouseup = function (ev) { };
    Spiral.prototype.mousemove = function (ev) {
        this.attractionPoint = { x: ev.clientX, y: ev.clientY };
    };
    Spiral.prototype.mousewheel = function (ev) { };
    return Spiral;
}());
exports.Spiral = Spiral;
//# sourceMappingURL=spiral.js.map