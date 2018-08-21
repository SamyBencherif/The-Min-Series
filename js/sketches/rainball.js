"use strict";
exports.__esModule = true;
var Rainball = (function () {
    function Rainball() {
        this.title = "rainball";
        this.followRate = 1;
        this.centerFactor = .99;
        this.lockedInCenter = false;
    }
    Rainball.prototype.setup = function (size) {
        this.distanceSinceDrop = 0;
        this.trail = [];
        this.cursor = { x: size.w / 2, y: size.h / 2 };
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