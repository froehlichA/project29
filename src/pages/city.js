const cutoff = 100;
const margin = 30;
const colors = [
    "#cdb4db",
    "#ffc8dd",
    "#ffafcc",
    "#bde0fe",
    "#a2d2ff"
];
let bg;
let height;
let width;
let depth;

function setup() {
    createCanvas(1080, 1080, WEBGL);
    ortho(undefined, undefined, undefined, undefined, -2340, 5000);
    angleMode(DEGREES);
    bg = random(colors);
    height = random(300, 800);
    width = random(300, 800);
    depth = randomGaussian(5, 1);
    document.body.style.backgroundColor = bg;
}

function divideArea(area, depth) {
    if(depth <= 0) return [area];
    if(area[3] <= cutoff || area[4] <= cutoff) return [area];

    const [x, y, width, height] = area;
    const newDepth = depth - random([0, 1, 2, 3]);
    const repeats = round(random(1, 6));
    if(width > height) {
        // Divide vertically
        const newWidth = width / repeats;
        let newX = x;
        const areas = [];
        for(let i = 0; i < repeats; i++) {
            areas.push(...divideArea([newX, y, newWidth, height], newDepth));
            newX += newWidth;
        }
        return areas;
    } else {
        // Divide horizontally
        const newHeight = height / repeats;
        let newY = y;
        const areas = [];
        for(let i = 0; i < repeats; i++) {
            areas.push(...divideArea([x, newY, width, newHeight], newDepth));
            newY += newHeight;
        }
        return areas;
    }
}

function draw() {
    frameRate(0);
    background(bg);
    rotateX(35);
    rotateZ(45);
    translate(-width/2, -height/2);

    const areas = divideArea([0, 0, width, height], depth);
    for(const [x, y, width, height] of areas) {
        const z = min(100, abs(randomGaussian(20, 50)));
        translate(x + width/2 + margin/2, y + height/2 + margin/2, z/2);
        fill(random(colors));
        box(width - margin/2, height - margin/2, z);
        translate(- x - width/2 - margin/2, - y - height/2 - margin/2, -z/2);
    }
}