
export interface Sketch {

	title: string;

	setup(size: { w: number, h: number }): void;
	update(ctx: CanvasRenderingContext2D, size: { w: number, h: number }, t: number, dt: number): void;

	keydown(ev: KeyboardEvent): void;
	keyup(ev: KeyboardEvent): void;

	mousedown(ev: MouseEvent): void;
	mouseup(ev: MouseEvent): void;

	mousemove(ev: MouseEvent): void;
	mousewheel(ev: MouseEvent): void;
}