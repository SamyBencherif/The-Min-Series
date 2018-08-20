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
    }
    EnergyAnimation.prototype.setup = function () {
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
    EnergyAnimation.prototype.update = function (ctx, t, dt) {
        ctx.fillStyle = '#ebfffc';
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        for (var i = 0; i < this.p.length; i++) {
            this.v[i] = this.v[i].add(this.p[i].mul(this.g[i] * dt));
            this.p[i] = this.p[i].add(this.v[i].mul(dt));
            ctx.strokeStyle = '#4545ff';
            ctx.lineWidth = 1;
            var p1 = this.p[i];
            var p2 = this.p[(i + 1) % this.p.length];
            ctx.beginPath();
            ctx.moveTo(innerWidth / 2 + p1.x, innerHeight / 2 + p1.y);
            ctx.lineTo(innerWidth / 2 + p2.x, innerHeight / 2 + p2.y);
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
            this.setup();
        }
    };
    EnergyAnimation.prototype.mouseup = function (ev) { };
    EnergyAnimation.prototype.mousemove = function (ev) { };
    EnergyAnimation.prototype.mousewheel = function (ev) { };
    return EnergyAnimation;
}());
exports.EnergyAnimation = EnergyAnimation;
//# sourceMappingURL=energy-animation.js.map