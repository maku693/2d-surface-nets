const worldSize = 200;
const unitCount = 5;
const gridSize = worldSize / unitCount;

const data = Array.from({ length: unitCount }, () =>
  new Array(unitCount).fill(0)
);

data[1][1] = 0.5;
data[1][2] = 1;
data[1][3] = 0.5;
data[2][1] = 1;
data[2][2] = 1;
data[2][3] = 1;
data[3][1] = 0.5;
data[3][2] = 1;
data[3][3] = 0.5;

const data2 = Array.from({ length: unitCount + 1 }, () =>
  new Array(unitCount + 1).fill(0)
);

data2[1][1] = 0.5;
data2[1][2] = 1;
data2[1][3] = 1;
data2[1][4] = 0.5;
data2[2][1] = 1;
data2[2][2] = 1;
data2[2][3] = 1;
data2[2][4] = 1;
data2[3][1] = 1;
data2[3][2] = 1;
data2[3][3] = 1;
data2[3][4] = 1;
data2[4][1] = 0.5;
data2[4][2] = 1;
data2[4][3] = 1;
data2[4][4] = 0.5;

(() => {
  const c = document.getElementById("c");

  c.width = worldSize;
  c.height = worldSize;

  const ctx = c.getContext("2d");

  ctx.lineWidth = 2;

  drawBackground(c, ctx);

  drawData(ctx);

  drawOutlineCulledSmooth(ctx);
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
  for (let y = 0; y < unitCount; y++) {
    for (let x = 0; x < unitCount; x++) {
      if (data[x][y] === 0) continue;
      ctx.fillStyle = `rgba(0, 0, 0, ${data[x][y]})`;
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}

function drawOutlineStupid(ctx) {
  ctx.strokeStyle = "red";

  for (let y = 0; y < unitCount; y++) {
    for (let x = 0; x < unitCount; x++) {
      if (data[x][y] === 0) continue;
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
      if (data[x][y] === 0) continue;
      ctx.translate(x * gridSize, y * gridSize);

      ctx.beginPath();
      if (y > 0 && data[x][y - 1] === 0) {
        ctx.moveTo(0, 0);
        ctx.lineTo(gridSize, 0);
      }
      if (x < unitCount - 1 && data[x + 1][y] === 0) {
        ctx.moveTo(gridSize, 0);
        ctx.lineTo(gridSize, gridSize);
      }
      if (y < unitCount - 1 && data[x][y + 1] === 0) {
        ctx.moveTo(gridSize, gridSize);
        ctx.lineTo(0, gridSize);
      }
      if (x > 0 && data[x - 1][y] === 0) {
        ctx.moveTo(0, gridSize);
        ctx.lineTo(0, 0);
      }
      ctx.closePath();

      ctx.stroke();

      ctx.resetTransform();
    }
  }
}

function drawOutlineCulledSmooth(ctx) {
  ctx.strokeStyle = "red";

  for (let y = 0; y < unitCount; y++) {
    for (let x = 0; x < unitCount; x++) {
      if (data[x][y] === 0) continue;
      ctx.translate(x * gridSize, y * gridSize);

      const surroundings = [
        x > 0 && y > 0 ? data[x - 1][y - 1] : 0,
        y > 0 ? data[x][y - 1] : 0,
        x  && y > 0 ? data[x - 1][y - 1] : 0,
      ];
      const vertices = [
        { x: gridSize * data[x][y], y: gridSize * data[x][y] },
      ];

      ctx.beginPath();
      if (y > 0 && data[x][y - 1] === 0) {
        ctx.moveTo(gridSize * data[x][y], gridSize * data[x][y]);
        ctx.lineTo(gridSize, 0);
      }
      if (x < unitCount - 1 && data[x + 1][y] === 0) {
        ctx.moveTo(gridSize, 0);
        ctx.lineTo(gridSize, gridSize);
      }
      if (y < unitCount - 1 && data[x][y + 1] === 0) {
        ctx.moveTo(gridSize, gridSize);
        ctx.lineTo(0, gridSize);
      }
      if (x > 0 && data[x - 1][y] === 0) {
        ctx.moveTo(0, gridSize);
        ctx.lineTo(0, 0);
      }
      ctx.closePath();

      ctx.stroke();

      ctx.resetTransform();
    }
  }
}
