let rows = 10;
let cols = 5;

function setup() {
    createCanvas(1080, 1080);
    const bg = random([
        '#065a60',
        '#1b3a4b',
        '#312244',
        '#3e1f47'
    ])
    background(bg);
    document.body.style.backgroundColor = bg;
    cols = round(random(4, 8));
    rows = round(cols * 1.61);

    fill(255, 255, 255, 1);
    noStroke();
    for(let i = 0; i < 200; i++) {
        circle(random(-200, 1080), random(-200, 1080), random(200, 600));
    }
}

function pointOnLine(x, y, i) {
    return [
        x[0] + i * (y[0] - x[0]),
        x[1] + i * (y[1] - x[1])
    ]
}

function distort(x, magnitude) {
    const g = () => randomGaussian(0, magnitude);
    return [x[0] + g(), x[1] + g()];
}

function pointsquare(x, y, size, magnitude) {
    const vertices = [
        [x, y],
        [x + size, y],
        [x + size, y + size],
        [x, y + size]
    ].map(v => distort(v, magnitude));

    for(let i = 0; i < vertices.length; i++) {
        const vertexStart = vertices[i];
        const vertexEnd = vertices[(i + 1) % vertices.length];
        for(let j = 0; j < 20; j++) {
            const p = pointOnLine(vertexStart, vertexEnd, j / 20);
            point(p[0], p[1]);
        }
    }
}

function draw() {
    frameRate(0);

    stroke('white');
    noFill();
    const reservedSize = (1080 - 200) / max(rows, cols);
    const xOffset = 540 - (cols / 2) * reservedSize;
    const yOffset = 540 - (rows / 2) * reservedSize;
    for(let col = 0; col < cols; col++) {
        for(let row = 0; row < rows; row++) {
            const x = xOffset + col * reservedSize;
            const y = yOffset + row * reservedSize;
            for(let i = 0; i < 10; i++) {
                pointsquare(x, y, reservedSize * 0.8, pow(row, 1.2) * 0.8);
            }
        }
    }
}