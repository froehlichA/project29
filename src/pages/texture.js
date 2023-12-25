let color;

function setup() {
    createCanvas(1080, 1080);
    color = random([
        [210, 100, 56],
        [248, 183, 3],
        [15, 162, 169]
    ]);
    document.body.style.backgroundColor = '#faf9f6';
}

function deform_vertices(vertices, depth = 0) {
    if(depth <= 0) return vertices;

    let output = [];
    for(let i = 0; i < vertices.length; i++) {
        const a = vertices[i];
        const b = i+1 === vertices.length ? vertices[0] : vertices[i+1];
        const xDiff = abs(a[0] - b[0]);
        const yDiff = abs(a[1] - b[1]);
        const newX = randomGaussian(xDiff, 20) / 2;
        const newY = randomGaussian(yDiff, 20) / 2;
        const c = [
            a[0] >= b[0] ? a[0] - newX : a[0] + newX,
            a[1] >= b[1] ? a[1] - newY : a[1] + newY
        ];
        output = [...output, a, c];
    }
    return deform_vertices(output, depth - 1);
}

function deform(a, b, depth = 0) {
    const xDiff = abs(a[0] - b[0]);
    const yDiff = abs(a[1] - b[1]);
    const newX = randomGaussian(xDiff, 20000) / 2;
    const newY = randomGaussian(yDiff, 20000) / 2;
    const c = [
        a[0] >= b[0] ? a[0] - newX : a[0] + newX,
        a[1] >= b[1] ? a[1] - newY : a[1] + newY
    ];
    if(depth === 0) return [a, c, b];
    else return [
        ...deform(a, c, depth-1),
        ...deform(c, b, depth-1)
    ];
}

function watercolorsquare(
    x, y, size,
    options = {
        iterations: 100
    }
) {
    noStroke();
    fill(...color, 4);
    const vertices = [[x, y], [x + size, y], [x + size, y + size], [x, y + size]];
    for(let i = 0; i < options.iterations; i++) {
        beginShape();
        for(const vertexArr of deform_vertices(vertices, 5)) {
            vertex(vertexArr[0], vertexArr[1]);
        }
        endShape();
    }
}

function sketchsquare(
    x, y, size,
    options = {
        iterations: 100
    }
) {
    const vertices = [[x, y], [x + size, y], [x + size, y + size], [x, y + size]];
    for(let i = 0; i < vertices.length; i++) {
        const a = vertices[i];
        const b = vertices[(i + 1) % vertices.length];
        const o = () => randomGaussian(0, 5);
        for(let j = 0; j < options.iterations; j++) {
            strokeWeight(randomGaussian(3, 1));
            stroke(...color, random(12, 14));
            line(a[0] + o(), a[1] + o(), b[0] + o(), b[1] + o());
        }
    }
}

function pointOnLine(x1, y1, x2, y2, i) {
    return [
        x1 + i * (x2 - x1),
        y1 + i * (y2 - y1)
    ]
}

function markersquare(
    x, y, size,
    options = {
        iterations: 1000
    }
) {
    const vertices = [[x, y], [x + size, y], [x + size, y + size], [x, y + size]];
    const o = () => randomGaussian(0, 2);
    for(let i = 0; i < options.iterations; i++) {
        const ia = round(random(0, vertices.length - 1));
        const ib = (ia + random([1, 2, 3])) % vertices.length;
        const a = [vertices[ia], vertices[(ia + 1) % vertices.length]];
        const b = [vertices[ib], vertices[(ib + 1) % vertices.length]];
        const pointOnA = pointOnLine(a[0][0], a[0][1], a[1][0], a[1][1], random(0, 1));
        const pointOnB = pointOnLine(b[0][0], b[0][1], b[1][0], b[1][1], random(0, 1));
        strokeWeight(random(5, 20));
        stroke(...color, 8);
        line(pointOnA[0] + o(), pointOnA[1] + o(), pointOnB[0] + o(), pointOnB[1] + o());
    }
}

function digitalsquare(
    x, y, size
) {
    noFill();
    const o = () => randomGaussian(0, 5);
    for(let xi = x; xi < x + size; xi++) {
        for(let yi = y; yi < y + size; yi++) {
            strokeWeight(random(2, 6));
            stroke(...color, random(10, 20) + (xi - x) * 0.1 + (yi - y) * 0.1);
            point(xi + o() , yi + o());
        }
    }
}

function draw() {
    frameRate(0);
    background('#faf9f6');

    watercolorsquare(200, 200, 200);
    sketchsquare(1080-400, 200, 200);
    markersquare(200, 1080-400, 200);
    digitalsquare(1080-400, 1080-400, 200);
}