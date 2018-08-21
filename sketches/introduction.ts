
import { Sketch } from "../sketch";

export class Introduction implements Sketch {
	title: string = "introduction";

	setup(size: { w: number; h: number; }): void { }

	update(ctx: CanvasRenderingContext2D, size: { w: number; h: number; }, t: number, dt: number): void {
		ctx.fillStyle = "#eeeeee";
		ctx.fillRect(0, 0, size.w, size.h);

		ctx.strokeStyle = "#222831";
		ctx.font = "50px Arial";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center"
		ctx.strokeText("Hello World", size.w / 2, size.h / 2);

		ctx.fillStyle = "#393e46";
		ctx.font = "20px Arial";
		ctx.fillText("Welcome to The Min Series, a collection of minimal graphical applications.", size.w / 2, size.h / 2 + 50);

		ctx.fillText("Created by Samy Bencherif.", size.w / 2, size.h / 2 + 100);

		ctx.fillStyle = "#00adb5";
		ctx.fillText("The Min Series", size.w / 2 - 150, size.h / 2 + 50 - .5);
	}

	keydown(ev: KeyboardEvent): void { }

	keyup(ev: KeyboardEvent): void { }

	mousedown(ev: MouseEvent): void { }

	mouseup(ev: MouseEvent): void { }

	mousemove(ev: MouseEvent): void { }

	mousewheel(ev: MouseEvent): void { }

}