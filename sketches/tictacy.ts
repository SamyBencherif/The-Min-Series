import { Sketch } from "../sketch";

class Vector2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	mag(): number {
		return this.x * this.x + this.y * this.y;
	}

	mul(factor: number): Vector2 {
		return new Vector2(factor * this.x, factor * this.y);
	}

	add(other: Vector2): Vector2 {
		return new Vector2(this.x + other.x, this.y + other.y);
	}
}

function dist(a: { x: number, y: number }, b: { x: number, y: number }) {
	return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
}

export class TicTacy implements Sketch {
	title: string = "tictacy";

	// typedef Vector2[] Path;
	marks: Vector2[][];

	mouseIsDown: boolean = false;

	setup(size: { w: number; h: number; }): void {
		this.marks = [];

		let hh = size.h / 2;
		let wh = size.w / 2;

		let spc = 65;
		let bsz = 200;

		let bx0 = wh - bsz / 2;
		let bxf = wh + bsz / 2;

		let by0 = hh - bsz / 2;
		let byf = hh + bsz / 2;

		//make horizontal bars
		[hh - spc / 2, hh + spc / 2].forEach(y => {
			let bar = []
			for (let x = bx0; x < bxf; x += .1)
				bar.push(new Vector2(x, y))
			this.marks.push(bar)
		});


		//make vertical bars
		[wh - spc / 2, wh + spc / 2].forEach(x => {
			let bar = []
			for (let y = by0; y < byf; y += .1)
				bar.push(new Vector2(x, y))
			this.marks.push(bar)
		});
	}

	update(ctx: CanvasRenderingContext2D, size: { w: number; h: number; }, t: number, dt: number): void {
		ctx.fillStyle = "rgb(255, 252, 245)";
		ctx.fillRect(0, 0, size.w, size.h);


		ctx.strokeStyle = "rgb(23, 51, 122)";
		ctx.lineWidth = 3;

		this.marks.forEach(mark => {
			ctx.beginPath()
			for (let i = 0; i < mark.length - 1; i++) {
				// line(mark[i].x, mark[i].y, mark[i + 1].x, mark[i + 1].y);
				ctx.lineTo(mark[i].x, mark[i].y);
				ctx.lineTo(mark[i + 1].x, mark[i + 1].y);
			}
			ctx.stroke();
		});
	}

	keydown(ev: KeyboardEvent): void {

	}

	keyup(ev: KeyboardEvent): void {

	}

	mousedown(ev: MouseEvent): void {
		this.mouseIsDown = true;
	}

	mouseup(ev: MouseEvent): void {
		this.mouseIsDown = false;
	}

	mousemove(ev: MouseEvent): void {
		if (this.mouseIsDown) {
			// 	delta = touch.location-touch.prev_location
			// for i in rgln(self.marks):
			// 	for p in rgln(self.marks[i]):
			// 		dist = d(self.marks[i][p], touch.location)
			// 		influence = 1/float(1+(dist/60.)**2)
			// 		self.marks[i][p] += influence*delta

			ev.movementX
			ev.movementY

			this.marks.forEach(mark => {
				for (let i = 0; i < mark.length; i++) {
					let d = dist(mark[i], { x: ev.clientX, y: ev.clientY })
					let influence = 1 / (1 + Math.pow(d / 60, 2))
					mark[i].x += influence * ev.movementX;
					mark[i].y += influence * ev.movementY;
				}
			});
		}
	}
	mousewheel(ev: MouseEvent): void {

	}


}