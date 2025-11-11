import kaplay from "kaplay";

const k = kaplay({
	width: 1268,
	height: 699,
	letterbox: true,
	global: false,
	debug: true,
	debugKey: "`",
	pixelDensity: Math.min(window.devicePixelRatio, 2),
	background: [0, 0, 0],
	// scale: 1,
	crisp: true,
});

export default k;
