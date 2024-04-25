const margin = 100;
let steps = 4;
let p;
let shouldReverse;
let maxDepth;

function setup() {
  createCanvas(1080, 1080);
  background('#111');
  document.body.style.backgroundColor = '#111';

  steps = random([4, 8]);
  shouldReverse = random([true, false]);
  maxDepth = random([50, 100, 200]);
  p = (1080-margin*2) / steps;
}

function pointOnSide(side, r = 0.5) {
  return [lerp(side[0][0], side[1][0], r), lerp(side[0][1], side[1][1], r)];
}

function fillArea(x, y, w, h, r, reverse = false) {
  rect(x, y, w, h);
  const points = [
    [x, y],
    [x+w, y],
    [x+w, y+h],
    [x, y+h]
  ];
  if(reverse) points.reverse();

  function fill(points, depth = 0) {
    if(depth > maxDepth) return;
    const startP = points[points.length - 1];
    const endP = pointOnSide([points[points.length - 3], points[points.length - 4]], r);
    line(startP[0], startP[1], endP[0], endP[1]);
    fill([...points, endP], depth + 1);
  }

  fill(points);
}

function draw() {
  clear();
  frameRate(20);
  noFill();
  stroke('#fff');
  strokeWeight(1);

  let r = 0.1 * sin(frameCount * 0.05) + 0.9;

  for(let x = margin; x < 1080 - margin; x += p) {
    for(let y = margin; y < 1080 - margin; y += p) {
      if(shouldReverse) {
        fillArea(x, y, p, p, r, ((x-margin)/p+(y-margin)/p)%2===0);
      } else {
        fillArea(x, y, p, p, r);
      }
    }
  }
}

function keyPressed() {
  if (key === 's') {
    saveGif('zensquare', 2 * PI/0.05, { units: 'frames' });
  }
}