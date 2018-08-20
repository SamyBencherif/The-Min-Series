/**
 * Energy Animation
 *
 * By Samy Bencherif
 * Aug 18, 2018
 */

import { Sketch } from '../sketch';

const cos = Math.cos;
const sin = Math.sin;
const pi = Math.PI;
const random = Math.random;

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    mul(factor: number): Point {
        return new Point(factor * this.x, factor * this.y);
    }

    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }
}

export class EnergyAnimation implements Sketch {
    title: string = "energy";
    p: Point[];
    f: number[];
    g: number[];
    v: Point[];
    c: number;

    reset() {
        this.p = [];
        this.f = [];
        this.g = [];
        this.v = [];
        this.c = 0;
        let k: number = 300;
        for (let i = 0; i < k; i++) {
            this.p.push(new Point(
                cos(i * 2 * pi / k),
                sin(i * 2 * pi / k)
            ).mul(100));
            this.f.push(50 + 50 * random());
            this.g.push(-20 - 20 * random());
            this.v.push(new Point(0, 0));
        }
    }

    setup(size: { w: number, h: number }) {
        this.reset();
    }

    update(ctx: CanvasRenderingContext2D, size: { w: number, h: number }, t: number, dt: number) {

        //background
        ctx.fillStyle = '#ebfffc';
        ctx.fillRect(0, 0, size.w, size.h);

        //physics
        for (let i = 0; i < this.p.length; i++) {

            //change in velocity is proportional to (-position)
            this.v[i] = this.v[i].add(
                this.p[i].mul(this.g[i] * dt)
            );

            //change of position is equal to velocity
            this.p[i] = this.p[i].add(this.v[i].mul(dt));

            //rendering
            ctx.strokeStyle = '#4545ff';
            ctx.lineWidth = 1;
            let p1 = this.p[i];
            let p2 = this.p[(i + 1) % this.p.length];
            ctx.beginPath();
            ctx.moveTo(size.w / 2 + p1.x, size.h / 2 + p1.y);
            ctx.lineTo(size.w / 2 + p2.x, size.h / 2 + p2.y);
            ctx.stroke();
        }

    }

    keydown(ev: KeyboardEvent) {
    }

    keyup(ev: KeyboardEvent) { }

    mousedown(ev: MouseEvent) {
        this.c += 1;
        for (let i = 0; i < this.p.length; i++) {
            this.v[i] = this.v[i].add(this.p[i].mul(this.f[i]));
            this.f[i] = 50 + 50 * random()
            this.g[i] = -20 - 20 * random()
        }
        if (this.c > 5) {
            this.reset();
        }
    }

    mouseup(ev: MouseEvent) { }
    mousemove(ev: MouseEvent) { }
    mousewheel(ev: MouseEvent) { }
}