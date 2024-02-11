

function setup() {
    createCanvas(1080, 1080);
}

let t = 0;

function draw() {
    t += deltaTime;
    clear();
    background('black');
    blendMode(ADD);
    const colors = [
        [0, 0xFF, 0xFF],
        [0xFF, 0, 0xFF],
        [0xFF, 0xFF, 0]
    ];

    strokeWeight(1);
    for(let i = 0; i < 1000; i++) {
        const color = random(colors);
        stroke(...color, 100);
        let r = () => randomGaussian(540 + Math.sin(0.001 * t) * 100, 100);
        let y = r();
        let y1 = 540 - (y - 540) + randomGaussian(0, 40);
        line(0, y, 1080, y1);
    }
    for(let i = 0; i < 100; i++) {
        const color = random(colors);
        stroke(...color, 100);
        let r = () => random(-300, 1080 + 300);
        let x = r();
        let x1 = 540 - (x - 540) + randomGaussian(0, 40);
        line(x, 0, x1, 1080);
    }
    blendMode(BLEND);
    let r = () => randomGaussian(0, 5);
    noStroke();
    fill(0, 0, 0, 10);
    for(let i = 0; i < 100; i++) {
        circle(540 + r(), 540 + r(), 20);
    }
    noFill();
    const size = map(t % 500, 0, 500, 0, 1);
}

function keyPressed() {
    if (key === 's') {
        saveGif('velocity', 4);
    }
}