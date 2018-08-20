import { Sketch } from "../sketch";

const random = Math.random; // random float between 0 and 1
const r = function () { return Math.random() - .5 }; // random float between -.5 and .5
const rComp = function () { return Math.floor(256 * Math.random()) }; // random int from 0 to 255

export class Radio implements Sketch {

	title: string = "radio";

	lines: { x1: number, y1: number, x2: number, y2: number }[];
	mouseCursor: { x: number, y: number };

	setup(size: { w: number, h: number }): void {
		this.lines = [];
		this.mouseCursor = { x: size.w / 2, y: size.h / 2 };
	}

	update(ctx: CanvasRenderingContext2D, size: { w: number, h: number }, t: number, dt: number): void {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, size.w, size.h);

		let ox = this.mouseCursor.x;
		let oy = this.mouseCursor.y;
		this.lines.push({ x1: ox + 46 * r(), y1: oy + 46 * r(), x2: ox + 46 * r(), y2: oy + 46 * r() })

		this.lines.forEach(line => {
			line.x1 -= ox;
			line.y1 -= oy;
			line.x2 -= ox;
			line.y2 -= oy;

			line.x1 *= 1 + random() / 10
			line.y1 *= 1 + random() / 10
			line.x2 *= 1 + random() / 10
			line.y2 *= 1 + random() / 10

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

	}

	keydown(ev: KeyboardEvent): void { }
	keyup(ev: KeyboardEvent): void { }
	mousedown(ev: MouseEvent): void { }
	mouseup(ev: MouseEvent): void { }
	mousemove(ev: MouseEvent): void {
		this.mouseCursor = { x: ev.clientX, y: ev.clientY };
	}
	mousewheel(ev: MouseEvent): void { }
}