const numX = 5;
const arrays = [];

function computeToDg(from, to) {
  let bestDistance = Infinity;
  let dg = NaN;
  for(const val of [to, to + 360, to - 360]) {
    const distance = val - from;
    if(Math.abs(distance) < bestDistance) {
      bestDistance = distance;
      dg = from + distance;
    }
  }
  return dg;
}

function setup() {
  createCanvas(1080, 1080);
  background('#111111');
  document.body.style.backgroundColor = '#111111';

  const startX = 100;
  const endX = 1080 - 100;
  const stepX = 10;
  const lengthX = Math.floor((endX - startX) / stepX);

  for(let m = 0; m < numX; m++) {
    const arr = Array.from({ length: lengthX }, (_, i) => 0);
    let prevI = -1;
    for(let i = 0; i <= arr.length; i += arr.length / 4) {
      arr[i] = random(0, 360);
      if(prevI !== -1) {
        const prevIVal = arr[prevI];
        const iVal = arr[i];
        const to = computeToDg(prevIVal, iVal);
        for(let j = prevI + 1; j < i; j++) {
          arr[j] = lerp(prevIVal, to, (j - prevI) / (i - prevI));
        }
      }
      prevI = i;
    }
    arrays.push(arr);
  }
}

function* steps(start, end, n) {
  const x = (end - start) / n;
  let num = start;
  while(num <= end) {
    yield num;
    num += x;
  }
}

function draw() {
  console.log(arrays);
  angleMode(DEGREES);
  colorMode(HSL);
  strokeWeight(2);
  frameRate(0);

  fill('white');
  noStroke();

  fill('#111111');
  for(let j = 0; j < arrays[0].length; j++) {
    for(let i = 0; i < arrays.length; i++) {
      const x = lerp(200, 1080-200, i / (arrays.length-1));
      const y = lerp(200, 1080+100, j / (arrays[i].length-1));
      const s = map(Math.abs(360-arrays[i][j]), 0, 360, 10, 40);
      stroke(color(360-arrays[i][j], s, 60));
      translate(x, y);
      rotate(arrays[i][j]);
      ellipse(0, 0, 180, 80);
      rotate(-arrays[i][j]);
      translate(-x, -y);
    }
  }
}