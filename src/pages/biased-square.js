let arr = [];
const size = 21;

let img;
function preload() {
    img = loadImage('assets/frederik-lower-tatFzQW0a3s-unsplash.jpg');
}

function setup() {
    createCanvas(1080, 1080);
    document.body.style.backgroundColor = "antiquewhite";
    resetArr();
}

function resetArr() {
    arr = [];
    for(let x = 0; x < size; x++) {
        const content = [];
        for(let y = 0; y < size; y++) {
            content.push(0);
        }
        arr.push(content);
    }
}

function drawLine(x, y, d, depth = 0) {
    arr[y][x] = 1;
    const choices =[
        [x, y+1],
        [x, y-1],
        [x+1, y],
        [x-1, y],
    ];
    let startIdx = Math.ceil(random(0, choices.length - 1));
    for(let i = 0; i < choices.length; i++) {
        const idx = (startIdx + i) % choices.length;
        const [x1, y1] = choices[idx];
        if(x1 < 0 || x1 >= size) continue;
        if(y1 < 0 || y1 >= size) continue;
        if(arr[y1][x1] === 0) {
            d(x, y, x1, y1);
            drawLine(x1, y1, d, depth - 1);
            return;
        }
    }
}

function draw() {
    noFill();
    image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER);
    frameRate(0);
    const c = (pos) => 540 + (pos - Math.floor(size/2)) * 40;
    for(let i = 0; i < 20; i++) {
        for(const color of ["#003030", "#019992", "#ff7f59", "#e2a754", "#ffdcb4"]) {
            const start = [Math.floor(size/2), Math.floor(size/2)];
            const path = [];
            drawLine(start[0], start[1], (x,y,x1,y1) => {
                path.push([x1, y1]);
            });
            let prev = start;
            for(const pathx of path) {
                stroke(color);
                strokeWeight(20);
                line(c(prev[0]), c(prev[1]), c(pathx[0]), c(pathx[1]));
                prev = pathx;
            }
            prev = start;
            for(const pathx of path) {
                stroke(240, 240, 240);
                strokeWeight(5);
                line(c(prev[0]), c(prev[1]), c(pathx[0]), c(pathx[1]));
                prev = pathx;
            }
            resetArr();
        }
    }
}