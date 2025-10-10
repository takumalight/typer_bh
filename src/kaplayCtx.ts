import kaplay from "kaplay";

const k = kaplay({
    width: 1268,
    height: 699,
    letterbox: true,
    global: false,
    debug: true,
    debugKey: "`",
    pixelDensity: window.devicePixelRatio,
    background: [0,0,0],
    // scale: 1,
    crisp: false
});

export default k;