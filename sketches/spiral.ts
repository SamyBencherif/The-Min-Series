
import { Sketch } from "../sketch"

export class Spiral implements Sketch {
	title: string = "spiral";

	attractionPoint: { x: number, y: number };

	CTime: number;
	a: number;
	i: number;

	radiusSUga: number;
	offsetSUga: { x: number, y: number };

	points: { x: number, y: number }[] = [];

	setup(size: { w: number; h: number; }): void {
		this.CTime = 0;
		this.a = 0;
		this.i = 1;

		this.radiusSUga = 0;
		this.offsetSUga = { x: 0, y: 0 };

		this.attractionPoint = { x: size.w / 2 - 67, y: size.h / 2 };
	}

	update(ctx: CanvasRenderingContext2D, size: { w: number; h: number; }, t: number, dt: number): void {

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, size.w, size.h);


		ctx.strokeStyle = 'white';
		// ctx.shadowColor = 'brown';
		// ctx.shadowBlur = 5;
		ctx.lineWidth = 1;

		this.points.splice(0, this.points.length - 500) //only keep 500 last data points

		var WMAX = Math.max(size.w, size.h);

		this.CTime += dt;

		if (this.CTime / 1000 > 10) {
			this.CTime = 0;
			this.i = -10 + 20 * Math.random()
			this.radiusSUga = Math.random();
			this.offsetSUga = { x: Math.random(), y: Math.random() }
		}

		this.points.push({ x: size.w / 2 + WMAX * Math.sin(this.a), y: size.h / 2 + WMAX * Math.cos(this.a) })

		this.a += this.i;

		ctx.beginPath();

		if (this.points.length)
			ctx.moveTo(this.points[0].x, this.points[0].y);


		for (var p in this.points) {
			this.points[p].x = (this.points[p].x - this.attractionPoint.x) * .99 + this.attractionPoint.x

			this.points[p].y = (this.points[p].y - this.attractionPoint.y) * .99 + this.attractionPoint.y

			ctx.lineTo(this.points[p].x, this.points[p].y);
		}
		ctx.stroke();
	}

	keydown(ev: KeyboardEvent): void { }

	keyup(ev: KeyboardEvent): void { }

	mousedown(ev: MouseEvent): void { }

	mouseup(ev: MouseEvent): void { }

	mousemove(ev: MouseEvent): void {
		this.attractionPoint = { x: ev.clientX, y: ev.clientY };
	}

	mousewheel(ev: MouseEvent): void { }

}