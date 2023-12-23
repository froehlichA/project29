function setup() {
    createCanvas(1080, 1080);
    document.body.style.backgroundColor = 'rgb(50, 50, 70)';
}

const colors = [
    [240, 50, 50],
    [50, 240, 50],
    [100, 100, 240],
    [240, 240, 50],
    [240, 50, 240],
    [50, 240, 240]
];

const toC = (a) => (a + 3) * 40;
const toS = (a) => toC(a) + 10;

function draw() {
    const arr = [];
    frameRate(0);
    background(50, 50, 70);
    for(let x = 0; x < 22; x++) {
        const xarr = [];
        for(let y = 0; y < 22; y++) {
            xarr.push(random(colors));
        }
        arr.push(xarr);
    }
    for(let x = 0; x < 22; x++) {
        for(let y = 0; y < 22; y++) {
            const color = arr[x][y];
            const size = random(8, 10);
            stroke(color);
            fill(color);
            square(toC(x), toC(y), size);
            fill(50, 50, 90);
            square(toC(x) + 5, toC(y) + 5, 10, 1);
        }
    }
    const p = round(random(2, 19));
    const method = random([true, false]);
    for(let x = 0; x < 22; x++) {
        for(let y = 0; y < 22; y++) {
            const color = arr[x][y];
            stroke(color);
            noFill();
            if(method) {
                bezier(
                    toS(x), toS(y), toS(x), toS(p),
                    toS(p), toS(y), toS(p), toS(y),
                );
            } else {
                bezier(
                    toS(x), toS(y), toS(x), toS(p),
                    toS(p), toS(y), toS(p), toS(p),
                );
            }
        }
    }
}