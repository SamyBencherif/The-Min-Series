"use strict";
exports.__esModule = true;
var Introduction = (function () {
    function Introduction() {
        this.title = "introduction";
    }
    Introduction.prototype.setup = function (size) { };
    Introduction.prototype.update = function (ctx, size, t, dt) {
        ctx.fillStyle = "#eeeeee";
        ctx.fillRect(0, 0, size.w, size.h);
        ctx.strokeStyle = "#222831";
        ctx.font = "50px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.strokeText("Hello World", size.w / 2, size.h / 2 - 50);
        ctx.fillStyle = "#393e46";
        ctx.font = "20px Arial";
        ctx.fillText("Welcome to The Min Series, a collection of minimal graphical applications.", size.w / 2, size.h / 2);
        ctx.fillText("Created by Samy Bencherif.", size.w / 2, size.h / 2 + 50);
        ctx.fillStyle = "#00adb5";
        ctx.fillText("The Min Series", size.w / 2 - 150, size.h / 2 - .5);
    };
    Introduction.prototype.keydown = function (ev) { };
    Introduction.prototype.keyup = function (ev) { };
    Introduction.prototype.mousedown = function (ev) { };
    Introduction.prototype.mouseup = function (ev) { };
    Introduction.prototype.mousemove = function (ev) { };
    Introduction.prototype.mousewheel = function (ev) { };
    return Introduction;
}());
exports.Introduction = Introduction;
//# sourceMappingURL=introduction.js.map