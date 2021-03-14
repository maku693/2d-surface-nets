const spaceSize = 200;
const unitCount = 5;
const gridSize = spaceSize / unitCount;

const data = Array.from({ length: unitCount }, () =>
  Array.from({ length: unitCount }).fill(0)
);

data[1][2] = 1;
data[2][1] = 1;
data[2][2] = 1;
data[2][3] = 1;
data[3][2] = 1;

(() => {
  const c = document.getElementById("c");

  c.width = spaceSize;
  c.height = spaceSize;

  const ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  ctx.translate(0.5, 0.5);

  drawBackground(c, ctx);

  drawData(ctx);
})();

function drawBackground(canvas, ctx) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "lightgray";
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

function drawData(ctx) {
  ctx.fillStyle = "black";
  for (let y = 0; y < unitCount; y++) {
    for (let x = 0; x < unitCount; x++) {
      if (data[x][y] < Number.EPSILON) continue;
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}

function drawOutline(ctx) {
  ctx.fillStyle = "transparent";
  ctx.strokeStyle = "black";
  for (let y = 0; y < unitCount; y++) {
    for (let x = 0; x < unitCount; x++) {
      ctx.fillStyle = data[x][y];
      ctx.moveTo(x * gridSize, y * gridSize);
      ctx.moveTo(x * gridSize, y * gridSize);
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}
