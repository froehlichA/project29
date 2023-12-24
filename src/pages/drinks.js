const canvasSize = 1080;
const circleSizes = [60, 150];
const circleSizeStep = 5;
const origin = {
    x: canvasSize / 2,
    y: canvasSize / 2
}
const tableSize = 400;

const circles = [];

function circlesCollide(a, b) {
    return dist(a.x, a.y, b.x, b.y) < a.size/2 + b.size/2;
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    document.body.style.backgroundColor = 'antiquewhite';

    // Generate circles
    let size = circleSizes[1];
    while(size > circleSizes[0]) {
        // Try to generate a circle
        for(let i = 0; i < random(500, 800); i++) {
            const offset = (canvasSize) / 50 + size;
            const x = random(offset, canvasSize - offset);
            const y = random(offset, canvasSize - offset);
            const stroke = random([108, 216]);
            const strokeWidth = random([1, 2, 4]);
            const fill = random(0, 10);
            const circle = { x, y, size, stroke, strokeWidth, fill };
            if(circles.every(c => !circlesCollide(circle, c))) {
                if(dist(circle.x, circle.y, origin.x, origin.y) < tableSize) {
                    circles.push(circle);
                }
            }
        }
        size -= random(0, circleSizeStep);
    }
}

function fillCircle(c) {
    if(c.fill < 8) {
        noStroke();
        fill(60, 100);
        for(let i = 0; i < c.stroke; i++) {
            rect(i * 1080 / c.stroke, 0, c.strokeWidth, 1080);
        }
    } else {
        noFill();
    }
}

function draw() {
    frameRate(0);
    background('antiquewhite');
    strokeWeight(2);

    fill('#c19a6b');
    circle(origin.x, origin.y, tableSize * 2);

    for(const c of circles) {
        const dest = createVector(c.x, c.y)
            .sub(origin.x, origin.y)
            .mult(0.2);
        fill(255, 100);
        circle(c.x - dest.x, c.y - dest.y, c.size * 0.5);
    }
    for(const c of circles) {
        const dest = createVector(c.x, c.y)
            .sub(origin.x, origin.y)
            .mult(0.2);
        line(c.x, c.y, c.x - dest.x, c.y - dest.y);
    }
    for(const c of circles) {
        fill(random(['dodgerblue', 'red', 'yellow', 'orange', 'lightgreen']));
        circle(c.x, c.y, c.size - 5);
    }
    for(let i = 0; i < 3; i++) {
        for(const c of circles) {
            if(c.size < 100 && i === 2) continue;
            let offset = createVector(c.x - origin.x, c.y - origin.y)
                .mult(0.06)
                .mult(i + 1);
            noFill();
            circle(c.x + offset.x, c.y + offset.y, c.size - i*10);
        }
    }
}