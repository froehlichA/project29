let color = undefined;

function setup() {
    createCanvas(1080, 1080);
    color = random([[255, 20, 20], [20, 20, 255], [20, 255, 20]]);
    document.body.style.backgroundColor = 'antiquewhite';
}

function draw() {
    frameRate(0);
    background('antiquewhite');
    ellipseMode(CENTER);
    rectMode(CENTER);

    let yoff = 540;
    let curvePoints = Array(4).fill(undefined).map(() => random(100, 1080-100));
    const range = 1080 - 180 * 2;

    noFill();
    strokeWeight(2);
    stroke(...color, 150);
    for(let a = -2; a < 3; a++) {
        const o = (i) => (i+0.4) * a * 20;
        beginShape();
        curveVertex(200, curvePoints[0] + o(0));
        for(let i = 0; i < curvePoints.length; i++) {
            const x = i * (range / 3) + 180;
            curveVertex(x, curvePoints[i] + o(i));
        }
        curveVertex(1080-180, curvePoints[3] + o(3));
        endShape();
    }
    strokeWeight(1);
    stroke('black');

    /*for(let x = 200; x <= 1080 - 200; x+= 10) {
        const i = floor((x - 200) / (range / 3));
        const p = ((x - 200) / (range / 3)) % 1;
        const yoff = curvePoint(
            curvePoints[max(0, i-1)],
            curvePoints[i],
            curvePoints[i + 1],
            curvePoints[min(3, i + 2)],
            p
        );
        rect(x, yoff, 10);
    }*/

    noFill();
    for(let x = 200; x <= 1080 - 200; x+= 10) {
        const i = floor((x - 200) / (range / 3));
        const p = ((x - 200) / (range / 3)) % 1;
        const yoff = curvePoint(
            curvePoints[max(0, i-1)],
            curvePoints[i],
            curvePoints[i + 1],
            curvePoints[min(3, i + 2)],
            p
        );
        for(let y = 100; y <= 1080 - 100; y += 10) {
            circle(x, y, map(abs(y - yoff), 0, 540, 1, 10));
        }
    }

    fill(...color, 80);
    for(let x = 200; x <= 1080 - 210; x+= 10) {
        for(let y = 100; y < 1080 - 100; y += 10) {
            circle(x + 5, y + 5, map(abs(y - 540), 0, 540, 1, 12));
        }
    }
}