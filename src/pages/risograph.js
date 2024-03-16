const cutoff = 100;
let areas = [];

function setup() {
    createCanvas(1080, 1080);
}

/**
 *
 * @param area {[number, number, number, number]}
 * @param depth {number}
 * @param columns {number|number[]}
 * @param rows {number|number[]}
 * @returns {[number, number, number, number][]}
 */
function splitArea(
    area,
    depth,
    columns = 2,
    rows = 2
) {
    if(depth <= 0) return [area];

    const [x, y, width, height] = area;
    const numColumns = Array.isArray(columns) ? random(columns) : columns;
    const numRows = Array.isArray(rows) ? random(rows) : rows;
    const elWidth = width / numColumns;
    const elHeight = height / numRows;

    const areas = [];
    for(let c = 0; c < numColumns; c++) {
        for(let r = 0; r < numRows; r++) {
            const newX = x + c * elWidth;
            const newY = y + r * elHeight;
            const root = [newY, newY, elWidth, elHeight];
            areas.push(root);
            const area = splitArea(
                [newX, newY, elWidth, elHeight],
                depth - 1,
                columns,
                rows
            );
            areas.push(...area.filter(a =>
                !a.every((v, i) => v === root[i]))
            );
        }
    }
    return areas;
}

/**
 *
 * @param choices {T[]}
 * @param n {number}
 * @returns {T[]}
 * @template T
 */
function randomN(choices, n) {
    let available = [...choices];
    const r = [];
    for(let i = 0; i < n; i++) {
        const el = random(available);
        available = available.filter(t => t !== el);
        r.push(el);
    }
    return r;
}

function bgFill(x, y, width, height, color) {
    noStroke();
    fill(color);
    rect(x, y, width, height);
}

function bgGradient(x, y, width, height, color1, color2) {
    strokeWeight(1);
    if(height >= width) {
        for(let i = y; i <= y + height; i++) {
            let inter = map(i, y, y + height, 0, 1);
            let c = lerpColor(color1, color2, inter);
            stroke(c);
            line(x, i, x + width, i);
        }
    } else {
        for(let i = x; i <= x + width; i++) {
            let inter = map(i, x, x + width, 0, 1);
            let c = lerpColor(color1, color2, inter);
            stroke(c);
            line(i, y, i, y + height);
        }
    }
    strokeWeight(2);
}

function fgLinesVert(x, y, width, height, color) {
    noFill();
    stroke(color);
    for(let i = x; i <= x + width; i += 18) {
        line(i, y, i, y + height);
    }
}

function fgLinesHori(x, y, width, height, color) {
    noFill();
    stroke(color);
    for(let i = y; i <= y + height; i += 18) {
        line(x, i, x + width, i);
    }
}

function fgLinesGrid(x, y, width, height, color) {
    fgLinesVert(x, y, width, height, color);
    fgLinesHori(x, y, width, height, color);
}

function fgCircle(x, y, width, height, color) {
    noStroke();
    fill(color);
    const ratio = Math.max(width / height, height / width);
    const size = Math.max(width / ratio, height / ratio);
    for(let i = 0; i < Math.max(width / height, 1); i++) {
        for(let j = 0; j < Math.max(height / width, 1); j++) {
            const newX = x + i * size + size/2;
            const newY = y + j * size + size/2;
            circle(newX, newY, size * 0.8);
        }
    }
}

let colors = [
    '#F8F4EC', '#FF9BD2', '#D63484', '#402B3A'
];

function draw() {
    push();
    beginClip();
    rect(64, 64, 964, 964, 30);
    endClip();
    colors = colors.map(c => color(c));
    console.log(colors);
    strokeWeight(2);
    areas = splitArea([64, 64, 964, 964], 2, [1, 3], [1, 3]);
    frameRate(0);
    noStroke();
    for(const area of areas) {
        const [x, y, width, height] = area;
        push();
        beginClip();
        rect(x, y, width, height);
        endClip();
        const [bg, fg, gradient] = randomN(colors, 3);
        switch(random([0, 1, 2, 2])) {
            case 0: bgFill(x, y, width, height, bg); break;
            case 1: bgGradient(x, y, width, height, bg, gradient); break;
            default: break;
        }
        switch(random([random([0, 1, 2]), 3, 4, 4])) {
            case 0: fgLinesVert(x, y, width, height, fg); break;
            case 1: fgLinesHori(x, y, width, height, fg); break;
            case 2: fgLinesGrid(x, y, width, height, fg); break;
            case 3: fgCircle(x, y, width, height, fg); break;
            case 4: break;
        }
        pop();
    }

    strokeWeight(1);
    let img = createImage(1080, 1080);
    img.loadPixels();
    let d = pixelDensity();
    for(let i = 0; i < 4 * img.width * img.height; i += 4) {
        img.pixels[i] = 0;
        img.pixels[i + 1] = 0;
        img.pixels[i + 2] = 0;
        img.pixels[i + 3] = random(0, 20);
    }
    img.updatePixels();
    image(img, 0, 0);
    pop();
}