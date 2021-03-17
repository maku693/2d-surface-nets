const worldSize = 300;
const gridSize = 50;
const grids = worldSize / gridSize;
const samples = grids + 1;

(() => {
  const c = document.getElementById("c");
  c.style.width = `${worldSize}px`;
  c.style.height = `${worldSize}px`;

  const ctx = c.getContext("2d");

  const scale = window.devicePixelRatio;
  c.width = worldSize * scale;
  c.height = worldSize * scale;
  ctx.scale(scale, scale);

  ctx.lineWidth = 2;

  drawBackground(c, ctx);

  const data = Array.from({ length: samples }, () =>
    new Array(samples).fill(0)
  );

  data[2][3] = 1;
  data[3][2] = 1;
  data[3][3] = 1;
  data[3][4] = 1;
  data[4][3] = 1;
  data[4][4] = 1; // 0.5;

  drawData(ctx, data);

  // drawIntersectedGrids(ctx, data);

  drawCrossedEdges(ctx, data);

  drawSurface(ctx, data);
})();

function drawBackground(canvas, ctx) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#0004";
  ctx.beginPath();
  for (let i = 0; i <= ctx.canvas.width; i += gridSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
  }
  for (let i = 0; i <= ctx.canvas.height; i += gridSize) {
    ctx.moveTo(0, i);
    ctx.lineTo(ctx.canvas.width, i);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawData(ctx, data) {
  for (let y = 0; y < samples; y++) {
    for (let x = 0; x < samples; x++) {
      if (data[x][y] === 0) continue;
      ctx.fillStyle = "#f004";
      fillCircle(ctx, x * gridSize, y * gridSize, (gridSize / 2) * data[x][y]);
    }
  }
}

function drawCrossedEdges(ctx, data) {
  ctx.fillStyle = "#0f08";
  ctx.strokeStyle = "#0f04";
  // vertical lines
  for (let y = 0; y < grids; y++) {
    for (let x = 0; x < samples; x++) {
      if (
        (data[x][y] === 0 && 0 < data[x][y + 1]) ||
        (0 < data[x][y] && 0 === data[x][y + 1])
      ) {
        strokeLine(
          ctx,
          x * gridSize,
          y * gridSize,
          x * gridSize,
          (y + 1) * gridSize
        );
        fillCircle(ctx, x * gridSize, (y + 0.5) * gridSize, 5);
      }
    }
  }
  // horizontal lines
  for (let y = 0; y < samples; y++) {
    for (let x = 0; x < grids; x++) {
      if (
        (data[x][y] === 0 && 0 < data[x + 1][y]) ||
        (0 < data[x][y] && 0 === data[x + 1][y])
      ) {
        strokeLine(
          ctx,
          x * gridSize,
          y * gridSize,
          (x + 1) * gridSize,
          y * gridSize
        );
        fillCircle(ctx, (x + 0.5) * gridSize, y * gridSize, 5);
      }
    }
  }
}

function drawSurface(ctx, data) {
  for (let y = 0; y < grids; y++) {
    for (let x = 0; x < grids; x++) {
      const surroundings = [
        data[x][y],
        data[x + 1][y],
        data[x][y + 1],
        data[x + 1][y + 1]
      ];

      if (!(surroundings.some(x => x === 0) && surroundings.some(x => 0 < x)))
        continue;

      const edges = [
        [[0, 0], [1, 0]],
        [[0, 0], [0, 1]],
        [[1, 0], [1, 1]],
        [[0, 1], [1, 1]]
      ];
      for (let edge of edges) {
        const a = data[x + edge[0][0]][y + edge[0][1]];
        const b = data[x + edge[1][0]][y + edge[1][1]];
        console.log(a, b);
        if ((a === 0 && 0 < b) || (0 < a && b === 0)) {
          ctx.fillStyle = "magenta";
          fillCircle(ctx, x * gridSize, y * gridSize, 2);
        }
      }

      ctx.fillStyle = "#00f4";
      fillCircle(
        ctx,
        x * gridSize + gridSize / 2,
        y * gridSize + gridSize / 2,
        2
      );

      // ctx.lineWidth = 1;
      // ctx.strokeStyle = "red";
      // strokeCircle(
      //   ctx,
      //   x * gridSize + gridSize / 2 + (gridSize / 2) * centerOfMass[0],
      //   y * gridSize + gridSize / 2 + (gridSize / 2) * centerOfMass[1],
      //   4
      // );
    }
  }

  // ctx.beginPath();
  // ctx.closePath();

  // ctx.stroke();
}

function fillCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function strokeCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
}

function strokeLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}
