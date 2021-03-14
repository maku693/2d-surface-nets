const spaceSize = 200;
const unitCount = 5;
const gridSize = spaceSize / unitCount;

const data = Array.from({ length: unitCount }, () =>
  Array.from({ length: unitCount }).fill(0)
);

data[1][1] = .5;
data[1][2] = 1;
data[1][3] = .5;
data[2][1] = 1;
data[2][2] = 1;
data[2][3] = 1;
data[3][1] = .5;
data[3][2] = 1;
data[3][3] = .5;

(() => {
  const c = document.getElementById("c");

  c.width = spaceSize;
  c.height = spaceSize;

  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  ctx.translate(0.5, 0.5);
  
  drawBackground(c, ctx);

  drawData(ctx);

  ctx.fillStyle = "#f00";
  fillCircle(ctx, gridSize, gridSize, 2);
})();

function drawBackground(canvas, ctx) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#ccc";
  strokeGrid(ctx, gridSize);
}

function strokeGrid(ctx, gridSize) {
  ctx.beginPath();

  for (let i = gridSize; i < ctx.canvas.width; i += gridSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
  }

  for (let i = gridSize; i < ctx.canvas.height; i += gridSize) {
    ctx.moveTo(0, i);
    ctx.lineTo(ctx.canvas.width, i);
  }

  ctx.closePath();

  ctx.stroke();
}

function fillCircle(ctx, x, y, radius) {
  ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
  ctx.fill();
}

function drawData(ctx) {
  for (let y = 0; y < unitCount; y++) {
    for (let x = 0; x < unitCount; x++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${data[x][y]})`;
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}