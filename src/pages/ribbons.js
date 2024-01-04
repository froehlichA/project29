function setup() {
    createCanvas(1080, 1080);
    strokeCap(SQUARE);
    document.body.style.backgroundColor = '#111111';
}

function draw() {
    background('#111111');
    strokeWeight(5);
    const [xCenter, yCenter] = [340, 340];

    for(let x = 150; x < 1080 - 150; x += 10) {
        for(let y = 150; y < 1080 - 150; y += 10) {
            stroke('weight');
            const a = sin(frameCount / 40 + ((x+50) % 100) / 50 + (y) / 100 + abs(x - xCenter) / 300 + abs(y/10 - yCenter) / 300);
            if(x === 150 && y === 150 && sin(frameCount / 40) < 0.1 && sin(frameCount / 40) > 0) console.log(sin(frameCount / 40), frameCount);
            const xdelta = a*2 + sin(y/60 + frameCount / 40) * 10;
            const ydelta = sin(x/60 + frameCount / 40) * 1;
            const l = 12 + a * 10;
            const c = map(l, 0, 30, 0, 255);
            stroke(c, 100, 220);
            const v = p5.Vector.fromAngle(a, l);
            line(
                x + xdelta,
                y + ydelta,
                x + v.x + xdelta,
                y + v.y + ydelta
            );
        }
    }

    stroke(255, 255, 255, 200);
    strokeWeight(30);
    noFill();

    square(300, 300, 1080 - 600, 60);

    textAlign(CENTER, CENTER);
    textSize(200);
    text('\\\//', 540, 540);
}

function keyPressed() {
    if (key === 's') {
        saveGif('ribbons', 240, { units: 'frames' });
    }
}