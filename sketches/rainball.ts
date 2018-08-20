import { Sketch } from "../sketch";

export class Rainball implements Sketch {

	title: string = "rainball";

	distanceSinceDrop: number;
	trail: { x: number, y: number }[];

	position: { x: number, y: number };
	velocity: { x: number, y: number };
	acceleration: { x: number, y: number };

	followRate: number = 1;
	centerFactor: number = .99;
	cursor: { x: number, y: number } = [0, 0];

	lockedInCenter: boolean = false;

	setup(size: { w: number, h: number }): void {

		this.distanceSinceDrop = 0;
		this.trail = [];

		this.position = { x: size.w / 2, y: size.h / 2 };
		this.velocity = { x: 0, y: 0 };
		this.acceleration = { x: 0, y: 0 };
	}

	update(ctx: CanvasRenderingContext2D, size: { w: number, h: number }, t: number, dt: number): void {

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, size.w, size.h);

		if (this.lockedInCenter) {
			this.position = {
				x: size.w / 2 + this.centerFactor * (this.position.x - size.w / 2),
				y: size.h / 2 + this.centerFactor * (this.position.y - size.h / 2)
			};
			this.velocity = { x: 0, y: 0 };
			this.acceleration = { x: 0, y: 0 };
		} else {
			// physics
			this.velocity = {
				x: this.velocity.x + this.acceleration.x * dt,
				y: this.velocity.y + this.acceleration.y * dt
			};

			if (this.position.x > size.w - 40) this.velocity.x = -Math.abs(this.velocity.x);
			if (this.position.x < 40) this.velocity.x = Math.abs(this.velocity.x);
			if (this.position.y > size.h - 40) this.velocity.y = -Math.abs(this.velocity.y);
			if (this.position.y < 40) this.velocity.y = Math.abs(this.velocity.y);

			this.position = {
				x: this.position.x + this.velocity.x * dt,
				y: this.position.y + this.velocity.y * dt
			}
		}

		this.trail.push(this.position);

		// trail render
		let count = 0;
		this.trail.forEach(pos => {
			ctx.fillStyle = "hsl(" + (10 * count) + ", 100%, 50%)";
			count += 1;
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 20 + .4 * count, 0, 2 * Math.PI);
			ctx.fill();
		});

		this.trail = this.trail.slice(this.trail.length - 100, this.trail.length);

		// main ball render
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, 40, 0, 2 * Math.PI);
		ctx.fill();

		// force indication
		ctx.strokeStyle = "#ccc"
		ctx.beginPath();
		ctx.moveTo(this.position.x, this.position.y);
		ctx.lineTo(this.cursor.x, this.cursor.y);
		ctx.stroke();
	}

	keydown(ev: KeyboardEvent): void { }
	keyup(ev: KeyboardEvent): void { }

	mousedown(ev: MouseEvent): void {
		this.lockedInCenter = !this.lockedInCenter;
	}
	mouseup(ev: MouseEvent): void { }

	mousemove(ev: MouseEvent): void {

		this.cursor = { x: ev.clientX, y: ev.clientY };

		this.acceleration = {
			x: this.followRate * (ev.clientX - this.position.x),
			y: this.followRate * (ev.clientY - this.position.y)
		};
	}
	mousewheel(ev: MouseEvent): void { }
}