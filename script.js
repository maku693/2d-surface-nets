const worldSize = 200;
const unitCount = 5;
const gridSize = worldSize / unitCount;

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

  c.width = worldSize;
  c.height = worldSize;

  const ctx = c.getContext("2d");

  ctx.lineWidth = 2;

  drawBackground(c, ctx);

  drawData(ctx);

  drawOutlineCulled(ctx);
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

function drawOutlineStupid(ctx) {
  ctx.strokeStyle = "red";

  for (let y = 0; y < unitCount; y++) {
    for (let x = 0; x < unitCount; x++) {
      if (data[x][y] < Number.EPSILON) continue;
      ctx.translate(x * gridSize, y * gridSize);

      ctx.beginPath();
      ctx.lineTo(gridSize, 0);
      ctx.lineTo(gridSize, gridSize);
      ctx.lineTo(0, gridSize);
      ctx.lineTo(0, 0);
      ctx.closePath();

      ctx.stroke();

      ctx.resetTransform();
    }
  }
}

function drawOutlineCulled(ctx) {
  ctx.strokeStyle = "red";

  for (let y = 0; y < unitCount; y++) {
    for (let x = 0; x < unitCount; x++) {
      if (data[x][y] < Number.EPSILON) continue;
      ctx.translate(x * gridSize, y * gridSize);

      ctx.beginPath();
      if (y > 0 && data[x][y - 1] < Number.EPSILON) {
        ctx.lineTo(gridSize, 0);
      } else {
        ctx.moveTo(gridSize, 0);
      }
      if (x < unitCount - 1 && data[x + 1][y] < Number.EPSILON) {
        ctx.lineTo(gridSize, gridSize);
      } else {
        ctx.moveTo(gridSize, gridSize);
      }
      ctx.lineTo(0, gridSize);
      ctx.lineTo(0, 0);
      ctx.closePath();

      ctx.stroke();

      ctx.resetTransform();
    }
  }
}
