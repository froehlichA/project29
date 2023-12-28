const steps = 10;
const t = [];
const b = [];
let color = [];

function setup() {
    createCanvas(1080, 1080);
    for(let i = 0; i < steps; i++) {
        t.push(randomGaussian(150, 60));
        b.push(randomGaussian(150, 60));
    }
    color = random([
        [80, 0, 0],
        [0, 80, 0],
        [0, 0, 80],
        [80, 0, 80],
        [0, 80, 80],
    ]);
    document.body.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.1)`;
}

function drawWave(y, w = 200, o = 0) {
    beginShape();
    vertex(0, y - w/2);
    curveVertex(0, y - w/2);
    for(let i = 0; i < steps - 1; i++) {
        const s = (i+1) * 108;
        curveVertex(s, y - w/2 - t[i] + o);
    }
    curveVertex(1080, y - w/2);
    vertex(1080, y - w/2);
    vertex(1080, y + w/2);
    for(let i = steps - 2; i > 0; i--) {
        const s = (i+1) * 108;
        curveVertex(s, y + w/2 + b[i] - o);
    }
    vertex(0, y + w/2);
    endShape(CLOSE);
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
        iterations: 3000
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
        stroke(0, 0, 0, 20);
        line(pointOnA[0] + o(), pointOnA[1] + o(), pointOnB[0] + o(), pointOnB[1] + o());
    }
}

function draw() {
    frameRate(0);
    background('antiquewhite');

    let img = createImage(1080, 1080);
    img.loadPixels();
    let numPixels = 4 * img.width * img.height;
    for(let i = 0; i < numPixels; i += 4) {
        img.pixels[i] = color[0];
        img.pixels[i + 1] = color[1];
        img.pixels[i + 2] = color[2];
        img.pixels[i + 3] = random(0, 100);
    }
    img.updatePixels();
    image(img, 0, 0);

    push();
    clip(() => drawWave(540, 160), { invert: true });
    const y = (i) => abs(540 - i) * 0.5 + 20;
    for(let i = 60; i <= 1080 - 60; i += 40) {
        if(i === 60 || i === 1020 || i === 540) {
            strokeWeight(5);
        } else {
            strokeWeight(1);
        }
        noFill();
        stroke('black');
        line(i, y(i), i, 1080 - y(i));
        fill('black');
        circle(i, y(i), 10);
        circle(i, 1080 - y(i), 10);
    }
    pop();

    push();
    clip(() => drawWave(540, 160));
    markersquare(0, 0, 1080);
    textFont('Courier new');
    textSize(640);
    noStroke();
    fill(255, 255, 255, 160);
    textAlign(CENTER, CENTER);
    strokeWeight(1);
    text('wave', 540, 540);
    pop();

    noFill();
    stroke('white');
    strokeWeight(1);
    for(let i = -10; i < 100; i += 20) {
        drawWave(540, 160, i);
    }
}