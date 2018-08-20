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